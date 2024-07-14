import { filterPersonData } from '@helpers';

describe('filterPersonData function', () => {
  it('should filter person data correctly', () => {
    const testData = [
      {
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
    ] as Record<string, string>[];

    const filteredData = filterPersonData(testData);

    expect(filteredData).toHaveLength(2);
    expect(filteredData[0]).toEqual({
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
