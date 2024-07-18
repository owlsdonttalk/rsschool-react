import React, { useEffect } from 'react';
import '../App.css';
import { INPUT_VALUE } from '@constants';
import { filterPersonData } from '@helpers';
import {
  BuggyButton,
  ErrorBoundary,
  SearchInput,
  ContentGrid,
  Loader,
} from '@components';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchStarWarsList, setCurrentPage } from '../store/starWarsListSlice';
import ToggleThemeButton from '../components/ToggleThemeButton.tsx';

const MainPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { pageNumber } = useParams<{ pageNumber: string }>();
  const { itemId } = useParams<{ itemId: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const starWarsData = useSelector(
    (state: RootState) => state.starWarsList.data,
  );
  const isLoading = useSelector(
    (state: RootState) => state.starWarsList.isLoading,
  );
  const currentPage = useSelector(
    (state: RootState) => state.starWarsList.currentPage,
  );
  const nextPage = useSelector(
    (state: RootState) => state.starWarsList.nextPage,
  );
  const previousPage = useSelector(
    (state: RootState) => state.starWarsList.previousPage,
  );

  useEffect(() => {
    dispatch(
      fetchStarWarsList({
        query: localStorage.getItem(INPUT_VALUE),
        pageNumber: pageNumber ? parseInt(pageNumber) : null,
      }),
    );
  }, [pageNumber, dispatch]);

  useEffect(() => {
    if (pageNumber) {
      dispatch(setCurrentPage(parseInt(pageNumber)));
    }
  }, [pageNumber, dispatch]);

  const handleSearch = async (value: string | null) => {
    dispatch(fetchStarWarsList({ query: value, pageNumber: 1 }));
  };

  const goToNextPage = () => {
    const currentPage = location.pathname;
    const details = currentPage.indexOf('/details/');
    let newPath = '/';
    if (details !== -1) {
      newPath = `/page/${nextPage}/details/${currentPage.split('/details/').pop()}`;
    } else {
      newPath = `/page/${nextPage}`;
    }

    navigate(newPath);
  };

  const goToPreviousPage = () => {
    const previousPageNumber = pageNumber ? parseInt(pageNumber) - 1 : 0;
    const currentPage = location.pathname;
    const detailsIndex = currentPage.indexOf('/details/');
    let newPath = '/';

    if (detailsIndex !== -1) {
      newPath = `/page/${previousPageNumber}/details/${currentPage.split('/details/').pop()}`;
    } else {
      newPath = `/page/${previousPageNumber}`;
    }

    navigate(newPath);
  };

  return (
    <div className="main-wrapper">
      <nav>
        <ToggleThemeButton />
        <SearchInput
          initialValue={localStorage.getItem(INPUT_VALUE)}
          onSearch={handleSearch}
        />
        <ErrorBoundary>
          <BuggyButton />
        </ErrorBoundary>
      </nav>
      {currentPage}

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
    </div>
  );
};

export default MainPage;
