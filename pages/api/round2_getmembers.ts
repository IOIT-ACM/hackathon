import axios from "axios";
import { error } from "console";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const getMembersSchema = z.object({
	teamId: z.string(),
	phoneNumber: z
		.string()
		.min(10, { message: "Valid phone number is required" })
		.max(10, { message: "Valid phone number is required" }),
});

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const data = req.body;
	try {
		getMembersSchema.parse(data);
	} catch (error) {
		if (error instanceof z.ZodError) {
			console.error(error);
			return res.status(400).json({ message: "Could not parse request body." });
		}
	}

	if (!process.env.SHEETS_DB_ENDPOINT_REG || !process.env.SHEETS_DB_TOKEN_REG) {
		error(
			"Could not find SHEETS_DB_ENDPOINT or SHEETS_DB_TOKEN Environment variables."
		);
		return res.status(500);
	} else {
		const sheet_res = await axios.get(
			`${process.env.SHEETS_DB_ENDPOINT_REG!}/search?Team%20Leader%20Phone=91${
				data.phoneNumber
			}`,
			{
				headers: {
					Authorization: `Bearer ${process.env.SHEETS_DB_TOKEN_REG!}`,
				},
			}
		);
		if (sheet_res.status >= 200 && sheet_res.status < 300) {
			if (sheet_res.data.length > 0 && sheet_res.data[0].id == data.teamId) {
				return res.status(200).json({
					count: parseInt(sheet_res.data[0]["No of Team members"]),
				});
			} else {
				return res
					.status(400)
					.json({ message: "Could not get members count." });
			}
		} else {
			return res.status(400).json({ message: "Could not get members count." });
		}
	}
}
