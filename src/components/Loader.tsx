import React, { useState, useEffect } from 'react';
import { LoaderProps } from '@types';

const Loader: React.FC<LoaderProps> = (props) => {
  const [isLoading, setIsLoading] = useState<boolean>(props.isLoading);

  useEffect(() => {
    setIsLoading(props.isLoading);
  }, [props.isLoading]);

  return isLoading && <span className="loader" />;
};

export default Loader;
