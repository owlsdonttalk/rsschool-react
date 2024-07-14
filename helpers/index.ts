import { StarWarsData } from '@types';

export const filterPersonData = (
  data: Record<string, string>[],
): Record<string, string>[] => {
  return data.map((item) => {
    const idMatch = item.url.match(/\/people\/(\d+)\//);
    const id = idMatch ? idMatch[1] : '';

    return {
      id,
      name: item.name,
      height: item.height,
      mass: item.mass,
      hair_color: item.hair_color,
      skin_color: item.skin_color,
      eye_color: item.eye_color,
      birth_year: item.birth_year,
      gender: item.gender,
    };
  });
};

export const fetchStarWarsData = async (
  query: string | null,
  pageNumber: number | null = null,
): Promise<StarWarsData> => {
  const baseUrl = 'https://swapi.dev/api/people/';
  let url = query ? `${baseUrl}?search=${query}` : baseUrl;
  url = pageNumber ? `${url}?page=${pageNumber}` : url;
  const response = await fetch(url);
  return await response.json();
};

export const fetchStarWarsDetailedData = async (
  personId: string,
): Promise<Record<string, string>> => {
  const url = `https://swapi.dev/api/people/${personId}`;
  const response = await fetch(url);
  return await response.json();
};
