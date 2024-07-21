import React, { useEffect, useState } from 'react';
import { SearchInputProps } from '@types';
import useLocalStorage from '../hooks/useLocalStorage.ts';

const SearchInput: React.FC<SearchInputProps> = (props) => {
  const [inputValue, setInputValue] = useState<string>(
    props.initialValue || '',
  );
  const [, setSearchWord, removeValueFromLocalStorage] = useLocalStorage();

  useEffect(() => {
    setInputValue(props.initialValue || '');
  }, [props.initialValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearchClick = () => {
    props.onSearch(inputValue.length > 0 ? inputValue : null);
    if (inputValue) {
      setSearchWord(inputValue || '');
    } else {
      removeValueFromLocalStorage();
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
      <button className="styled-btn" onClick={handleSearchClick}>
        Search
      </button>
    </span>
  );
};

export default SearchInput;
