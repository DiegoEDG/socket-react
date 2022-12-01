import { Chart } from 'chart.js';
import React, { useContext, useEffect } from 'react';
import { SocketContext } from '../context/SocketContext';

export const BandChart = () => {
	const { socket } = useContext(SocketContext);

	useEffect(() => {
		socket.on('bandList', (data) => {
			createChart(data);
		});
	}, [socket]);

	const createChart = (data) => {
		const ctx = document.getElementById('myChart');

		new Chart(ctx, {
			type: 'horizontalBar',
			data: {
				labels: data.map((band) => band.name),
				datasets: [
					{
						label: '# of Votes',
						data: data.map((band) => band.votes),
						borderWidth: 1,
						backgroundColor: [
							'rgba(255, 99, 132,0.2)',
							'rgba(255, 162, 235,0.2)',
							'rgba(255, 206, 86,0.2)',
							'rgba(255, 192, 192,0.2)',
							'rgba(255, 102, 255,0.2)'
						]
					}
				]
			},
			options: {
				animation: false,
				scales: {
					xAxes: [
						{
							stacked: true
						}
					]
				}
			}
		});
	};

	return <canvas id="myChart"></canvas>;
};
