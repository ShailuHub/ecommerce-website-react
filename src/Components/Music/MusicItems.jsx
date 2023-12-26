import React, { useContext } from "react";
import MusicCard from "./MusicCard";
import { Col, Container, Row } from "react-bootstrap";
import cartContext from "../../Store/cart-context";

const productsArr = [
  {
    title: "Colors",
    price: 100,
    delPrice: 150,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
  },
  {
    title: "Black and white Colors",
    price: 50,
    delPrice: 75,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
  },
  {
    title: "Yellow and Black Colors",
    price: 70,
    delPrice: 85,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
  },
  {
    title: "Blue Color",
    price: 100,
    delPrice: 110,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
  },
];

const MusicItems = () => {
  const cartCtx = useContext(cartContext);
  const handleOnAddToCart = async (itemDetails) => {
    cartCtx.addItem(itemDetails);
  };

  return (
    <React.Fragment>
      <Container>
        <Row>
          {productsArr.map((item, idx) => {
            return (
              <Col key={idx} xs={6} md={4} lg={3} xl={3}>
                <MusicCard
                  details={item}
                  onAddToCart={handleOnAddToCart}
                ></MusicCard>
              </Col>
            );
          })}
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default MusicItems;
