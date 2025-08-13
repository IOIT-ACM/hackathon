import axios from "axios";
import { error } from "console";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const interestFormSchema = z.object({
	"First Name": z.string().min(1, { message: "First name is required" }),
	"Last Name": z.string().min(1, { message: "Last name is required" }),
	"Phone Number": z
		.string()
		.min(10, { message: "Valid phone number is required" }),
	"Email Address": z.string().email({ message: "Valid email is required" }),
	"Twitter Handle": z.string(),
	Interests: z.string(),
});
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const data = req.body;
	try {
		interestFormSchema.parse(data.data[0]);
	} catch (error) {
		if (error instanceof z.ZodError) {
			console.error(error);
			res.status(400).json({ message: "Could not parse request body." });
		}
	}
	if (!process.env.SHEETS_DB_ENDPOINT || !process.env.SHEETS_DB_TOKEN) {
		error(
			"Could not find SHEETS_DB_ENDPOINT or SHEETS_DB_TOKEN Environment variables."
		);
		res.status(500);
	} else {
		const sheet_res = await axios.post(process.env.SHEETS_DB_ENDPOINT, data, {
			headers: { Authorization: `Bearer ${process.env.SHEETS_DB_TOKEN}` },
		});
		if (sheet_res.status >= 200 && sheet_res.status < 300) {
			res.status(200).json({
				message: "Form successfully submitted.",
			});
		} else {
			res.status(400).json({ message: "Could not submit form." });
		}
	}
}
