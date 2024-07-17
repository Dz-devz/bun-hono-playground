import { Hono } from 'hono'
import {setCookie} from "hono/cookie"
import { MiddleWare } from '../middleware/middleware'


const app = new Hono()

MiddleWare();

app.get('/', (c) => {
  console.log("secret: " + Bun.env.SESSION_ENCRYPTION_KEY);
  
  return c.text('Hello Hono!')
}).get("/login", (c) => {
    const session = c.get('session')
    console.log("cookie" + JSON.stringify(c.get('session')))

    session.set("userId", 85466754976)
    
    return c.redirect("/")
}).get("/set-cookie", (c) => {
  setCookie(c,
    "cookie_name",
    "cookie_value",
    {httpOnly: true}
  )
  return c.text("done")
})

export default app
