import { setTimeout } from "node:timers/promises";
import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import Router from "koa-router";

const port = process.env.PORT ?? 3001

new Koa()
  .use(cors())
  .use(bodyParser({ enableTypes: ["json"] }))
  .use(
    new Router().
      post("/register", async (ctx) => {
        await setTimeout(2000);
        ctx.status = 200;
        ctx.body = ctx.request.body;
      })
      .routes()
  )
  .listen(port, () => {
    console.log(`Server running at port ${port}`);
  });
