import React from 'react';
import { GridElementProps } from '@types';

const GridElement: React.FC<GridElementProps> = (props) => {
  return (
    <div className="grid-element">
      {Object.keys(props.element).map((key, index) => (
        <p key={index}>
          <b>{key}:</b> {props.element[key]}
        </p>
      ))}
    </div>
  );
};

export default GridElement;
