import { z } from "zod";

const interestFormSchema = z.object({
	firstName: z.string().min(1, { message: "First name is required" }),
	lastName: z.string().min(1, { message: "Last name is required" }),
	phoneNumber: z
		.string()
		.min(10, { message: "Valid phone number is required" }),
	email: z.string().email({ message: "Valid email is required" }),
	twitterHandle: z.string(),
	interests: z.object({
		ai: z.boolean(),
		finance: z.boolean(),
		software: z.boolean(),
		hardware: z.boolean(),
	}),
});
export default interestFormSchema;
