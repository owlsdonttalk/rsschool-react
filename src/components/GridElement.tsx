import React from 'react';
import { GridElementProps } from '@types';
import { useNavigate, useLocation } from 'react-router-dom';

const GridElement: React.FC<GridElementProps> = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    const pageMatch = location.pathname.match(/page\/(\d+)/);
    const page = pageMatch ? pageMatch[1] : null;
    const path = page
      ? `/page/${page}/details/${props.element.id}`
      : `/details/${props.element.id}`;
    navigate(path);
  };

  return (
    <div className="grid-element" onClick={handleClick}>
      {Object.keys(props.element).map((key, index) => (
        <p key={index}>
          <b>{key}:</b> {props.element[key]}
        </p>
      ))}
    </div>
  );
};

export default GridElement;
