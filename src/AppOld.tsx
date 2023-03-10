/** @format */
import './App.css';

import { useEffect, useReducer, useState } from 'react';

const URL =
	'https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new';

const getRandomNumberFormApi = async (): Promise<number> => {
	const res = await fetch(URL);
	const numberString = await res.text();

	return +numberString; // Easy way to transform a string into a number.
};

export const App = () => {
	const [number, setNumber] = useState<number>();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string>();
	const [key, forceRefetch] = useReducer((n: number) => n + 1, 0);

	useEffect(() => {
		setIsLoading(true);
		// getRandomNumberFormApi().then((num: number) => setNumber(num)); // Long way.
		getRandomNumberFormApi()
			.then(setNumber) // Short way.
			.catch((error: Error) => setError(error.message));
	}, [key]);

	useEffect(() => {
		if (number) setIsLoading(false);
	}, [number]);

	useEffect(() => {
		if (error) setIsLoading(false);
	}, [error]);

	return (
		<div className='App'>
			{isLoading ? <h2>Cargando...</h2> : !error && <h2>Número aleatorio: {number}</h2>}

			{!isLoading && error && <h3>{error}</h3>}

			<button onClick={forceRefetch} disabled={isLoading}>
				{isLoading ? '...' : 'Nuevo Número'}
			</button>
		</div>
	);
};
