// fetch from npm module

import { z } from "zod";

// typescript variavles that the backend uses to validate the requests from frontend
export const signUpInput = z.object({
	email: z.string().email({ message: "Invalid Email" }),
	password: z
		.string()
		.min(6, { message: "Enter password of minimum 6 characters" }),
	name: z.string().optional(),
});
export const signInInput = z.object({
	email: z.string().email({ message: "Invalid Email" }),
	password: z
		.string()
		.min(6, { message: "Enter password of minimum 6 characters" }),
});
export const createBlog = z.object({
	title: z.string().max(256),
	content: z.string(),
});
export const updateBlog = z.object({
	id: z.string(),
	title: z.string().max(256),
	content: z.string(),
});

// types that are used by frontend to send requests
export type SignUpInput = z.infer<typeof signUpInput>;
export type SignInInput = z.infer<typeof signInInput>;
export type CreateBlog = z.infer<typeof createBlog>;
export type UpdateBlog = z.infer<typeof updateBlog>;
