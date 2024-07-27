import { Hono } from "hono";
import { CookieStore, sessionMiddleware } from "hono-sessions";
import { setCookie } from "hono/cookie";

const app = new Hono();
const store = new CookieStore();

app.use(
  "*",
  sessionMiddleware({
    store,
    encryptionKey: Bun.env.SESSION_ENCRYPTION_KEY,
    expireAfterSeconds: 900,
    cookieOptions: {
      path: "/",
      httpOnly: true,
    },
  })
);

app
  .get("/", (c) => {
    console.log("secret: " + Bun.env.SESSION_ENCRYPTION_KEY);

    return c.text("Hello Hono!");
  })
  .get("/login", (c) => {
    const session = c.get("session");
    console.log("cookie" + JSON.stringify(c.get("session")));

    session.set("userId", 85466754976);

    return c.redirect("/");
  })
  .get("/set-cookie", (c) => {
    setCookie(c, "cookie_name", "cookie_value", { httpOnly: true });
    return c.text("done");
  });

export default app;
