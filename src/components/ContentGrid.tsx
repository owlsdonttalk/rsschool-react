import React, { useEffect, useState } from 'react';
import { ContentGridProps } from '@types';
import GridElement from './GridElement.tsx';

const ContentGrid: React.FC<ContentGridProps> = (props) => {
  const [items, setItems] = useState<Record<string, string>[]>(props.items);

  useEffect(() => {
    setItems(props.items);
  }, [props.items]);

  return (
    <>
      {items.length === 0 ? (
        'No results'
      ) : (
        <div className="content-grid">
          {items?.map((item, index) => (
            <GridElement key={index} element={item} />
          ))}
        </div>
      )}
    </>
  );
};

export default ContentGrid;
