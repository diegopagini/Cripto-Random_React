/** @format */
import './App.css';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useReducer, useState } from 'react';

const URL =
	'https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new';

const getRandomNumberFormApi = async (): Promise<number> => {
	try {
		const res = await fetch(URL);
		const numberString = await res.text();

		return +numberString; // Easy way to transform a string into a number.
	} catch (error) {
		throw new Error('Error');
	}
};

export const App = () => {
	const query = useQuery(['randomNumber'], getRandomNumberFormApi);

	return (
		<div className='App'>
			{query.isFetching ? (
				<h2>Cargando...</h2>
			) : (
				!query.isError && <h2>Número aleatorio: {query.data}</h2>
			)}

			{!query.isLoading && query.isError && <h3>{`${query.error}`}</h3>}

			<button onClick={() => query.refetch()} disabled={query.isFetching}>
				{query.isFetching ? '...' : 'Nuevo Número'}
			</button>
		</div>
	);
};
