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
  Loader,
} from '@components';
import { Outlet, useParams } from 'react-router-dom';

const MainPage: React.FC = () => {
  const [initialSearchValue, setInitialSearchValue] = useState<string | null>(
    null,
  );
  const [starWarsData, setStarWarsData] = useState<StarWarsData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { pageNumber } = useParams<{ pageNumber: number | null }>();
  const { itemId } = useParams<{ pageNumber: number | null }>();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const savedInputValue = localStorage.getItem(INPUT_VALUE);
      const data = await fetchStarWarsData(savedInputValue);

      setInitialSearchValue(savedInputValue);
      setStarWarsData(data);
    };

    fetchData().then(() => {
      setIsLoading(false);
    });
  }, []);

  const handleSearch = async (value: string | null) => {
    setIsLoading(true);
    const data = await fetchStarWarsData(value);

    if (data) {
      setStarWarsData(data);
    }

    setIsLoading(false);
  };

  return (
    <>
      Current Page number: {pageNumber}
      ItemId: {itemId}
      <ErrorBoundary>
        <BuggyButton />
      </ErrorBoundary>
      <SearchInput initialValue={initialSearchValue} onSearch={handleSearch} />
      <div>
        <Loader isLoading={isLoading} />
        {isLoading || (
          <ContentGrid items={filterPersonData(starWarsData?.results ?? [])} />
        )}
        <Outlet />
      </div>
    </>
  );
};

export default MainPage;
