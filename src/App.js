import axios from 'axios';
import React from 'react';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: {},
      value: '',


    }
  }



  handleSubmit = async (event) => {
    event.preventDefault();
    let apiData = await axios.get('API URL HERE');
    console.log(apiData.data.results)
    this.setState({
      apiData: apiData.data.results
    });
  }
  handleCityInput = (event) => {
    this.setState({
      city: event.target.value
    });
  };
  handleInputChange = (event) => {
    this.setState({
      city: event.target.value
    });
  };
  handleCitySubmit = async (event) => {
    event.preventDefault();
    let url = ''
    try {
      event.preventDefault();
      let locationInfo = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`);

      console.log(locationInfo.data[0]); //return first value in array

    } catch (error) {
      console.log('error', error);
      console.log('error.message: ', error.message);
      this.setState({
        errorMessage: error.message,
        isError: true
      })
    }
    render() {

      let apiChar = this.state.apiData.map((character, idx) => {
        return <li key={idx}>{character.name}</li>
      });

      return (
        <>
          <h1>Data from Api</h1>
          <form onSubmit={this.handleCitySubmit}>
            <button type="submit">Display</button>
          </form>
          {
            this.state.isError
              ? <p>{this.state.errorMessage}</p>
              : '',
            { apiChar }
          }
          <ul>
            {apiChar}
          </ul>
          <form>
            <label>Pick a City</label>
            <input type="text" name="city" onChange={this.handleCityInput}></input>

          </form>

        </>
      )}
    };
  };
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


export default App;

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