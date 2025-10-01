import { z } from "zod";

const registrationFormSchema = z.object({
	teamLeader: z.object({
		firstName: z.string().min(1, { message: "First name is required" }),
		lastName: z.string().min(1, { message: "Last name is required" }),
		phoneNumber: z
			.string()
			.min(10, { message: "Valid phone number is required" }),
		email: z.string().email({ message: "Valid email is required" }),
	}),
	teamMembers: z.array(z.string()).max(3).min(1),
	transactionId: z.string(),
});
export default registrationFormSchema;
