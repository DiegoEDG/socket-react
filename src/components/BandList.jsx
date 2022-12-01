import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/SocketContext';

export const BandList = () => {
	const [bands, setbands] = useState([]);
	const { socket } = useContext(SocketContext);

	useEffect(() => {
		socket.on('bandList', (data) => {
			setbands(data);
		});
	}, [socket]);

	const voteBand = (id) => {
		socket.emit('voteBand', id);
	};

	const removeBand = (id) => {
		socket.emit('removeBand', id);
	};

	const addBand = (name) => {
		console.log(name);
		socket.emit('addBand', name);
	};

	const changeName = (ev, id) => {
		const newName = ev.target.target;

		setbands((bands) =>
			bands.map((band) => {
				if (band.id === id) {
					band.name = newName;
				}
				return band;
			})
		);
	};

	const onLostFocus = () => {};

	const generateRows = () => {
		return bands.map((band) => (
			<tr key={band.id}>
				<td>
					<button className="btn btn-primary" onClick={() => voteBand(band.id)}>
						{' '}
						+1{' '}
					</button>
				</td>
				<td>
					<input
						type="text"
						className="form-control"
						value={band.name}
						onChange={(ev) => changeName(ev, band.id)}
						onBlur={() => onLostFocus(band.id, band.name)}
					/>
				</td>
				<td>
					<h3> {band.votes} </h3>
				</td>
				<td>
					<button className="btn btn-danger" onClick={() => removeBand(band.id)}>
						Delete
					</button>
				</td>
			</tr>
		));
	};

	return (
		<>
			<table className="table table-stripped">
				<thead>
					<tr>
						<th></th>
						<th>Name</th>
						<th>Votes</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>{generateRows()}</tbody>
			</table>
		</>
	);
};
