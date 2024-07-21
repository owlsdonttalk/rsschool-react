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

  const handleDownload = () => {
    if (selectedValues.length === 0) return;

    const headers = Object.keys(selectedValues[0]);
    const headerRow = headers.join(',');
    const rows = selectedValues.map((obj) => Object.values(obj).join(','));

    const csvContent = `data:text/csv;charset=utf-8,${headerRow}\n${rows.join('\n')}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${selectedValues.length}_persons.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className={`flyout-container ${selectedValues.length > 0 ? 'selected' : 'deselected'}`}
    >
      {selectedValues.length > 0 ? (
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
      ) : (
        <div className="empty-flyout"></div>
      )}
    </div>
  );
};

export default SelectedFlyout;
