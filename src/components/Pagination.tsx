import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useGetStarWarsListQuery } from '../store/starWarsApi.ts';
import { INPUT_VALUE } from '@constants';

const Pagination: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pageNumber } = useParams<{ pageNumber: string }>();
  const query = localStorage.getItem(INPUT_VALUE) || null;

  const { data: starWarsData } = useGetStarWarsListQuery({
    query,
    pageNumber: pageNumber ? parseInt(pageNumber) : null,
  });

  const goToNextPage = () => {
    const currentPage = location.pathname;
    const details = currentPage.indexOf('/details/');
    let newPath = '/';
    if (details !== -1) {
      newPath = `/page/${parseInt(pageNumber || '1') + 1}/details/${currentPage.split('/details/').pop()}`;
    } else {
      newPath = `/page/${parseInt(pageNumber || '1') + 1}`;
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
    <div className="navigation">
      <button
        className="styled-btn"
        disabled={!starWarsData?.previous}
        onClick={goToPreviousPage}
      >
        Previous Page
      </button>
      <button
        className="styled-btn"
        disabled={!starWarsData?.next}
        onClick={goToNextPage}
      >
        Next Page
      </button>
    </div>
  );
};

export default Pagination;
