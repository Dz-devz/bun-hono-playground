import { Hono } from 'hono'
import { CookieStore, sessionMiddleware } from 'hono-sessions'

const app = new Hono()
const store = new CookieStore()

export function MiddleWare(){
  app.use('*', sessionMiddleware({
    store,
    encryptionKey: Bun.env.SESSION_ENCRYPTION_KEY,
    expireAfterSeconds: 900,
    cookieOptions: {
      path: '/',
      httpOnly: true,
    },
  }))
}
