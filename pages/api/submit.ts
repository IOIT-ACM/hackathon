import interestFormSchema from "@/components/TenetHackForm/schema";
import axios from "axios";
import { error } from "console";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const data = req.body.data;
	try {
		interestFormSchema.parse(data);
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
		let interests = "";
		Object.entries(data.interests).forEach((interest) => {
			console.log(interest);
			if (interest[1] == true) {
				interests += interest[0] + " ";
			}
		});
		interests = interests.trim().split(" ").join(", ");
		const sheet_res = await axios.post(
			process.env.SHEETS_DB_ENDPOINT,
			{
				data: [
					{
						id: "INCREMENT",
						"First Name": data.firstName,
						"Last Name": data.lastName,
						"Email Address": data.email,
						"Phone Number": data.phoneNumber,
						"Twitter Handle": data.twitterHandle,
						Interests: interests,
					},
				],
			},
			{
				headers: { Authorization: `Bearer ${process.env.SHEETS_DB_TOKEN}` },
			}
		);
		if (sheet_res.status >= 200 && sheet_res.status < 300) {
			res.status(200).json({
				message: "Form successfully submitted.",
			});
		} else {
			res.status(400).json({ message: "Could not submit form." });
		}
	}
}
