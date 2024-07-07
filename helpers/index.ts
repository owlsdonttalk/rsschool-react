import { StarWarsData } from '@types';

export const filterPersonData = (
  data: Record<string, string>[],
): Record<string, string>[] => {
  return data.map((item) => ({
    name: item.name,
    height: item.height,
    mass: item.mass,
    hair_color: item.hair_color,
    skin_color: item.skin_color,
    eye_color: item.eye_color,
    birth_year: item.birth_year,
    gender: item.gender,
  }));
};

export const fetchStarWarsData = async (
  query: string | null,
): Promise<StarWarsData> => {
  const baseUrl = 'https://swapi.dev/api/people/';
  const url = query ? `${baseUrl}?search=${query}` : baseUrl;
  const response = await fetch(url);
  return await response.json();
};
