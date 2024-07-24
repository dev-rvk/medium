import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, decode, verify } from "hono/jwt";
import { createBlog, updateBlog } from "@dev-rvk/medium-common";

export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
	Variables: {
		userId: string;
	};
}>();

// Middleware to verify JWT
blogRouter.use("/*", async (c, next) => {
	const header = c.req.header("Authorization");
	if (!header) {
		c.status(401);
		return c.json({ error: "Unauthorized" });
	}
	const token = header.split(" ")[1];
	const secret = c.env.JWT_SECRET;
	try {
		const payload = await verify(token, secret);
		// console.log(payload);

		if (!payload || !payload.id) {
			c.status(401);
			return c.json({ error: "Unauthorized" });
		}

		c.set("userId", payload.id);
		await next();
	} catch (e) {
		console.error("Error verifying JWT:", e);
		c.status(401);
		return c.json({ error: "Unauthorized" });
	}
});

blogRouter.post("/", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const userID = c.get("userId");
	if (!userID) {
		c.status(401);
		return c.json({ error: "Unauthorized" });
	}
	const body = await c.req.json();
	const { success, error } = createBlog.safeParse(body);
	if (!success) {
		c.status(400);
		return c.json({ error: "Cannot Post Blog", value: error });
	}
	try {
		const post = await prisma.post.create({
			data: {
				title: body.title,
				content: body.content,
				authorId: userID,
			},
		});
		return c.json({ status: "Posted", id: post.id });
	} catch (e) {
		return c.json({ error: "Cannot Post Blog", value: e });
	}
});

blogRouter.put("/", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const userID = c.get("userId");
	if (!userID) {
		c.status(401);
		return c.json({ error: "Unauthorized" });
	}
	const body = await c.req.json();
	const { success, error } = updateBlog.safeParse(body);
	if (!success) {
		c.status(400);
		return c.json({ error: "Cannot Update Blog", value: error });
	}
	try {
		const post = await prisma.post.update({
			where: {
				id: body.id,
				authorId: userID,
			},
			data: {
				title: body.title,
				content: body.content,
			},
		});
		return c.json({ status: "Post Edited", id: post.id });
	} catch (e) {
		c.status(404);
		return c.json({ error: "Cannot Find Post", value: e });
	}
});

blogRouter.get("/bulk", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	const blogs = await prisma.post.findMany({
		select: {
			title: true,
			content: true,
			id:true,
			author: {
				select:{
					name: true
				}
			}
		}
	});
	return c.json(blogs);
});

blogRouter.get("/:id", async (c) => {
	const id = c.req.param("id");
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());
	// console.log(id);
	try {
		const post = await prisma.post.findUnique({
			where: {
				id: id,
			},
			select: {
				title: true,
				content: true,
				id:true,
				author: {
					select:{
						name: true
					}
				}
			}
		});
		return c.json(post);
	} catch (e) {
		c.status(404);
		return c.json({ error: "Cannot Find Post", value: e });
	}
});
