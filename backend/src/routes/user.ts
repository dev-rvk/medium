import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, decode, verify } from "hono/jwt";
import { signInInput, signUpInput } from "@dev-rvk/medium-common";

export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
}>();

userRouter.post("/signup", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const { success, error } = signUpInput.safeParse(body);
	if (!success) {
		c.status(400);
		return c.json({ error: "Cannot SignUp", value: error });
	}
	try {
		const user = await prisma.user.create({
			data: {
				email: body.email,
				password: body.password,
			},
		});
		const secret = c.env.JWT_SECRET;
		const token = await sign({ id: user.id }, secret);
		return c.json({ token });
	} catch (e) {
		c.status(403);
		return c.json({ error: "Error while Signup", value: e });
	}
});

userRouter.post("/signin", async (c) => {
	// initialize prisma
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const { success, error } = signInInput.safeParse(body);
	if (!success) {
		c.status(400);
		return c.json({ error: "Cannot SignIn", value: error });
	}
	const user = await prisma.user.findUnique({
		where: {
			email: body.email,
			password: body.password,
		},
	});
	if (!user) {
		c.status(403);
		return c.json({ error: "No user found" });
	}
	const secret = c.env.JWT_SECRET;
	const token = await sign({ id: user.id }, secret);
	return c.json(token);
});
