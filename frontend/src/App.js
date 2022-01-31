import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Home, Add } from './pages';
import NavBar from './NavBar';

function App() {

  const [movies, setMovies] = useState(null);

  useEffect(() => {
    fetch('/api/movies')
    .then((response) => response.json())
    .then(setMovies)
}, []);

  if  (movies == null) return null;

  return (
      //<Router>
      <div className="App">
      <NavBar />
        <Routes>
          <Route exact path="/" element={<Home 
            movies={movies} onRemoveMovie={name => {
              const newMovies = movies.filter(movie => movie.name !== name);
              setMovies(newMovies);
            }}
            />}
            />

          <Route path="/add" element={<Add 
            onNewMovie={(name, date, actors, poster, rating) => {
              const updatedMovies = [...movies, {name, date, actors, poster, rating}]; 
              setMovies(updatedMovies);
              }}/>}/>
        </Routes>
        </div>
      //</Router>
  );}
  
export default App;
