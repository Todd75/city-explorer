import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';
import './App.css';
import Weather from './components/Weather.js';
import Movie from './components/Movie.js';

class Apps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: {},
      errorMessage: '',
      isError: false,
      weatherData: [],
      showImage: false,
      movieData: [],
    }
  }
  handleCityInput = (event) => {
    this.setState({
      city: event.target.value,
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
        showImage: true,
      }, this.handleWeather); this.handleMovie();
      
      } catch (error) {
        this.setState({
        errorMessage: error.message,
        isError: true
      })
    }
  }

  handleWeather = async (e) => {
   try {
      let url = `${process.env.REACT_APP_SERVER}/weather?city=${this.state.city}&lon=${this.state.cityData.lon}&lat=${this.state.cityData.lat}`;
      // let url = `${process.env.REACT_APP_SERVER}/weather?queriedLat=${this.state.cityData.lat}&queriedLon=${this.state.cityData.lon}`;
      let weatherData = await axios.get(url);
      this.setState({
        weatherData: weatherData.data,
        isError: false,
      });
      } catch(error) {
      this.setState({
        errorMessage: error.message,
        isError: true,
      })
    }
  };
  handleMovie = async () => {
    let movieURL = await axios.get(`${process.env.REACT_APP_SERVER}/movie?search=${this.state.city}`);
    let movieData = (movieURL);
    this.setState({
      movieData: movieData.data
    })
    
  }

  render() {
    
    let display = '';
    if (this.state.isError) {
    display = <p>{this.state.isError ? <Alert className="alert" variant="danger"><Alert.Heading>Oops! There is an Error! <p>{this.state.errorMsg}</p></Alert.Heading></Alert> : <p className="alert"></p>}</p>
    } else {
    display = <ul id="cityLatLon">
                <ul id="listedCity">City: {this.state.cityData.display_name}</ul>
                <ul id="listedLon">Latitude: {this.state.cityData.lat}</ul>
                <ul id="listedLat">Longitude: {this.state.cityData.lon}</ul>
              </ul>
    }
    let weatherDisplay = this.state.weatherData.map(weatherData => {
      return <Weather
      date = {weatherData.date}
      description = {weatherData.fullDescription}
      />
    });
  
    return (
      <>
        <h1 id='greeting' title="404">City Explorer</h1>
        <form onSubmit={this.handleCitySubmit}>
          <label>
            <input name='city' onChange={this.handleCityInput} placeholder="Please Pick a Location to Search For" />
          </label>
          <button type="submit">Explore!</button>
        </form>
        {this.state.isError ? <p>{this.state.errorMessage}</p> : <ul></ul>}
        {display}

        <img className ="image" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=15`} alt={this.state.cityData.display_name} />
      
        {/* {this.state.isError ? <Alert className="alert" variant="danger"><Alert.Heading>Oops! There is an Error!</Alert.Heading><p>{this.state.errorMsg}</p></Alert> : <p className="alert"></p>} */}

        <article id="weatherArticle">
          <h3>Three Day Weather Forecast</h3>
          {weatherDisplay}
        </article>
        <article id="movieArticle">
          <h2>Movies</h2>
          {this.state.movieData.length ? 
        
          <Movie
          movies = {this.state.movieData}
          city = {this.state.searchCity}
          />
          :
         <>
         </>}
        </article>
      </>
    ); 
  };
};

export default Apps;






// let weatherDisplay = this.state.weatherData.map(weatherData => {
    //   return (
    //   <Weather
    //   date = {this.state.weatherData.date}
    //   description = {this.state.weatherData.fullDescription}
    //   />)
    // });
 // axios.get(`http://localhost:3002/weather?city=${this.state.city}`)
    //   .then(weatherData => {
    //     console.log(weatherData);
    //     this.setState({
    //       weatherData: weatherData.data
    //     })
    //     console.log(this.state.weatherData);

    // }) 
// console.log(weatherDisplay); {this.state.showImages && }
// handleOpenModal = () => {
//   this.setState({
//     showModal: true,
//   })
// }

// handleCloseModal = () => {
//   this.setState({
//     showModal: false,
//   })
// }

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

  

    // <Card style={{ width: '25rem', }} id="cardID">
    //         <Card.Img orientation='top' src={mapUrl} id='cardImageMap' />
    //         <Card.Body>
    //           <Card.Title>{this.state.cityData.display_name}</Card.Title>
    //           <Card.Text>
    //             <ul>Latitude: {this.state.cityData.lat}</ul>
    //             <ul>Longitude: {this.state.cityData.lon}</ul>
    //           </Card.Text>
    //           <Button onClick={this.handleOpenModal}>View Stuff</Button>
    //           <Modal show={this.state.showModal} onHide={this.handleCloseModal} size="lg" className="modal" centered>
    //             <Modal.Header>
    //               <Modal.Title>

    //               </Modal.Title>
    //             </Modal.Header>
    //             <Modal.Body id="modalbody">
    //               <div>
    //                 <img className="modaling"
    //                   src={seasonUrl}
    //                   alt={this.state.city.name}
    //                 />
    //               </div>
    //               <p className="descriptionModal">Forecast: {this.state.city.weatherData}</p>

    //             </Modal.Body>
    //             <Modal.Footer>
    //               <Button variant="primary" onClick={this.handleCloseModal}>Finished</Button>
    //             </Modal.Footer>
    //           </Modal>
    //         </Card.Body>
    //       </Card>