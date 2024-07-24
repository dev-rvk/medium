"use strict";
// fetch from npm module
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlog = exports.createBlog = exports.signInInput = exports.signUpInput = void 0;
const zod_1 = require("zod");
// typescript variavles that the backend uses to validate the requests from frontend
exports.signUpInput = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid Email" }),
    password: zod_1.z
        .string()
        .min(6, { message: "Enter password of minimum 6 characters" }),
    name: zod_1.z.string().optional(),
});
exports.signInInput = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid Email" }),
    password: zod_1.z
        .string()
        .min(6, { message: "Enter password of minimum 6 characters" }),
});
exports.createBlog = zod_1.z.object({
    title: zod_1.z.string().max(256),
    content: zod_1.z.string(),
});
exports.updateBlog = zod_1.z.object({
    id: zod_1.z.string(),
    title: zod_1.z.string().max(256),
    content: zod_1.z.string(),
});
