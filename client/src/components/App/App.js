import React, { Component } from 'react';

import './App.css';

class App extends Component {
  // Initialize state
  state = { content: [] }

  // Fetch passwords after first mount
  componentDidMount() {
    this.getContent();
  }

  getContent = () => {
    // Get the contents and store them in state
    fetch('/api/chris')
      .then(res => res.json())
      .then(data => {
        console.log('content', data);
        this.setState({ content: data.message })
      });
  }

  render() {
    const { content } = this.state;

    return (
      <div className="App">
        {/* Render the passwords if we have them */}
        {content.length ? (
          <div>
            <h1>Content:</h1>
            <ul className="content">
              {/*
                Generally it's bad to use "index" as a key.
                It's ok for this example because there will always
                be the same number of passwords, and they never
                change positions in the array.
              */}
              {content}
            </ul>
            <button
              className="more"
              onClick={this.getContent}>
              Get Content
            </button>        
          </div>
        ) : (
          // Render a helpful message otherwise
          <div>
            <h1>No content :(</h1>
            <button
              className="more"
              onClick={this.getContent}>
              Try Again?
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
