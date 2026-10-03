# Life RPG — Handshake Challenge

A multiplayer real-life RPG for the Handshake Challenge.

## Run locally

```bash
npm install
npm start
```

Open `http://localhost:3000`.

## Multiplayer

This version uses the same Node server for both the website and multiplayer WebSocket connection. The host creates a room and shares the generated `?room=XXXXXX` link. Friends open that public link on another device.

For internet play, deploy the folder to a Node host such as Render. Use:

- Build command: `npm install`
- Start command: `npm start`
- Node version: 18+

The public URL must be HTTPS so the browser can use a secure WebSocket (`wss://`).
