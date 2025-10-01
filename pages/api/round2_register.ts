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
		const teamMembers = data.teamMembers.map(
			(member: string, index: number) => ({
				[`Team Member ${index + 1}`]: member,
			})
		);
		const sheet_res = await axios.post(
			process.env.SHEETS_DB_ENDPOINT_REG!,
			{
				data: [
					{
						id: "INCREMENT",
						"Team Leader Name":
							data.teamLeader.firstName + " " + data.teamLeader.lastName,
						"Team Leader Email": data.teamLeader.email,
						"Team Leader Phone": data.teamLeader.phoneNumber,
						"Transaction ID": data.transactionId,
						"Team Member 1": data.teamMembers[0] ?? "",
						"Team Member 2": data.teamMembers[1] ?? "",
						"Team Member 3": data.teamMembers[2] ?? "",
					},
				],
			},
			{
				headers: { Authorization: `Bearer ${process.env.SHEETS_DB_TOKEN_REG}` },
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
