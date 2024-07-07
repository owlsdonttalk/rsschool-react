import React from 'react';
import { ContentGridProps, ContentGridState } from '@types';
import GridElement from './GridElement.tsx';

class ContentGrid extends React.Component<ContentGridProps, ContentGridState> {
  constructor(props: ContentGridProps) {
    super(props);

    this.state = {
      items: this.props.items,
    };
  }

  componentDidUpdate(prevProps: ContentGridProps) {
    if (prevProps.items !== this.props.items) {
      this.setState({ items: this.props.items });
    }
  }

  render() {
    return (
      <div className="content-grid">
        {this.state.items?.map((item, index) => (
          <GridElement key={index} element={item} />
        ))}
      </div>
    );
  }
}

export default ContentGrid;
