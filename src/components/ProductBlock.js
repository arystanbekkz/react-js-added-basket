import {Button, styled} from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const Box = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 16px 16px 12px 16px;
  box-sizing: border-box;
  min-height: 470px;
  height: 100%;
  border-radius: 8px;
  transition: .2s;
  &:hover {
    box-shadow: 0 10px 15px 0 rgba(0,0,0,.1);
  }
`
const Image = styled('img')`
  max-width: 100%;
  height: 260px;
  object-fit: contain;
`
const Title = styled('h3')`
  font-size: 16px;
  font-weight: normal;
  color: #19191D;
  margin-top: 12px;
`
const Price = styled('h3')`
  font-size: 24px;
  color: #19191D;
  margin-top: 12px;
`

export function ProductBlock({ product, onAddToBasket }) {
    return (
        <Box>
            <Image src={product.image} alt={product.title} />
            <Title>{product.title}</Title>
            <Price>{product.price}$</Price>
            <Button onClick={onAddToBasket} variant="contained" startIcon={<AddShoppingCartIcon style={{fontSize: "25px"}}/>}>
              Add to Basket
            </Button>
        </Box>
    )
}
