import React from 'react';

class BuggyButton extends React.Component<
  Record<string, boolean>,
  Record<string, boolean>
> {
  constructor(props: Record<string, boolean>) {
    super(props);
    this.state = { hasError: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((prevState) => ({
      ...prevState,
      hasError: true,
    }));
  }

  render() {
    if (this.state.hasError) {
      throw new Error('I crashed!');
    }
    return <button onClick={this.handleClick}>Test error boundary</button>;
  }
}

export default BuggyButton;
