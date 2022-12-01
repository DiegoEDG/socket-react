import { useContext, useEffect, useState } from 'react';
import { BandList } from '../components/BandList';
import { AddBand } from '../components/AddBand';
import { SocketContext } from '../context/SocketContext';
import { BandChart } from '../components/BandChart';

function HomePage() {
	const { online } = useContext(SocketContext);

	return (
		<div className="container">
			<h1>Band App</h1>
			<p>
				Status:
				{online ? <span className="text-success"> Online</span> : <span className="text-danger"> Offline</span>}
			</p>
			<BandChart />
			<hr />
			<div className="row">
				<div className="col-8">
					<BandList />
				</div>
				<div className="col-4">
					<AddBand />
				</div>
			</div>
		</div>
	);
}

export default HomePage;
