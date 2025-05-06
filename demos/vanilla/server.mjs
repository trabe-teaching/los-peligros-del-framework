import http from "node:http";
import { setTimeout } from "node:timers/promises";

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, POST");
  res.setHeader("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method === "POST" && req.url === "/register") {
    let chunks = [];

    req.on("data", chunk => {
      chunks.push(chunk.toString());
    });

    req.on("end", async () => {
      const data = JSON.parse(chunks.join(""));

      await setTimeout(2000);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(data));
    });

    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
});

const port = process.env.PORT ?? 3001

server.listen(port, "0.0.0.0", () => {
  console.log(`Server running at port ${port}`);
});
