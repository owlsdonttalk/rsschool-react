import React, { useState, useEffect } from 'react';
import { LoaderProps } from '@types';

const Loader: React.FC<LoaderProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(props.isLoading);

  useEffect(() => {
    setLoading(props.isLoading);
  }, [props.isLoading]);

  return <>{loading && <div className="loader" />}</>;
};

export default Loader;
