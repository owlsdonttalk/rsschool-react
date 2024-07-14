import React, { useEffect, useState } from 'react';
import { SearchInputProps } from '@types';
import { INPUT_VALUE } from '@constants';

const SearchInput: React.FC<SearchInputProps> = (props) => {
  const [inputValue, setInputValue] = useState<string>(
    props.initialValue || '',
  );

  useEffect(() => {
    setInputValue(props.initialValue || '');
  }, [props.initialValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearchClick = () => {
    props.onSearch(inputValue.length > 0 ? inputValue : null);
    if (inputValue) {
      localStorage.setItem(INPUT_VALUE, inputValue);
    } else {
      localStorage.removeItem(INPUT_VALUE);
    }
  };

  return (
    <span className="search-input">
      <input
        type="text"
        className="search-input__input-field"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      <button onClick={handleSearchClick}>Search</button>
    </span>
  );
};

export default SearchInput;
