// Data file to hold question information
export const questions_data  = [{
	id: 0,
	text: "Imagine that the U.S. Central Intelligence Agency gets wind of a plot to set off a dirty bomb in a major American city. Agents capture a suspect who, they believe, has information about where the bomb is planted. Is it permissible for them to torture the suspect into revealing the bomb's whereabouts",
	answers: [
			  {key: 'Yes (Utilitarian)', value: ['CG']}, 
			  {key: 'No', value: ['W', 'V']}, 
			  {key: 'Yes, but on the condition that the torture is not fatal', value: ['W', 'V']}, 
			  {key: 'Yes, if the majority agrees', value: ['U']}, 
			  {key: 'Yes, if the number of people killed whom the bomb would kill exceeds the number of people whom the torture would kill', value: ['U', 'CG']}, 
			  {key: "No, because there isn't enough proof that the man is responsible", value: ['R', 'F']}, 
			  {key: 'No, because nothing condemns the man besides rumor', value: ['R','D']}, 
			  {key: 'Maybe, it depends on the number of people the bomb would harm', value : ['U']}
			]
	}
	
/*
Commenting this out for now; it's the old format
	{id: 1,
	text: "Suppose that the National Football League institutes a rule that any active player should not be allowed to consume CBD oil or other forms of cannabis, and that any consumption will result in a year-long ban and a hefty, 6-figure fine. If the US government legalizes the usage of all forms of cannabis to all US citizens over 18, is the NFL’s policy on cannabis usage ethical?",
	answers: ['Yes', 'No', 'Yes, the players work for the NFL, not the government', 'Yes, the NFL is looking out for players, and nothing more', 'Yes, if the NFL determines through any means that those who consume CBD get some advantage', 'Yes, since other jobs require drug tests (retail, fast food)', 'No, the decision to use cannabis should not be determined by anyone but the self', 'No, if it is proven that enough people use cannabis in the NFL already', 'No, the NFL does not take priority over the law']
	}
*/
];

