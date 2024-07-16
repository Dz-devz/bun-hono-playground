import { Hono } from 'hono'
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