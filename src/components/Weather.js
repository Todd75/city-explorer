import React from "react";


class Weather extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
  
      }
    }
  
    render() {
  
      return (
       
        <>
        <div>
          {this.props.weatherData.map((day, idx) => (
            <>
            <div>
                <p> Date: {day.date}</p>
                <p>Daily Forecast: {day.description}</p>
            </div>
            </>
          ))}
           </div>
        </>
        
      )
  
    }
  }


  export default Weather;














// class Weather extends React.Component {




    
//     render() {
//         return (
//             <>
//                 {this.props.weather.map(day => (
//                     <>
//                         <p>{day.date}</p>
//                         <p>{day.description}</p>
//                     </>
//                 ))}

//             </>
//         )

//     }
// }

