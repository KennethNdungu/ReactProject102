
import React, { Component } from 'react';
import { createStore } from 'redux';
import userApp from './redux/reducers'

let store = createStore(userApp)






class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      user: []
    };
  }

  componentDidMount() {
    fetch("https://dry‑harbor‑88607.herokuapp.com/api/users")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            user: result.user
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {items.map(user => (
            <li key={user.name}>
              {user.name}
            </li>
          ))}
        </ul>
      );
    }
  }
}

export default App;