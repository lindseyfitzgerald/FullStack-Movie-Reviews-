import { FaTrash } from "react-icons/fa";
import StarRating from "./starRating";

export function Movie({name, date, actors, poster, rating, onRemove = f => f}) {
    return (
      <>
        <h2>{name}</h2>
        <p>Release Date: { date}</p>
        <p>Actors: {actors[0]}, {actors[1]}, {actors[2]}</p>
        <img src= {poster} height={200} alt="Movie poster" />
        <p>Rating: <StarRating selectedStars={rating}></StarRating></p>
        <button onClick={() => onRemove(name)}>
          <FaTrash/>
        </button>
      </>
    )
  }

export default Movie;