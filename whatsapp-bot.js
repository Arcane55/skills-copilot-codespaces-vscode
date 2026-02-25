const http = require("http");
const { parse: parseQuery } = require("querystring");

const port = Number(process.env.PORT) || 3000;

function twimlMessage(message) {
  return `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${message}</Message></Response>`;
}

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok", service: "whatsapp-bot" }));
    return;
  }

  if (req.method === "POST" && req.url === "/whatsapp") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const data = parseQuery(body);
      const incoming = typeof data.Body === "string" ? data.Body.trim() : "";
      const reply = incoming ? `You said: ${incoming}` : "Hello from your WhatsApp bot!";
      res.writeHead(200, { "Content-Type": "text/xml; charset=utf-8" });
      res.end(twimlMessage(reply));
    });
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not Found" }));
});

server.listen(port, () => {
  console.log(`WhatsApp bot listening on port ${port}`);
});
