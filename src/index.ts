import { Hono } from 'hono'
import {setCookie} from "hono/dist/types/helper/cookie"
import { CookieStore, sessionMiddleware } from 'hono-sessions'

const app = new Hono()
const store = new CookieStore()

app.use('*', sessionMiddleware({
  store,
  encryptionKey: 'password_at_least_32_characters_long',
  expireAfterSeconds: 900,
  cookieOptions: {
    sameSite: 'Lax',
    path: '/',
    httpOnly: true,
  },
}))

app.get('/', (c) => {
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
