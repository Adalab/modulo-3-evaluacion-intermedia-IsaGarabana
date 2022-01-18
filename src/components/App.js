import { useEffect, useState } from "react";
import "../styles/App.scss";
import callToApi from "../services/api";

const App = () => {
	const [data, setData] = useState([]);
	const [search, setSearch] = useState("");
	const handleChangeSearch = (ev) => {
		setSearch(ev.currentTarget.value);
	};
	const [name, setName] = useState("");
	const [counselor, setCounselor] = useState("");
	const [speciality, setSpeciality] = useState("");

	const handleChangeName = (ev) => {
		setName(ev.currentTarget.value);
	};
	const handleChangeCounselor = (ev) => {
		setCounselor(ev.currentTarget.value);
	};
	const handleChangeSpeciality = (ev) => {
		setSpeciality(ev.currentTarget.value);
	};

	const handleClick = (ev) => {
		ev.preventDefault();
		const newAdalaber = {
			name: name,
			counselor: counselor,
			speciality: speciality,
		};
		setData([...data, newAdalaber]);
		setName("");
		setCounselor("");
		setSpeciality("");
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
						onChange={handleChangeName}
						value={name}
					/>
					<input
						type="text"
						name="tutora"
						id="tutora"
						placeholder="Tutora"
						onChange={handleChangeCounselor}
						value={counselor}
					/>
					<input
						type="text"
						name="especialidad"
						id="especialidad"
						placeholder="Especialidad"
						onChange={handleChangeSpeciality}
						value={speciality}
					/>

					<input type="submit" value="Añadir" onClick={handleClick} />
				</form>
				{/* Add new Adalaber */}
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
			</section>
		</div>
	);
};

export default App;
