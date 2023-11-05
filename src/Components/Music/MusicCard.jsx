import React from "react";
import { Button, Card } from "react-bootstrap";
const MusicCard = (props) => {
  const { title, imageUrl, price, id } = props.details;
  return (
    <React.Fragment>
      <Card>
        <Card.Header>
          <h2 className="text-center">Album {id}</h2>
        </Card.Header>
        <Card.Img src={imageUrl}></Card.Img>
        <Card.Body>
          <Card.Title>Hello</Card.Title>
          <Card.Subtitle></Card.Subtitle>
          <Card.Text></Card.Text>
        </Card.Body>
        <Card.Footer>
          <div className="d-flex justify-content-between">
            <p className="mb-0 fs-4 d-flex flex-column">
              <span className="fw-bold">Price</span>{" "}
              <span>
                &#8377; 400 <del> &#8377; 600</del>
              </span>
            </p>
            <Button variant="success" className="text-uppercase fs-5">
              add to cart
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </React.Fragment>
  );
};

export default MusicCard;
