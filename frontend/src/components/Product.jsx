import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom"
import styled from "styled-components";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2) !important;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd !important;
  position: relative;

  &:hover ${Info}{
    opacity: 1;
  }
`;

const ContainerCollum = styled.div`
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd !important;
  position: relative;
  flex-direction: column;
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white !important;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Name = styled.div `
  color: black;
  font-size: 30px
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white !important;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5 !important;
    transform: scale(1.1);
  }
`;

const Product = ({ item }) => {
  return (
  <Link to={`/product/${item._id}`} className="link">
    <Container>
      <Circle />
      <Image src={item.img} />
      <Info>
        <Name>
          {item.title}
        </Name>
        <Icon>
          <ShoppingCartOutlined />
        </Icon>
        <Icon>
          <SearchOutlined />
        </Icon>
        <Icon>
          <FavoriteBorderOutlined />
        </Icon>
        <hr/>
        <Icon>
          <h2>{item.price}$</h2>
        </Icon>
      </Info>
    </Container>
  </Link>
  );
};

export default Product;
