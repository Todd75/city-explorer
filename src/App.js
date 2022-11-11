import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: ''
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.city.value);
    this.setState {
      city: event.target.city.value;
    };
  };
handleInputChange = (event) => {
  this.setState({
    city = event.target.value
  });
};

  render() {
    return (
      <>
        <h1>BaconFace</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input type="text" name="city" onChange={this.handleInputChange}></input>
          </label>
          <button type="Submit">Search for a city</button>
        </form>
      </>
    )
  }
}

export default App;