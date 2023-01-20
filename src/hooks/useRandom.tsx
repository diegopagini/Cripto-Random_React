/** @format */
import { useQuery } from '@tanstack/react-query';

const getRandomNumberFormApi = async (): Promise<number> => {
	try {
		const res = await fetch(
			'https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new'
		);
		const numberString = await res.text();

		return +numberString; // Easy way to transform a string into a number.
	} catch (error) {
		throw new Error('Error');
	}
};

export const useRandom = () => {
	const query = useQuery(['randomNumber'], getRandomNumberFormApi);

	return query;
};
