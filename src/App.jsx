import React from 'react';
import { SocketProvider } from './context/SocketContext';
import HomePage from './pages/HomePage';

export const App = () => {
	return (
		<SocketProvider>
			<HomePage />
		</SocketProvider>
	);
};

export default App;
