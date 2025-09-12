const faqs: { question: string; answer: React.ReactNode }[] = [
	{
		question: "What if I don't have a team?",
		answer: "We will match you with participants.",
	},
	{ question: "What would be the communication channel?", answer: "Discord." },
	{ question: "Duration of the hackathon?", answer: "12 hours, offline." },
	{
		question: "Other activities during hackathon?",
		answer:
			"Mini events (Vibecoding, After Party, Experience Zones and Jamming).",
	},
	{ question: "What is the Theme?", answer: "The theme is 'The Matrix'" },
	{ question: "Refreshments and coffee?", answer: "Yes." },
	{
		question: "What are the problem statements?",
		answer:
			"The hackathon will be open innovation, which means that you can choose your own problem statements.",
	},
	{
		question: "What if I've never been to a hackathon before?",
		answer:
			"That's completely OK! We welcome hackers of all skill levels. We will provide resources, mentorship, and workshops to help you learn and develop your project.",
	},
	{
		question: "Are travel reimbursements provided?",
		answer:
			"No, unfortunately travel reimbursements will not be provided this year at TENET Hackathon.",
	},
	{
		question: "When do hacker applications open?",
		answer: <div>Hacker applications are live at <a className="hover:text-primary-white underline " target="_blank" href='https://unstop.com/hackathons/tenet-hack-25-tenet-aissms-institute-of-information-technology-pune-maharashtra-1551923'>{"Unstop"}</a></div>,
	},
	{
		question: "How much does it cost to attend?",
		answer:
			"Round 1 is free, registration fees are Rs. 150 per member for teams shortlisted for Round 2. ",
	},
];
export default faqs;