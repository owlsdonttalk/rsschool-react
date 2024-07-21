import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { StarWarsData, StarWarsDetailedData } from '@types';

export const starWarsApi = createApi({
  reducerPath: 'starWarsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    getStarWarsList: builder.query<
      StarWarsData,
      { query: string | null; pageNumber: number | null }
    >({
      query: ({ query, pageNumber }) => {
        let url = 'people/';
        if (query) {
          url += `?search=${query}`;
        }
        if (pageNumber) {
          url += query ? `&page=${pageNumber}` : `?page=${pageNumber}`;
        }
        return url;
      },
    }),
    getStarWarsDetails: builder.query<StarWarsDetailedData, string>({
      query: (id) => `people/${id}/`,
    }),
  }),
});

export const { useGetStarWarsListQuery, useGetStarWarsDetailsQuery } =
  starWarsApi;
