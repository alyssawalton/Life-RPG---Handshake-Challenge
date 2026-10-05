const http = require('http');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');
const port = process.env.PORT || 3000;
const root = __dirname;
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.ico':'image/x-icon'};

const server = http.createServer((req,res)=>{
  let urlPath = decodeURIComponent((req.url||'/').split('?')[0]);
  if(urlPath === '/') urlPath = '/index.html';
  const file = path.normalize(path.join(root,urlPath));
  if(!file.startsWith(root)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(file,(err,data)=>{
    if(err){
      if(err.code==='ENOENT') { res.writeHead(404); return res.end('Not found'); }
      res.writeHead(500); return res.end('Server error');
    }
    res.writeHead(200,{'Content-Type':mime[path.extname(file).toLowerCase()]||'application/octet-stream','Cache-Control':'no-cache'}); res.end(data);
  });
});

const wss = new WebSocket.Server({server});
const rooms = new Map();
let nextConnId = 1;

function send(ws, msg){ if(ws && ws.readyState===WebSocket.OPEN) ws.send(JSON.stringify(msg)); }
function leaveRoom(ws){
  const r=ws.room ? rooms.get(ws.room) : null;
  if(!r) return;
  if(r.host===ws) r.host=null;
  r.guests.delete(ws);
  if(!r.host && r.guests.size===0) rooms.delete(ws.room);
  ws.room=null;
}

wss.on('connection',(ws)=>{
  ws.connId='c'+(nextConnId++);
  ws.on('message',(raw)=>{
    let m; try{m=JSON.parse(raw.toString())}catch{return send(ws,{type:'error',code:'bad_message',message:'Invalid server message.'})}
    if(m.type==='host'){
      const room=String(m.room||'').toUpperCase();
      if(!room) return send(ws,{type:'error',code:'bad_room',message:'Missing room code.'});
      if(rooms.has(room)) return send(ws,{type:'error',code:'room_exists',message:'That room already exists. Create a new room.'});
      leaveRoom(ws); rooms.set(room,{host:ws,guests:new Set()}); ws.room=room;
      send(ws,{type:'host_ready',room}); return;
    }
    if(m.type==='join'){
      const room=String(m.room||'').toUpperCase(), r=rooms.get(room);
      if(!r || !r.host) return send(ws,{type:'error',code:'room_not_found',message:'Room not found. Ask the host for a fresh join link.'});
      if(r.guests.size>=8) return send(ws,{type:'error',code:'room_full',message:'Room is full.'});
      leaveRoom(ws); ws.room=room; r.guests.add(ws);
      send(ws,{type:'joined',room,connId:ws.connId});
      send(r.host,{type:'guest_message',connId:ws.connId,data:{type:'hello',id:m.id,name:String(m.name||'Player').slice(0,18)}});
      return;
    }
    const r=ws.room ? rooms.get(ws.room) : null;
    if(!r) return send(ws,{type:'error',code:'not_in_room',message:'You are not connected to a room.'});
    if(r.host===ws){
      if(m.type==='state'){
        for(const g of r.guests) send(g,{type:'state',state:m.state});
      } else if(m.type==='kick'){
        const g=[...r.guests].find(x=>x.connId===m.connId); if(g){send(g,{type:'error',code:'kicked',message:'You were removed from the room.'});g.close();}
      }
    } else {
      send(r.host,{type:'guest_message',connId:ws.connId,data:m.data||m});
    }
  });
  ws.on('close',()=>{
    const r=ws.room ? rooms.get(ws.room) : null;
    if(r && r.host===ws){ for(const g of r.guests) send(g,{type:'error',code:'host_left',message:'The host disconnected.'}); }
    leaveRoom(ws);
  });
});

server.listen(port,()=>console.log(`Life RPG running on port ${port}`));
