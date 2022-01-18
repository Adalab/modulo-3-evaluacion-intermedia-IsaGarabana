import { useEffect, useState } from "react";
import "../styles/App.scss";
import callToApi from "../services/api";

const App = () => {
	const [data, setData] = useState([]);
	const [search, setSearch] = useState("");

	const [newAdalaber, setNewAdalaber] = useState({
		name: "",
		counselor: "",
		speciality: "",
	});

	const handleNewAdalaber = (ev) => {
		setNewAdalaber({
			...newAdalaber,
			[ev.currentTarget.id]: ev.currenTarget.value,
		});
	};
	const handleChangeSearch = (ev) => {
		setSearch(ev.currentTarget.value);
	};

	const handleClick = (ev) => {
		ev.preventDefault();
		setData([...data, newAdalaber]);
		setNewAdalaber({
			name: "",
			counselor: "",
			speciality: "",
		});
	};
	useEffect(() => {
		callToApi().then((responseApi) => {
			setData(responseApi);
		});
	}, []);

	const adalaberData = data
		.filter((filterAdalaber) =>
			filterAdalaber.name.toLowerCase().includes(search.toLowerCase())
		)
		.map((filterAdalaber) => (
			<tr key={filterAdalaber.id}>
				<td>{filterAdalaber.name} </td>
				<td>{filterAdalaber.counselor}</td>
				<td>{filterAdalaber.speciality}</td>
			</tr>
		));

	return (
		<div className="page">
			{/* Adalabers list */}
			<section>
				<table>
					<thead>
						<tr>
							<th>Nombre</th>
							<th>Tutora</th>
							<th>Especialidad</th>
						</tr>
					</thead>

					<tbody>{adalaberData}</tbody>
				</table>
			</section>
			{/* Add new Adalaber */}
			<section>
				<form className="form">
					<h2 className="title">Añade otra Adalaber</h2>
					<input
						type="text"
						name="name"
						id="name"
						placeholder="Nombre"
						onChange={handleNewAdalaber}
						value={newAdalaber.name}
					/>
					<input
						type="text"
						name="counselor"
						id="counselor"
						placeholder="Tutora"
						onChange={handleNewAdalaber}
						value={newAdalaber.counselor}
					/>
					<input
						type="text"
						name="speciality"
						id="speciality"
						placeholder="Especialidad"
						onChange={handleNewAdalaber}
						value={newAdalaber.speciality}
					/>

					<input type="submit" value="Añadir" onClick={handleClick} />
				</form>
			</section>
			{/* Filter Adalabers */}
			<form>
				<h2 className="title">Filtrar Adalabers</h2>
				<input
					autoComplete="off"
					type="search"
					name="search"
					placeholder="Filtra Adalabers por nombre"
					onChange={handleChangeSearch}
					value={search}
				/>
			</form>
		</div>
	);
};

export default App;
