import { Hono } from 'hono'
import {setCookie} from "hono/cookie"
import { MiddleWare } from '../middleware/middleware'

const app = new Hono()

MiddleWare();

app.get('/', (c) => {
  console.log("secret: " + Bun.env.SESSION_ENCRYPTION_KEY);
  
  return c.text('Hello Hono!')
}).get("/set-cookie", (c) => {
  setCookie(c,
    "cookie_name",
    "cookie_value",
    {httpOnly: true}
  )
  return c.text("done")
})

export default app
