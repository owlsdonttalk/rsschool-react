import React from 'react';
import { SearchInputProps, SearchInputState } from '@types';
import { INPUT_VALUE } from '@constants';

class SearchInput extends React.Component<SearchInputProps, SearchInputState> {
  constructor(props: SearchInputProps) {
    super(props);

    this.state = {
      inputValue: this.props.initialValue || '',
    };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: event.target.value });
  };

  componentDidUpdate(prevProps: SearchInputProps) {
    if (
      prevProps.initialValue !== this.props.initialValue &&
      this.props.initialValue !== null
    ) {
      this.setState({
        inputValue: this.props.initialValue,
      });
    }
  }

  handleSearchClick = () => {
    const { inputValue } = this.state;
    this.props.onSearch(inputValue?.length > 0 ? inputValue : null);
    inputValue
      ? localStorage.setItem(INPUT_VALUE, inputValue)
      : localStorage.removeItem(INPUT_VALUE);
  };

  render() {
    return (
      <span className="search-input">
        <input
          type="text"
          className="search-input__input-field"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          placeholder="Search..."
        />
        <button onClick={this.handleSearchClick}>Search</button>
      </span>
    );
  }
}

export default SearchInput;
