import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader } from '@components';
import { useGetStarWarsDetailsQuery } from '../store/starWarsApi';
import { StarWarsDetailedData } from '@types';

const Details: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const navigate = useNavigate();
  const { pageNumber } = useParams<{ pageNumber: string }>();

  const {
    data: detailedData,
    isLoading,
    isFetching,
  } = useGetStarWarsDetailsQuery(itemId ?? '');

  const isLoadingOrFetchings = useMemo(() => {
    return isFetching || isLoading;
  }, [isFetching, isLoading]);

  const handleClose = () => {
    navigate(pageNumber !== undefined ? `/page/${pageNumber}` : '/');
  };

  return (
    <div className="detailed-view">
      {isLoadingOrFetchings ? (
        <Loader isLoading={isLoadingOrFetchings} />
      ) : (
        detailedData && (
          <div className="detailed-view__content">
            <div className="detailed-header">
              <h2>Details</h2>
              <button className="close-button styled-btn" onClick={handleClose}>
                (x)
              </button>
            </div>
            {Object.keys(detailedData).map((key, index) => (
              <p className="content" key={index}>
                <b>{key}:</b> {detailedData[key as keyof StarWarsDetailedData]}
              </p>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default Details;
