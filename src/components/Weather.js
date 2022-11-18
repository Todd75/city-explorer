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
          <h3>{this.props.city}</h3>
          {this.props.date}
          <p>{this.props.description}</p>
          {this.props.fullDescription}
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

