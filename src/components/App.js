import { useEffect, useState } from "react";
import "../styles/App.scss";
import callToApi from "../services/api";

const App = () => {
	const getTitle = (text) => <h1>{text}</h1>;
	/* Constantes de estado*/

	const [data, setData] = useState([]);
	const [newAdalaber, setNewAdalaber] = useState({
		name: "",
		counselor: "",
		speciality: "",
	});
	const [search, setSearch] = useState("");
	const [filterCounselor, setFilterCounselor] = useState("all");

	/* Recogemos datos del API*/

	useEffect(() => {
		callToApi().then((responseApi) => {
			setData(responseApi);
		});
	}, []);

	/* Funciones manejadoras*/

	const handleNewAdalaber = (ev) => {
		setNewAdalaber({
			...newAdalaber,
			[ev.currentTarget.id]: ev.currentTarget.value,
		});
	};

	const handleChangeSearch = (ev) => {
		setSearch(ev.currentTarget.value);
	};

	const handleFilterCounselor = (ev) => {
		setFilterCounselor(ev.currentTarget.value);
	};

	const handleClick = (ev) => {
		ev.preventDefault();
		newAdalaber.id = data.length;
		setData([...data, newAdalaber]);
		setNewAdalaber({
			name: "",
			counselor: "",
			speciality: "",
		});
	};

	/* Filtros por tutor, por nombre y render con map*/

	const adalabersInHTML = data
		.filter(
			(filterAdalaber) =>
				filterCounselor === "all" || filterCounselor === filterAdalaber.counselor
		)

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

	/* Retorno de la función App*/

	return (
		<div className="page">
			{/* Añadir Adalabers */}

			<header className="header">
				<div className="app">{getTitle("Adalabers")}</div>
				<form className="addAdalaber__form">
					<h2 className="title">Añade una nueva Adalaber</h2>
					<label htmlFor="name">Nombre</label>
					<input
						className="addAdalaber__form--input"
						type="text"
						name="name"
						id="name"
						placeholder="Nombre"
						onChange={handleNewAdalaber}
						value={newAdalaber.name}
					/>
					<label htmlFor="counselor">Tutora</label>
					<input
						className="addAdalaber__form--input"
						type="text"
						name="counselor"
						id="counselor"
						placeholder="Tutora"
						onChange={handleNewAdalaber}
						value={newAdalaber.counselor}
					/>
					<label htmlFor="speciality">Especialidad</label>
					<input
						className="addAdalaber__form--input"
						type="text"
						name="speciality"
						id="speciality"
						placeholder="Especialidad"
						onChange={handleNewAdalaber}
						value={newAdalaber.speciality}
					/>

					<button onClick={handleClick}> Añadir nueva </button>
				</form>

				<form>
					<h2 className="title">Filtra las Adalabers</h2>
					<label htmlFor="counselor">
						Escoge una tutora:
						<select
							onChange={handleFilterCounselor}
							value={filterCounselor}
							name="counselor"
							id="counselor"
						>
							<option value="all">Cualquiera</option>
							<option value="Yanelis">Yanelis</option>
							<option value="Dayana">Dayana</option>
							<option value="Iván">Iván</option>
						</select>
					</label>
					<label htmlFor="search">
						<input
							autoComplete="off"
							type="search"
							name="search"
							id="search"
							placeholder="Introduce un nombre"
							onChange={handleChangeSearch}
							value={search}
						/>
						Filtrar por nombre
					</label>
				</form>
			</header>
			{/* Adalabers list */}
			<section className="listAdalaber">
				<h2>Listado de Adalabers</h2>
				<table>
					<thead>
						<tr>
							<th>Nombre</th>
							<th>Tutora</th>
							<th>Especialidad</th>
						</tr>
					</thead>

					<tbody>{adalabersInHTML}</tbody>
				</table>
			</section>
		</div>
	);
};

export default App;
