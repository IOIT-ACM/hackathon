import { z } from "zod";

const registrationFormSchema = z.object({
	teamLeader: z.object({
		firstName: z.string().min(1, { message: "First name is required" }),
		lastName: z.string().min(1, { message: "Last name is required" }),
		phoneNumber: z
			.string()
			.min(10, { message: "Valid phone number is required" })
			.max(10, { message: "Valid phone number is required" }),
		email: z.string().email({ message: "Valid email is required" }),
	}),
	teamId: z.string().min(1, "Please select a team to proceed."),

	transactionId: z
		.string()
		.length(12, { message: "UTR must be exactly 12 digits." })
		.regex(/^\d+$/, { message: "UTR must contain only digits." }),
		
	declaration: z.literal(true, {
		errorMap: () => ({
			message: "You must agree to the declaration to proceed.",
		}),
	}),
});
export default registrationFormSchema;
