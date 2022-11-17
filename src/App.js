import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';
import './App.css';
import Weather from './components/Weather.js';

class Apps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: {},
      errorMessage: '',
      isError: false,
      weatherData: [],
    

    }
  }



  handleCityInput = (event) => {
    this.setState({
      city: event.target.value,
      
    });
    console.log(this.state.city);
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
      this.handleWeather()
      

    } catch (error) {
      this.setState({
        errorMessage: error.message,
        isError: true
      })
    }
  }

  handleWeather = async () => {
    // axios.get(`http://localhost:3002/weather?city=${this.state.city}`)
    //   .then(weatherData => {
    //     console.log(weatherData);
    //     this.setState({
    //       weatherData: weatherData.data
    //     })
    //     console.log(this.state.weatherData);

    // }) 




    try {
      let url = `http://localhost:3002/weather?city=${this.state.city}`
      let weatherData = await axios.get(url);

      console.log(weatherData.data);

      this.setState({
        weatherData: weatherData.data,
      });

      console.log(this.state);
   

    } catch(error) {
      console.log(error);

    }
  };
  
 
    

  render() {

    let mapUrl = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=15`;
    
    let display = '';
    if (this.state.isError) {
    display = <p>{this.state.errorMessage}</p>
    } else {
    display = <ul id="cityLatLon">
                <ul id="listedCity">City: {this.state.cityData.display_name}</ul>
                <ul id="listedLon">Latitude: {this.state.cityData.lat}</ul>
                <ul id="listedLat">Longitude: {this.state.cityData.lon}</ul>
              </ul>
    }
    // console.log(this.state.weatherData);
    let weatherDisplay = this.state.weatherData.map(weatherData => {
      
      return (
      <Weather
      date = {this.state.weatherData.date}
      description = {this.state.weatherData.description}
      />)

    });

    // console.log(weatherDisplay);
    return (
      <><header id="topHeader">
        <h1 id='greeting' title="404">City Explorer</h1>
      </header>
        <main>
          <form id="cityForm" onSubmit={this.handleCitySubmit}>
            <label>
              <input name='city' type='text' onChange={this.handleCityInput} placeholder="Please Search for a City" id="inputId" />
            </label>
            <button type="submit" id="inputIdBtn">Explore</button>
          </form>
          <article>
            {display}
            <img src={mapUrl} alt={this.state.cityData.display_name} id="imageMain"/>
           {this.state.isError ? <Alert id="alertDiv" className="alert" variant="danger"><Alert.Heading>Oh No There is an Error!</Alert.Heading><p>{this.state.errorMsg}</p></Alert> : <p className="alert"></p>}
          </article>
          <article>
            <p> Weather Forecast for: {this.state.cityData.display_name}</p>
            {weatherDisplay}
          </article>
          
        </main>
        <footer>
          <h5>&copy; TCW, 2022</h5>
        </footer>
      </>

    );
  };
};

export default Apps;









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