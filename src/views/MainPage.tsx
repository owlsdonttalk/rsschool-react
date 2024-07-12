import React, { useEffect, useState } from 'react';
import '../App.css';
import { INPUT_VALUE } from '@constants';
import { fetchStarWarsData, filterPersonData } from '@helpers';
import { StarWarsData } from '@types';
import {
  BuggyButton,
  ErrorBoundary,
  SearchInput,
  ContentGrid,
} from '@components';
import { useParams } from 'react-router-dom';

const MainPage: React.FC = () => {
  const [initialSearchValue, setInitialSearchValue] = useState<string | null>(
    null,
  );
  const [starWarsData, setStarWarsData] = useState<StarWarsData | null>(null);
  const { pageNumber } = useParams<{ pageNumber: number | null }>();

  useEffect(() => {
    const fetchData = async () => {
      const savedInputValue = localStorage.getItem(INPUT_VALUE);
      const data = await fetchStarWarsData(savedInputValue);

      setInitialSearchValue(savedInputValue);
      setStarWarsData(data);
    };

    fetchData();
  }, []);

  const handleSearch = async (value: string | null) => {
    const data = await fetchStarWarsData(value);

    if (data) {
      setStarWarsData(data);
    }
  };

  return (
    <>
      Current Page number: {pageNumber}
      <ErrorBoundary>
        <BuggyButton />
      </ErrorBoundary>
      <SearchInput initialValue={initialSearchValue} onSearch={handleSearch} />
      <ContentGrid items={filterPersonData(starWarsData?.results ?? [])} />
    </>
  );
};

export default MainPage;
