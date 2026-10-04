# Life RPG v29

## Important: how to run it
Life RPG is a multiplayer web app and needs the included Node.js WebSocket server. **Do not open `index.html` directly with `file://` for multiplayer.**

### Windows
1. Install Node.js 18+ if you do not already have it.
2. Extract this ZIP completely.
3. Double-click `start-local.bat`.
4. Your browser should open `http://localhost:3000/`.
5. Create the room there and share the room URL only when using a hosted/public server. For friends on other devices, deploy the folder to a Node host such as Render.

### Hosted deployment
- Build command: `npm install`
- Start command: `npm start`
- The service must expose the Node HTTP + WebSocket server.
- Share the resulting `https://...` URL.

## v29 fixes
- Fixed the invalid `ws://` URL when the game was opened from a `file://` URL.
- Added a Windows one-click local server launcher.
- Boss artwork remains under `assets/bosses/` and is served correctly by the Node server.
- Multiplayer still uses WebSockets and works across separate devices when hosted.
