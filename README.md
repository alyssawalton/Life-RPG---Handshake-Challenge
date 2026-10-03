# Life RPG v20 — Web Multiplayer

This version is designed to be **hosted on the web** instead of being sent as a ZIP between players.

## Multiplayer

Life RPG uses PeerJS for browser-to-browser multiplayer signaling/data connections. The game page itself can be hosted as a normal HTTPS website; players do not need to download the game from each other.

1. Host opens the public website.
2. Host clicks **Create Room**.
3. Host copies the generated join link.
4. Friend opens that link on another device.
5. Friend enters a name. The room code is already taken from the URL.
6. Both players appear in the same lobby and share game state in real time.
7. Host starts the battle after everyone chooses a class.

The host browser is authoritative for room state, while PeerJS carries the multiplayer messages.

## Run locally

Requires Node 18+.

```bash
npm start
```

Then open `http://localhost:3000`.

For two devices on the same network, use the computer's LAN address, e.g. `http://192.168.1.25:3000`. For actual friends over the internet, deploy the folder to a public HTTPS host.

## Deploy

### Render
Create a new **Web Service**, upload/push this folder, use:
- Build command: none
- Start command: `npm start`

Render supplies `PORT` automatically.

### Railway / Fly.io / any Node host
Use `npm start` as the start command. The included `server.js` serves the game.

### Static hosting
The app is also a static site. `index.html` can be deployed to GitHub Pages, Netlify, Vercel, Cloudflare Pages, etc. PeerJS supplies the signaling service used by the browser. HTTPS is recommended for public use.

## Important

Do not test public multiplayer from `file://` URLs. Use the hosted `https://` URL (or the local Node server) so the browser has a normal web origin.
