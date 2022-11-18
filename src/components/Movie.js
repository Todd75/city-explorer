import React from 'react';

class Movie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render () {
        return (
            <>
                <div>
                    {this.props.movieData.map((movie, idx) => (
                        <>
                        <div>
                            <p>hi {movie.title}</p>
                            <p></p>
                            {/* <image /> */}
                        </div>
                        </>
                    ))}
                </div>
            </>
        )
    }






}
export default Movie;