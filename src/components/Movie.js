import React from 'react';
import { ListGroup } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import '../App.css'

class Movie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <>
                <section id="wholeCard">
                    <div id="movies">
                        <section id="section1">
                            <h3>{this.props.city}</h3>
                            <div id='movieRecs'>
                                {this.props.movies.map((movie, idx) => (
                                    <Card key={idx}>
                                        <section id="img">
                                            <Card.Img variant="left" id={movie.title} alt={movie.title} src={movie.imgPath} />
                                        </section>
                                        <Card.Body>
                                            <Card.Text>
                                                <div id="title">
                                                    <Card.Title>{movie.title}</Card.Title>
                                                </div>
                                                <div id="summary">
                                                    <h5>Summary:</h5>
                                                    <p>{movie.overview}</p>
                                                </div>
                                            </Card.Text>
                                        </Card.Body>
                                        <ListGroup id="list-group-flush">
                                            <ListGroup.Item>Rating: {movie.avgRating}</ListGroup.Item>
                                            <ListGroup.Item>Release Date: {movie.releaseDate}</ListGroup.Item>
                                        </ListGroup>

                                    </Card>
                                ))
                                }
                            </div>
                        </section>
                    </div>
                </section>
            </>
        )
    }






}
export default Movie;