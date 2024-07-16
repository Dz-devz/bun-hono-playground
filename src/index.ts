import { Hono } from 'hono'
import {setCookie} from "hono/dist/types/helper/cookie"

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
}).get("/set-cookie", (c) => {
  setCookie(c,
    "cookie_name",
    "coo",
    {httpOnly: true}
  )
  return c.text("done")
})

export default app
