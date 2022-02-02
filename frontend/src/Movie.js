import { FaTrash } from "react-icons/fa";
import StarRating from "./starRating";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import 'bootstrap/dist/css/bootstrap.min.css';

export function Movie({name, date, actors, poster, rating}) {
  const formData = new FormData();
    const handleRemove = async () => {
      formData.append('name', name);
      
      const removeMovie = async () => {
        const result = await fetch('/api/removeMovie', {
            method: "post",
            body: formData,
        });
      const body = await result.json();
      console.log(body);
    }
    removeMovie();
  }
      
    return (
      <>
      <Container className="block-example border border-dark" >
        <Row>
          <h2 className="mt-5">{name}</h2>
        </Row>
        <Row className="justify-content-lg-center">
            <Image rounded="true" style={{width: 300, height: 'auto'}} src={`${poster}`}></Image>
          <Col expand="xs">
            <Row className="justify-content-lg-center">
              <Col>
                <p className="fs-4 text-start">Date</p>
              </Col>
              <Col>
                <p className="fs-4 text-start">{date}</p>
              </Col>
            </Row>
            <Row className="justify-content-md-left">
              <Col>
                <p className="fs-4 text-start">Actors</p>
              </Col>
              <Col>
                {actors.map(actor => { return <Row key={actor}> {actor}</Row>})}
              </Col>
            </Row>
            <Row className="justify-content-md-left">
              <Col>
                <p className="fs-4 text-start">Rating</p>
              </Col>
              <Col>
                <p className="fs-4 text-start"><StarRating selectedStars={rating}></StarRating></p>
              </Col>
            </Row>
            <Row className="justify-content-md-left">
              <Col>
              <button onClick={() => handleRemove()}>
                <FaTrash/>
                </button>
              </Col>
            </Row>         
          </Col>
        </Row>
      </Container>
      </>
    )
  }

export default Movie;