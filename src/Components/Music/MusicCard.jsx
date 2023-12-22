import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
const MusicCard = (props) => {
  const { title, imageUrl, price, id, delPrice } = props.details;
  const [beforAddToCartBtn, setAddToCartBtn] = useState(true);
  const handleAddToCart = () => {
    if (props.onAddToCart) {
      props.onAddToCart({
        title: title,
        imageUrl: imageUrl,
        price: price,
        id: id,
      });
    }
    setAddToCartBtn(false);
  };

  return (
    <React.Fragment>
      <Card>
        <Card.Header>
          <h2 className="text-center">Album {id}</h2>
        </Card.Header>
        <Card.Img src={imageUrl}></Card.Img>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle></Card.Subtitle>
          <Card.Text></Card.Text>
        </Card.Body>
        <Card.Footer>
          <div className="d-flex justify-content-between">
            <p className="mb-0 fs-4 d-flex flex-column">
              <span className="fw-bold">Price</span>{" "}
              <span>
                &#8377; {price} <del> &#8377; {delPrice}</del>
              </span>
            </p>
            {beforAddToCartBtn ? (
              <Button
                variant="success"
                className="text-uppercase fs-5"
                onClick={handleAddToCart}
              >
                add to cart
              </Button>
            ) : (
              <Button
                variant="success"
                className="text-uppercase fs-5 disabled"
                onClick={handleAddToCart}
              >
                added to cart
              </Button>
            )}
          </div>
        </Card.Footer>
      </Card>
    </React.Fragment>
  );
};

export default MusicCard;
