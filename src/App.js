import axios from 'axios';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert'
// import Modal from 'react-bootstrap/Modal'
// import Button from 'react-bootstrap/Button'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: {},
      errorMessage: '',
      isError: false,
    }
  }

  handleCityInput = (event) => {
    this.setState({
      city: event.target.value
    });
  };

  handleCitySubmit = async (event) => {

    let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`;
    try {
      event.preventDefault();
      let locationInfo = await axios.get(url);

      this.setState({
        cityData: locationInfo.data[0],
        isError: false,
      });

    } catch (error) {
      this.setState({
        errorMessage: error.message,
        isError: true
      })
    }
  }
  render() {

    let display = '';
    if (this.state.isError) {
      display = <p>{this.state.errorMessage}</p>
    } else {
      display = <ul>
        <li>City: {this.state.cityData.display_name}</li>
        <li>Latitude: {this.state.cityData.lat}</li>
        <li>Longitude: {this.state.cityData.lon}</li>
      </ul>
    }


    return (
      <>
        <h1>Hi There</h1>
        <form onSubmit={this.handleCitySubmit}>
          <label>
            <input name='city' type='text' onChange={this.handleCityInput} placeholder="Please Search for a City" />
          </label>
          <button type="submit">Explore</button>
        </form>
        {this.state.isError ? <p>{this.state.errorMessage}</p> : <ul>

        </ul>}
        {display}
        <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=15`} alt={this.state.cityData.display_name} />
        {this.state.isError ? <Alert className="alert" variant="danger"><Alert.Heading>Oh No There is an Error!</Alert.Heading><p>{this.state.errorMsg}</p></Alert> : <p className="alert"></p>}
      </>

    );
  }
};

export default App;











// render() {
//   return (
//     <>
//       <h1>BaconFace</h1>
//       <form onSubmit={this.handleSubmit}>
//         <label>
//           <input type="text" name="city" onChange={this.handleInputChange}></input>
//         </label>
//         <button type="Submit">Search for a city</button>
//       </form>
//     </>
//   )
// }




// handleSubmit = async (event) => {
//   event.preventDefault();
//   let apiData = await axios.get('API URL HERE');
//   console.log(apiData.data.results)
//   this.setState({
//     apiData: apiData.data.results
//   });
// }
// handleCityInput = (event) => {
//   this.setState({
//     city: event.target.value
//   });
// };
// handleCitySubmit = async (event) => {
//   try {
//     event.preventDefault();
//     let locationInfo = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`);

//     console.log(locationInfo.data[0]); //return first value in array
//   }
// } catch (error) {
//   console.log('error', error);
//   console.log('error.message: ', error.message);
//   this.setState({
//     errorMessage = error.message,
//     isError: true
//   })
// }

// render() {

//   let apiChar = this.state.apiData.map((character, idx) => {
//     return <li key={idx}>{character.name}</li>
//   });

//   return (
//     <>
//       <h1>Data from Api</h1>
//       <form onSubmit={this.handleCitySubmit}>
//         <button type="submit">Display</button>
//       </form>
//       {
//         this.state.isError
//           ? <p>{this.state.errorMessage}</p>
//           : ''
//          {apiChar}
//       }
//       <ul>
//         {apiChar}
//       </ul>
//       <form>
//         <label>Pick a City</label>
//         <input type="text" name="city" onChange={this.handleCityInput}></input>

//       </form>

//     </>
//   )
// };
// handleSubmit = async (event) => {
  //   event.preventDefault();
  //   console.log(event.target.city.value);
  //   this.setState await {
  //     city: event.target.city.value;
  //   };
  // }
   // handleInputChange = (event) => {
  //   this.setState({
  //     city: event.target.value
  //   });
  // };
  // handleSubmit = async (event) => {
  //   event.preventDefault();
  //   let apiData = await axios.get('API URL HERE');
  //   console.log(apiData.data.results)
  //   this.setState({
  //     apiData: apiData.data.results
  //   });
  // }