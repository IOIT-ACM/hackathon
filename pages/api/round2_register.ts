import registrationFormSchema from "@/components/RegistrationForm/schema";
import axios from "axios";
import { error } from "console";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const data = req.body.data;
	console.log(data);
	try {
		registrationFormSchema.parse(data);
	} catch (error) {
		if (error instanceof z.ZodError) {
			console.error(error);
			res.status(400).json({ message: "Could not parse request body." });
		}
	}
	if (!process.env.SHEETS_DB_ENDPOINT_REG || !process.env.SHEETS_DB_TOKEN_REG) {
		error(
			"Could not find SHEETS_DB_ENDPOINT or SHEETS_DB_TOKEN Environment variables."
		);
		res.status(500);
	} else {
		const sheet_res_get = await axios.get(
			`${process.env.SHEETS_DB_ENDPOINT_REG!}/search?Team%20Leader%20Phone=91${
				data.teamLeader.phoneNumber
			}`,
			{
				headers: {
					Authorization: `Bearer ${process.env.SHEETS_DB_TOKEN_REG!}`,
				},
			}
		);
		if (sheet_res_get.status >= 200 && sheet_res_get.status < 300) {
			console.log(sheet_res_get.data);
			if (
				sheet_res_get.data.length > 0 &&
				sheet_res_get.data[0].id == data.teamId
			) {
				const sheet_res = await axios.patch(
					`${process.env.SHEETS_DB_ENDPOINT_REG!}/id/${data.teamId}`,
					{
						data: [
							{
								"Transaction ID": data.transactionId,
							},
						],
					},
					{
						headers: {
							Authorization: `Bearer ${process.env.SHEETS_DB_TOKEN_REG}`,
						},
					}
				);
				if (sheet_res.status >= 200 && sheet_res.status < 300) {
					res.status(200).json({
						message: "Form successfully submitted.",
					});
				} else {
					res.status(400).json({ message: "Could not submit form." });
				}
			} else {
				res.status(400).json({ message: "Could not submit form." });
			}
		} else {
			res.status(400).json({ message: "Could not submit form." });
		}
	}
}
