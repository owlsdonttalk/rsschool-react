import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { GridElementProps } from '@types';
import { toggleSelected } from '../store/selectedReducer.ts';
import { RootState } from '../store/store.ts';

const GridElement: React.FC<GridElementProps> = (props) => {
  const [selected, setSelected] = useState(false);
  const selectedValues = useSelector(
    (state: RootState) => state.selected.selectedValues,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setSelected(selectedValues.includes(props.element.id));
  }, [selectedValues, props.element.id]);

  const handleClick = () => {
    const pageMatch = location.pathname.match(/page\/(\d+)/);
    const page = pageMatch ? pageMatch[1] : null;
    const path = page
      ? `/page/${page}/details/${props.element.id}`
      : `/details/${props.element.id}`;
    navigate(path);
  };

  const handleCheckboxClick = () => {
    dispatch(toggleSelected(props.element.id));
  };

  return (
    <div className="grid-element">
      {Object.keys(props.element).map((key, index) => (
        <p key={index}>
          <b>{key}:</b> {props.element[key]}
        </p>
      ))}
      <input type="checkbox" checked={selected} onClick={handleCheckboxClick} />
      <button onClick={handleClick}>View Details</button>
    </div>
  );
};

export default GridElement;
