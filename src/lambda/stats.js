// example of async handler using async-await
// https://github.com/netlify/netlify-lambda/issues/43#issuecomment-444618311

import axios from 'axios';
export async function handler(event, context) {
	try {
		const response = await axios.get(
			'https://stats.nba.com/stats/leaguedashplayerstats?College=&Conference=&Country=&DateFrom=&DateTo=&Division=&DraftPick=&DraftYear=&GameScope=&GameSegment=&Height=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=PerGame&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season=2020-21&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&StarterBench=&TeamID=0&TwoWay=0&VsConference=&VsDivision=&Weight=',
			{
				headers: {
					Connection: 'keep-alive',
					'User-Agent':
						'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Safari/537.36',
					'x-nba-stats-origin': 'stats',
					Referer: 'https://stats.nba.com/',
					accept: '*/*',
					'accept-language': 'en-US,en;q=0.9',
					// "sec-fetch-dest": "empty",
					// "sec-fetch-mode": "cors",
					// "sec-fetch-site": "same-site"
				},
			}
		);
		const data = response.data.resultSets[0];

		console.log('response > ', response.data.resultSets[0]);
		return {
			statusCode: 200,
			body: JSON.stringify({ msg: data }),
			// body: data.toString(),
		};
	} catch (err) {
		console.log(err); // output to netlify function log
		return {
			statusCode: 500,
			body: JSON.stringify({ msg: err.message }), // Could be a custom message or object i.e. JSON.stringify(err)
		};
	}
}

// fetch(
// 	'https://stats.nba.com/stats/leaguedashplayerstats?College=&Conference=&Country=&DateFrom=&DateTo=&Division=&DraftPick=&DraftYear=&GameScope=&GameSegment=&Height=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=PerGame&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season=2020-21&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&StarterBench=&TeamID=0&TwoWay=0&VsConference=&VsDivision=&Weight=',
// 	{
// 		headers: {
// 			accept: '*/*',
// 			'accept-language': 'en-US,en;q=0.9',
// 			'sec-fetch-dest': 'empty',
// 			'sec-fetch-mode': 'cors',
// 			'sec-fetch-site': 'same-site',
// 		},
// 		referrer: 'https://www.nba.com/',
// 		referrerPolicy: 'strict-origin-when-cross-origin',
// 		body: null,
// 		method: 'OPTIONS',
// 		mode: 'cors',
// 	}
// );
