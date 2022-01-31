import { useState } from 'react';
import Movie from "./Movie";
//import "react-datepicker/dist/react-datepicker.css";

export function Home({ movies = [], onRemoveMovie = f => f }) {
  
    if( movies == null) return null;
    return (
        <div>
            <h1>Movie Reviews</h1>
            { movies.map(( movie, i) => { return <Movie key={i} {...movie} onRemove={onRemoveMovie}></Movie>}) }  
            
        </div>
    );
}

export function Add({ onNewMovie = f => f}) {
    
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [actors, setActors] = useState("");
    const [poster, setPoster] = useState("");
    const [rating, setRating] = useState(0);

    const submit = e => {
        e.preventDefault();
              
        onNewMovie(name, date, actors, poster, rating);
        setName("");
        setDate("");
        setActors("");
        setPoster("");
        setRating(0);
    };

    return (
        <div>
            <h1>Add Movie Review</h1>
      
            <form onSubmit={submit}>
                <div>
                <input value={name}
                    onChange={event => setName(event.target.value)}
                    type="text"
                    placeholder="Movie Title" required />
                </div>
                <div>
                <input value={date}
                    onChange={event => setDate(event.target.value)}
                    type="text"
                    placeholder="Release Date (Month - Year)" required />
                </div>
                
                <div>
                <input value={actors}
                    onChange={event => setActors(event.target.value.split(","))}
                    type="text"
                    placeholder="Actors (use comma)" required />
                </div>
                <div>
                <select value={poster}
                    onChange={event => setPoster(event.target.value)}>
                    <option >Select Movie Poster</option>
                    <option value= './images/polarExpress.jpg' >Polar Express</option>
                    <option value= './images/dune.jpg' >Dune</option>
                    <option value= './images/ironman.jpg' >Iron Man</option>
                    <option value= './images/spiderman.jpg' >Spider Man</option>
                    <option value= './images/Terminator1.jpg' >Terminator</option>
                    <option value= './images/avengers.jpg' >Avengers</option>
                    <option value= './images/Beautyandbeast.jpg' >Beauty and the Beast</option>
                    <option value= './images/noImageFound.jpg' >No Image Found</option>
                </select>
                                        
                </div>
                <div>
                <input value={rating}
                    onChange={event => setRating(event.target.value)}
                    type="number" min={0} max={5}
                    placeholder="Rating from 0 - 5" required />
                </div>

                <button>Add</button>

            </form>
           
            
        </div>
    );
}

