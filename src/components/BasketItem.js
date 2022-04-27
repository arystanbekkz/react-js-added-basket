import {styled} from "@mui/material";
import {useCallback} from "react";
import {addToBasket, removeFromBasket} from "../store/actions/shopActions";
import {useDispatch} from "react-redux";

const BasketItemWrapper = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: space-between;
    width: 100%;
    height: 150px;
    justify-content: space-between;
    margin-bottom: 8px;
    padding: 12px 16px;
    font-size: 12px;
    background-color: white;
`
const ItemImage = styled('img')`
    min-width: 15%;
    width: 61px;
    height: 61px;
    object-fit: contain;
`
const BasketItemCounter = styled('div')`
    width: 96px;
    height: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgb(243, 243, 247);
    border-radius: 9999px;
    font-size: 14px;
    font-weight: 700;
    color: gray;
    font-weight: 500;
`
const ItemIncrement = styled('button')`
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
    width: 32px;
    height: 32px;
    background: none;
    border: none;
    background-color: transparent;
    font-size: 24px;
    font-weight: 700;
    color: gray;
    &:hover {
        color: black;
        background-color: transparent;
    }
`
const BasketItemHeader = styled('h3')`
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: rgb(0, 0, 0);
    margin: 0px 0px 4px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`
const BasketItemAmount = styled('span')`
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    color: rgb(0, 0, 0);
`



function BasketItem({ product, basket }) {
    const dispatch = useDispatch()
    
    const handleIncrement = useCallback((product) => {
        dispatch(addToBasket(product.productDescr));
    }, [dispatch])

    const handleDecrement = useCallback((product) => {
        dispatch(removeFromBasket(product.productDescr));
    }, [dispatch])

    let basketItemQty = basket.find(item => item.productDescr.id === product.productDescr.id).quantity;
    let basketItemSubtotal = product.quantity * product.productDescr.price;
    basketItemSubtotal = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(basketItemSubtotal);
    const productPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.productDescr.price);

    return (
        <BasketItemWrapper onClick={(event) => event.stopPropagation()}>
            <div style={{display: "flex", justifyContent: "space-around", borderBottom: "1px solid rgb(226, 226, 233)", paddingBottom: "12px"}}>
                <div style={{width: "61px", height: "61px"}}>
                    <ItemImage src={product.productDescr.image} alt={product.productDescr.title}/>
                </div>
                <div style={{maxWidth: "320px", height: "64px", marginLeft: "10px", width: "85%"}}>
                    <BasketItemHeader title={product.productDescr.title}>{product.productDescr.title}</BasketItemHeader>
                    <span style={{fontSize: "15px"}}>Price: {productPrice}</span>
                </div>
            </div>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", height: "36px", marginTop: "12px"}}>
                <BasketItemAmount>{basketItemSubtotal}</BasketItemAmount>
                <BasketItemCounter>
                    <ItemIncrement product={product} onClick={() => handleDecrement(product)}>–</ItemIncrement>
                    {basketItemQty}
                    <ItemIncrement product={product} onClick={() => handleIncrement(product)}>+</ItemIncrement>
                </BasketItemCounter>
            </div>
        </BasketItemWrapper>
    )
}

export default BasketItem;