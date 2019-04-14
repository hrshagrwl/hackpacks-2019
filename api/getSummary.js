async function getSummary(){
	const deepai = require('deepai'); // OR include deepai.min.js as a script tag in your HTML

	// deepai.setApiKey('52bd313e-2be6-4801-ba74-7ae9a51c40ad');

	// var resp = await deepai.callStandardApi("summarization", {
	//         text: "YOUR_TEXT_URL",
	// });
	// console.log(resp);


	// Example posting a local text file (Node.js only):
	const fs = require('fs');

	// const deepai = require('deepai'); // OR include deepai.min.js as a script tag in your HTML

	deepai.setApiKey('52bd313e-2be6-4801-ba74-7ae9a51c40ad');

	var resp = await deepai.callStandardApi("summarization", {
	        text: fs.createReadStream("../resources/001.txt"),
	});
	console.log(resp);


	// // Example directly sending a text string:

	// const deepai = require('deepai'); // OR include deepai.min.js as a script tag in your HTML

	// deepai.setApiKey('YOUR_API_KEY');
}

getSummary();