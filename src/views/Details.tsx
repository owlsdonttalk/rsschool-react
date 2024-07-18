import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader } from '@components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchStarWarsDetails } from '../store/starWarsDetailedDataSlice.ts';

const Details: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const detailedData = useSelector(
    (state: RootState) => state.starWars.detailedData,
  );
  const isLoading = useSelector((state: RootState) => state.starWars.isLoading);
  const count = useSelector((state: RootState) => state.counter.value);

  useEffect(() => {
    if (itemId) {
      dispatch(fetchStarWarsDetails(itemId));
    }
  }, [itemId, dispatch]);

  const handleClose = () => {
    navigate('../../');
  };

  return (
    <div className="detailed-view">
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        detailedData && (
          <div className="detailed-view__content">
            <div className="detailed-header">
              <h2>Details</h2>
              <button className="close-button" onClick={handleClose}>
                (x) {count}
              </button>
            </div>
            {Object.keys(detailedData).map((key, index) => (
              <p className="content" key={index}>
                <b>{key}:</b> {detailedData[key]}
              </p>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default Details;
