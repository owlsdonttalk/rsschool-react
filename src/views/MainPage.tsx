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
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';

const MainPage: React.FC = () => {
  const [initialSearchValue, setInitialSearchValue] = useState<string | null>(
    null,
  );
  const [starWarsData, setStarWarsData] = useState<StarWarsData | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [nextPage, setNextPage] = useState<number | null>(null);
  const [previousPage, setPreviousPage] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // UseParams should have generic type that satisfies 'Record<string, string | undefined>'
  const { pageNumber } = useParams<{ pageNumber: string }>();

  const { itemId } = useParams<{ itemId: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const savedInputValue = localStorage.getItem(INPUT_VALUE);
      const data = await fetchStarWarsData(
        savedInputValue,
        pageNumber ? parseInt(pageNumber) : null,
      );

      setPreviousPage(
        data.previous ? parseInt(data.previous.split('=').pop()!) : null,
      );
      setNextPage(data.next ? parseInt(data.next.split('=').pop()!) : null);

      setInitialSearchValue(savedInputValue);
      setStarWarsData(data);
    };

    fetchData().then(() => {
      setIsLoading(false);
    });
  }, [pageNumber]);

  const handleSearch = async (value: string | null) => {
    setIsLoading(true);
    const data = await fetchStarWarsData(value);

    if (data) {
      setStarWarsData(data);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (pageNumber) {
      setCurrentPage(parseInt(pageNumber));
    }
  }, [pageNumber]);

  const goToNextPage = async () => {
    const currentPage = location.pathname;
    const details = currentPage.indexOf('/details/');
    let newPath = '/';
    if (details !== -1) {
      newPath = `/page/${nextPage}/details/${currentPage.split('/details/').pop()}`;
    } else {
      newPath = `/page/${nextPage}`;
    }

    await navigate(newPath);
  };

  const goToPreviousPage = async () => {
    const previousPageNumber = pageNumber ? parseInt(pageNumber) - 1 : 0;
    const currentPage = location.pathname;
    const detailsIndex = currentPage.indexOf('/details/');
    let newPath = '/';

    if (detailsIndex !== -1) {
      newPath = `/page/${previousPageNumber}/details/${currentPage.split('/details/').pop()}`;
    } else {
      newPath = `/page/${previousPageNumber}`;
    }

    await navigate(newPath);
  };

  return (
    <>
      Current Page number: {pageNumber} {currentPage}
      <ErrorBoundary>
        <BuggyButton />
      </ErrorBoundary>
      <SearchInput initialValue={initialSearchValue} onSearch={handleSearch} />
      <div className={itemId ? 'main-wrapper-grid' : ''}>
        <div>
          <Loader isLoading={isLoading} />
          {isLoading || (
            <ContentGrid
              items={filterPersonData(starWarsData?.results ?? [])}
            />
          )}
          <button disabled={previousPage == null} onClick={goToPreviousPage}>
            Previous Page
          </button>
          <button disabled={nextPage == null} onClick={goToNextPage}>
            Next Page
          </button>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default MainPage;
