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
    setSelected(
      selectedValues.filter((el) => el.id === props.element.id).length !== 0,
    );
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
    dispatch(toggleSelected(props.element));
  };

  return (
    <div className="grid-element">
      {Object.keys(props.element).map((key, index) => (
        <p key={index}>
          <b>{key}:</b> {props.element[key]}
        </p>
      ))}
      <input type="checkbox" checked={selected} onClick={handleCheckboxClick} />
      <svg
        onClick={handleClick}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="info-svg"
      >
        <path
          fill="var(--svg-color)"
          d="M11 7V9H13V7H11M14 17V15H13V11H10V13H11V15H10V17H14M22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12M20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C16.42 20 20 16.42 20 12Z"
        />
      </svg>
    </div>
  );
};

export default GridElement;
