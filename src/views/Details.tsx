import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchStarWarsDetailedData } from '@helpers';
import { Loader } from '@components';

const Details: React.FC = () => {
  const { itemId } = useParams<{ itemId: string | null }>();
  const [detailedData, setDetailedData] = useState<Record<string, string>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!itemId) {
        return;
      }

      setIsLoading(true);
      const data = await fetchStarWarsDetailedData(itemId);
      setDetailedData(data);
      setIsLoading(false);
    };

    fetchData();
  }, [itemId]);

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
                (x)
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
