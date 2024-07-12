import React, { useEffect, useState } from 'react';
import './App.css';
import { INPUT_VALUE } from '@constants';
import { fetchStarWarsData, filterPersonData } from '@helpers';
import { StarWarsData } from '@types';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import BuggyButton from './components/BuggyButton.tsx';
import SearchInput from './components/SearchInput.tsx';
import ContentGrid from './components/ContentGrid.tsx';

const App: React.FC = () => {
  const [initialSearchValue, setInitialSearchValue] = useState<string | null>(
    null,
  );
  const [starWarsData, setStarWarsData] = useState<StarWarsData | null>(null);

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
      <ErrorBoundary>
        <BuggyButton />
      </ErrorBoundary>
      <SearchInput initialValue={initialSearchValue} onSearch={handleSearch} />
      <ContentGrid items={filterPersonData(starWarsData?.results ?? [])} />
    </>
  );
};

export default App;
