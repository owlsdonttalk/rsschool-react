import React, { useMemo } from 'react';
import '../App.css';
import { filterPersonData } from '@helpers';
import {
  BuggyButton,
  ErrorBoundary,
  SearchInput,
  ContentGrid,
  Loader,
} from '@components';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import ToggleThemeButton from '../components/ToggleThemeButton.tsx';
import { useGetStarWarsListQuery } from '../store/starWarsApi.ts';
import Pagination from '../components/Pagination.tsx';
import useLocalStorage from '../../hooks/useLocalStorage.ts';

const MainPage: React.FC = () => {
  const { pageNumber } = useParams<{ pageNumber: string }>();
  const { itemId } = useParams<{ itemId: string }>();
  const navigate = useNavigate();

  const [query, setSearchWord] = useLocalStorage();

  const {
    data: starWarsData,
    isLoading,
    isFetching,
  } = useGetStarWarsListQuery({
    query,
    pageNumber: pageNumber ? parseInt(pageNumber) : null,
  });

  const isLoadingOrFetchings = useMemo(() => {
    return isFetching || isLoading;
  }, [isFetching, isLoading]);

  return (
    <div className="main-wrapper">
      <nav>
        <ToggleThemeButton />
        <SearchInput
          initialValue={query}
          onSearch={(value) => {
            setSearchWord(value || '');
            navigate(`/`);
          }}
        />
        <ErrorBoundary>
          <BuggyButton />
        </ErrorBoundary>
      </nav>
      <div className={itemId ? 'main-wrapper-grid' : ''}>
        <div>
          <Loader isLoading={isLoadingOrFetchings} />
          {!isLoadingOrFetchings &&
            (starWarsData?.results.length ? (
              <ContentGrid items={filterPersonData(starWarsData.results)} />
            ) : (
              'No data.'
            ))}
          <Pagination />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default MainPage;
