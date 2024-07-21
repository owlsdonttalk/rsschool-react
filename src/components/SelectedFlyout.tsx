import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store.ts';
import { deselectAll } from '../store/selectedReducer.ts';

const SelectedFlyout: React.FC = () => {
  const dispatch = useDispatch();
  const selectedValues = useSelector(
    (state: RootState) => state.selected.selectedValues,
  );

  const handleDeselectAll = () => {
    dispatch(deselectAll());
  };

  const handleDownload = () => {};

  return (
    <div
      className={`flyout-container ${selectedValues.length > 0 ? 'selected' : 'deselected'}`}
    >
      {selectedValues.length > 0 && (
        <>
          <span>
            <strong>Selected:</strong> {selectedValues.length}
          </span>
          <button className="flyout-btn" onClick={handleDeselectAll}>
            Deselect All
          </button>
          <button className="flyout-btn" onClick={handleDownload}>
            Download
          </button>
        </>
      )}
    </div>
  );
};

export default SelectedFlyout;
