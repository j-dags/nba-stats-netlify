import React, { Component } from 'react';
import logo from './logo.svg';
import fetch from 'node-fetch';
import './App.css';

class LambdaDemo extends Component {
	constructor(props) {
		super(props);
		this.state = { loading: false, msg: null };
	}

	handleClick = (api) => (e) => {
		e.preventDefault();

		this.setState({ loading: true });
		fetch('/.netlify/functions/' + api)
			.then((response) => response.json())
			// .then((json) => this.setState({ loading: false, msg: json.msg }));
			.then((json) => console.log('response > ', json))
			.then((json) => this.setState({ loading: false }));
	};

	render() {
		const { loading, msg } = this.state;

		return (
			<p>
				<button onClick={this.handleClick('hello')}>
					{loading ? 'Loading...' : 'Call Lambda'}
				</button>
				<button onClick={this.handleClick('async-dadjoke')}>
					{loading ? 'Loading...' : 'Call Async Lambda'}
				</button>
				<button onClick={this.handleClick('stats')}>
					{loading ? 'Loading...' : 'Get Stats BB'}
				</button>
				<br />
				<span>{msg}</span>
			</p>
		);
	}
}

class App extends Component {
	render() {
		// const results = fetch(
		// 	'https://stats.nba.com/stats/leaguedashplayerstats?College=&Conference=&Country=&DateFrom=&DateTo=&Division=&DraftPick=&DraftYear=&GameScope=&GameSegment=&Height=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=PerGame&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season=2020-21&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&StarterBench=&TeamID=0&TwoWay=0&VsConference=&VsDivision=&Weight=',
		// 	{
		// 		headers: {
		// 			Connection: 'keep-alive',
		// 			'User-Agent':
		// 				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Safari/537.36',
		// 			'x-nba-stats-origin': 'stats',
		// 			Referer: 'https://stats.nba.com/',
		// 		},
		// 	}
		// );
		// // const data = results.json();
		// // const headers = data.resultSets[0].headers;
		// // const stats = data.resultSets[0].rowSet;
		// // const transformedData = stats.map((player) => {
		// // 	return player.reduce((obj, el, idx) => {
		// // 		return {
		// // 			...obj,
		// // 			[headers[idx]]: el,
		// // 		};
		// // 	}, {});
		// // });

		// console.log('data > ', results);

		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<p>
						Edit <code>src/App.js</code> and save to reload.
					</p>
					<LambdaDemo />
				</header>
			</div>
		);
	}
}

export default App;
