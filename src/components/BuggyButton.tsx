import React, { useEffect, useState } from 'react';

const BuggyButton: React.FC = () => {
  const [hasError, setHastError] = useState<boolean>(false);

  const handleClick = () => {
    setHastError(true);
  };

  useEffect(() => {
    if (hasError) {
      throw new Error('I crashed!');
    }
  }, [hasError]);

  return <button onClick={handleClick}>Test error boundary</button>;
};

export default BuggyButton;
