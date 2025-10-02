import registrationFormSchema from "@/components/RegistrationForm/schema";
import axios from "axios";
import { error } from "console";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (!process.env.SHEETS_DB_ENDPOINT_REG || !process.env.SHEETS_DB_TOKEN_REG) {
		error(
			"Could not find SHEETS_DB_ENDPOINT or SHEETS_DB_TOKEN Environment variables."
		);
		res.status(500);
	} else {
		const sheet_res = await axios.get(
			`${process.env.SHEETS_DB_ENDPOINT_REG!}/`,
			{
				data: [{ single_object: true }, { sheet: "Sheet1" }, { offset: 1 }],

				headers: {
					Authorization: `Bearer ${process.env.SHEETS_DB_TOKEN_REG!}`,
				},
			}
		);
		if (sheet_res.status >= 200 && sheet_res.status < 300) {
			return res.status(200).json({
				teams: sheet_res.data.map(
					(team: {
						id: string;
						"Team Leader Name": string;
						"Team Leader Email": string;
						"Team Leader Phone": string;
						"Transaction ID": string;
						"Team Name": string;
						"No of Team members": string;
						Verified: string;
					}) => {
						return {
							id: team.id,
							name: team["Team Name"],
							transactionID: team["Transaction ID"],
							membersCount: team["No of Team members"],
						};
					}
				),
			});
		} else {
			return res.status(400).json({ message: "Could not get team details." });
		}
	}
}
