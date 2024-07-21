import { filterPersonData, fetchStarWarsData, fetchStarWarsDetailedData } from '../helpers';
import { vi, expect, describe, it } from 'vitest';
import {StarWarsData} from "@types";

describe('filterPersonData function', () => {
  it('should filter person data correctly', () => {
    const testData: Array<Record<string, string>> = [
      {
        url: 'https://swapi.dev/api/people/1/',
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        hair_color: 'blond',
        skin_color: 'fair',
        eye_color: 'blue',
        birth_year: '19BBY',
        gender: 'male',
        excessive_data_1: '1',
        excessive_data_2: '2',
      },
      {
        url: 'https://swapi.dev/api/people/2/',
        name: 'Leia Organa',
        height: '150',
        mass: '49',
        hair_color: 'brown',
        skin_color: 'light',
        eye_color: 'brown',
        birth_year: '19BBY',
        gender: 'female',
        excessive_data_1: '1',
        excessive_data_2: '2',
      },
    ];

    const filteredData = filterPersonData(testData);

    expect(filteredData).toHaveLength(2);
    expect(filteredData[0]).toEqual({
      id: '1',
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
    });
    expect(filteredData[1]).toEqual({
      id: '2',
      name: 'Leia Organa',
      height: '150',
      mass: '49',
      hair_color: 'brown',
      skin_color: 'light',
      eye_color: 'brown',
      birth_year: '19BBY',
      gender: 'female',
    });
  });
});

describe('fetchStarWarsData function', () => {
  it('should fetch Star Wars data successfully', async () => {
    const mockData: StarWarsData = {
      count: 1,
      next: null,
      previous: null,
      results: [
        {
          url: 'https://swapi.dev/api/people/1/',
          name: 'Luke Skywalker',
          height: '172',
          mass: '77',
          hair_color: 'blond',
          skin_color: 'fair',
          eye_color: 'blue',
          birth_year: '19BBY',
          gender: 'male',
        },
      ],
    };

    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => mockData,
    } as Response);

    const data = await fetchStarWarsData(null);
    expect(data).toEqual(mockData);
  });
});

describe('fetchStarWarsDetailedData function', () => {
  it('should fetch detailed Star Wars data successfully', async () => {
    const mockDetailedData: Record<string, string> = {
      url: 'https://swapi.dev/api/people/1/',
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
    };

    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => mockDetailedData,
    } as Response);

    const data = await fetchStarWarsDetailedData('1');
    expect(data).toEqual(mockDetailedData);
  });
});
