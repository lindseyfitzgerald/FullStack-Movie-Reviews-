import { useState, useEffect } from 'react';
import Movie from "./Movie";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button, Row} from 'react-bootstrap';
import NavBar from './NavBar';

export function Home() {
    const [movies, setMovies] = useState(null);

  useEffect(() => {
    fetch('/api/movies')
    .then((response) => response.json())
    .then(setMovies)
}, []);

    if( movies == null) return null;
    return (
        <div>
            <NavBar />
            <h1>Movie Reviews</h1>
            { movies.map(( movie, i) => { return <Movie key={i} {...movie} ></Movie>}) }
            
        </div>
    );
}

export function Add() {
    
const [name, setName] = useState("");
const [date, setDate] = useState("");
const [actors, setActors] = useState("");
const [poster, setPoster] = useState("");
const [rating, setRating] = useState(0);

const formData = new FormData();

const handleSubmit = async(e) => {
    e.preventDefault();
    formData.append('name', name);
    formData.append('date', date);
    formData.append("actors", actors);
    formData.append("poster", poster);
    formData.append("rating", rating);
    console.log(name);

    const addMovie = async () => {
        const result = await fetch('/api/addMovie', {
            method: "post",
            body: formData
        });
        const body = await result.json();
        console.log(body);
       
    }
    addMovie();
    setName("");
    setDate("");
    setActors("");
    setPoster("");
    setRating(0);
};

return (
    <>
    <Row>
    <NavBar/>
    </Row>
    <Row>
    <h2> Add Movie Review </h2>
    </Row>
    <Form onSubmit={handleSubmit} role="form">
        <Form.Group  as={Row} className="mb-3" controlId="name">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter Movie Title" value={name} onChange={event => setName(event.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="releaseDate">
            <Form.Label>Release Date</Form.Label>
            <Form.Control type="date" placeholder="release date" value={date} onChange={event => setDate(event.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="actors">
            <Form.Label>Actors</Form.Label>
            <Form.Control type="text" placeholder="Actors" value={actors} onChange={event => setActors(event.target.value.split(","))}/>
            <Form.Text className="text-muted">
            Seperate Actors with comma. 
            </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="poster">
            <Form.Label>Poster</Form.Label>
            <Form.Control type="file" placeholder="Poster" value={poster} onChange={event => setPoster(event.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="Rating">
            <Form.Label>Rating</Form.Label>
            <Form.Control type="number" min={0} max={5} value={rating} placeholder="Rating" onChange={event => setRating(event.target.value)}/>
        </Form.Group>
        
        <Button variant="primary" type="submit">
            Submit
        </Button>
    </Form>
   </>
   
);
}



