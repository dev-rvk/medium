import { Hono } from "hono";
import { cors } from 'hono/cors'
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";

const app = new Hono();
app.use('/api/*', cors())

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

export default app;
