# skills-copilot-codespaces-vscode

## WhatsApp bot

This repository now includes a minimal WhatsApp bot webhook server.

### Run

```bash
node whatsapp-bot.js
```

The server listens on `http://localhost:3000` by default (set `PORT` to change it).

### Webhook endpoint

- `POST /whatsapp`: accepts Twilio-style form data and responds with TwiML.
- Incoming `Body` text is echoed back as:
  - `You said: <message>`
