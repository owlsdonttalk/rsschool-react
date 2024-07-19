import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { GridElementProps } from '@types';
import { addSelected, removeSelected } from '../store/selectedReducer.ts';

const GridElement: React.FC<GridElementProps> = (props) => {
  const dispatch = useDispatch();
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

  const handleAddSelected = () => {
    dispatch(addSelected(props.element.id));
  };

  const handleRemoveSelected = () => {
    dispatch(removeSelected(props.element.id));
  };

  return (
    <div className="grid-element">
      {Object.keys(props.element).map((key, index) => (
        <p key={index}>
          <b>{key}:</b> {props.element[key]}
        </p>
      ))}
      <button onClick={handleClick}>View Details</button>
      <button onClick={handleAddSelected}>Add Selected</button>
      <button onClick={handleRemoveSelected}>Remove Selected</button>
    </div>
  );
};

export default GridElement;
