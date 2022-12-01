import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { BandList } from './components/BandList';
import { AddBand } from './components/AddBand';

const connectSocketServer = () => {
	const socket = io.connect('http://localhost:3000');
	return socket;
};

function App() {
	const [socket] = useState(connectSocketServer());
	const [online, setOnline] = useState(false);
	const [bandsData, setBandsData] = useState([]);

	useEffect(() => {
		setOnline(socket.connected);
	}, [socket]);

	useEffect(() => {
		socket.on('connect', () => {
			setOnline(true);
		});
	}, [socket]);

	useEffect(() => {
		socket.on('disconnect', () => {
			setOnline(false);
		});
	}, [socket]);

	useEffect(() => {
		socket.on('bandList', (data) => {
			console.log(data);
			setBandsData(data);
		});
	}, [socket]);

	const voteBand = (id) => {
		socket.emit('voteBand', id);
	};

	const removeBand = (id) => {
		socket.emit('removeBand', id);
	};

	const changeName = (newName) => {
		console.log(newName);
	};

	const addBand = (name) => {
		console.log(name);
		socket.emit('addBand', name);
	};

	return (
		<div className="container">
			<h1>Band App</h1>
			<hr />
			<div className="alert">
				<p>
					Status:
					{online ? <span className="text-success"> Online</span> : <span className="text-danger"> Offline</span>}
				</p>
			</div>
			<hr />
			<h3>Bands</h3>
			<div className="row">
				<div className="col-8">
					<BandList data={bandsData} voteBand={voteBand} removeBand={removeBand} changeName={changeName} />
				</div>
				<div className="col-4">
					<AddBand addBand={addBand} />
				</div>
			</div>
		</div>
	);
}

export default App;
