import { AddBand } from './components/AddBand';
import { BandList } from './components/BandList';

function App() {
	return (
		<div className="container">
			<h1>Band App</h1>
			<hr />
			<div className="alert">
				<p>
					Status:
					<span className="text-success"> Online</span>
					<span className="text-danger"> Offline</span>
				</p>
			</div>

			<hr />

			<h3>Bands</h3>
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

export default App;
