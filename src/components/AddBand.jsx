import React, { useContext, useState } from 'react';
import { SocketContext } from '../context/SocketContext';

export const AddBand = () => {
	const { socket } = useContext(SocketContext);
	const [value, setValue] = useState('');

	const onSubmit = (ev) => {
		ev.preventDefault();

		if (value.length > 0) {
			socket.emit('addBand', value);
			setValue('');
		}
	};

	return (
		<>
			<form onSubmit={onSubmit}>
				<h3>Add Band</h3>
				<input
					type="text"
					name="bandadd"
					id="bandadd"
					className="form-control ml-2"
					value={value}
					onChange={(ev) => setValue(ev.target.value)}
				/>
			</form>
		</>
	);
};
