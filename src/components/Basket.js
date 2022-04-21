import {styled} from "@mui/material";
import {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useCallback} from "react";
import {addToBasket, removeFromBasket} from "../store/actions/shopActions";

const Wrapper = styled('div')`
  position: fixed;
  z-index: 1000;
  right: 20px;
  top: 80px;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: red;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: .2s;
  ${({ expanded }) => (expanded && `
    cursor: auto;
    width: 400px;
    height: 600px;
    background: white;
    border: 1px solid red;
    border-radius: 10px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 16px;
    overflow-y: scroll;
  `)}
`
const BasketIcon = styled('span')`
  font-size: 40px;
`
const BasketItemWrapper = styled('div')`
    display: flex;
    width: 100%;
    height: 80px;
    justify-content: space-between;
    margin-bottom: 15px;
    padding: 8px;
    font-size: 12px;
`
const ItemImage = styled('img')`
    min-width: 15%;
    width: 15%;
    height: 100%;
    object-fit: contain;
    margin-right: 20px;
`
const BasketItemCounter = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-left: 15px;
`
const ItemIncrement = styled('button')`
    cursor: pointer;
    padding: 0;
    width: 15px;
    height: 15px;
    background-color: orange;
    color: white;
    font-size: 12px;
    font-weight: 700;
    text-align: center;
    line-height: 100%;
    &:hover {
        background-color: red;
    }
`


export function BasketItem({ product, basket }) {
    const dispatch = useDispatch()
    
    const handleIncrement = useCallback((product) => {
        dispatch(addToBasket(product.productDescr));
    }, [dispatch])

    const handleDecrement = useCallback((product) => {
        dispatch(removeFromBasket(product.productDescr));
    }, [dispatch])

    return (
        <BasketItemWrapper onClick={(event) => event.stopPropagation()}>
            <ItemImage src={product.productDescr.image} alt={product.productDescr.title}/>
            <span>{product.productDescr.title}</span>
            <BasketItemCounter>
                <ItemIncrement product={product} onClick={() => handleIncrement(product)}>+</ItemIncrement>
                {basket.find(item => item.productDescr.id === product.productDescr.id).quantity}
                <ItemIncrement product={product} onClick={() => handleDecrement(product)}>-</ItemIncrement>
            </BasketItemCounter>
        </BasketItemWrapper>
    )
}

export function Basket() {
    const [expanded, setExpanded] = useState(false)
    const basket = useSelector((state) => state.shop.basket)

    return (
        <Wrapper onClick={() => setExpanded(!expanded)} expanded={expanded}>
            <BasketIcon>🪣</BasketIcon>
            { expanded && basket.map((product, index) => (
                <BasketItem basket={basket} product={product} key={index} />
            ))}
            {expanded ? <div style={{borderTop: "red solid 1px", width: "100%"}}>
                <h3>Total:   
                    {basket.reduce((sum, current) => sum + (current.productDescr.price * current.quantity), 0).toFixed(2)}$
                </h3>
            </div>: ''}
        </Wrapper>
    )
}
