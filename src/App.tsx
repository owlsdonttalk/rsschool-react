import { Component } from 'react';
import './App.css';
import { INPUT_VALUE } from '@constants';
import { fetchStarWarsData, filterPersonData } from '@helpers';
import { StarWarsData } from '@types';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import BuggyButton from './components/BuggyButton.tsx';
import SearchInput from './components/SearchInput.tsx';
import ContentGrid from './components/ContentGrid.tsx';

interface AppState {
  initialSearchValue: string | null;
  starWarsData: StarWarsData | null;
}

class App extends Component<Record<string, never>, AppState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      initialSearchValue: null,
      starWarsData: null,
    };
  }

  async componentDidMount() {
    const savedInputValue = localStorage.getItem(INPUT_VALUE);
    const data = await fetchStarWarsData(savedInputValue);

    this.setState((prevState) => ({
      ...prevState,
      initialSearchValue: savedInputValue,
      starWarsData: data,
    }));
  }

  handleSearch = async (value: string | null) => {
    const data = await fetchStarWarsData(value);
    this.setState((prevState) => ({
      ...prevState,
      starWarsData: data,
    }));
  };

  render() {
    return (
      <>
        <ErrorBoundary>
          <BuggyButton />
          <SearchInput
            initialValue={this.state.initialSearchValue}
            onSearch={this.handleSearch}
          />
          <ContentGrid
            items={filterPersonData(this.state.starWarsData?.results ?? [])}
          />
        </ErrorBoundary>
      </>
    );
  }
}

export default App;
