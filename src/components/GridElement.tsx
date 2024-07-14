import React from 'react';
import { GridElementProps, GridElementState } from '@types';

class GridElement extends React.Component<GridElementProps, GridElementState> {
  constructor(props: GridElementProps) {
    super(props);

    this.state = {
      element: this.props.element,
    };
  }

  render() {
    const { element } = this.props;

    return (
      <div className="grid-element">
        {Object.keys(element).map((key, index) => (
          <p key={index}>
            <b>{key}:</b> {element[key]}
          </p>
        ))}
      </div>
    );
  }
}

export default GridElement;
