import {Button, styled} from "@mui/material";
import {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import BasketItem from "./BasketItem";
import { useCallback } from "react";
import BasketModal from "./BasketModal";

const Container = styled('div')`
    position: relative;
    font-family: Dodo, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
`
const Background = styled('div')`
    width: 100%;
    height: 100%;
    z-index: 500;
    background: rgba(0, 0, 0, 0.64) none repeat scroll 0% 0%;
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
`

const Wrapper = styled('div')`
  position: fixed;
  z-index: 1000;
  right: 20px;
  bottom: 40px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: rgb(21, 101, 192);
  box-shadow: rgba(6, 5, 50, 0.7) 0px 0px 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: .2s;
  ${({ expanded }) => (expanded && `
    top: 0;
    right: 0;
    cursor: auto;
    width: 100%;
    max-width: 430px;
    height: 100vh;
    background: rgb(243, 243, 247) none repeat scroll 0% 0%;
    border: none;
    border-radius: 0;
    flex-direction: column;
    justify-content: flex-start;
    overflow-y: scroll;
  `)}
    
`

const BasketHeader = styled('h1')`
    margin-top: 24px;
    margin-bottom: 4px;
    font-size: 24px;
    line-height: 28px;
    font-weight: 500;
`
const BasketItemsCount = styled('div')`
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    min-width: 30px;
    height: 30px;
    position: absolute;
    top: -10px;
    right: 0;
    background-color: orangered;
    border-radius: 15px;
    font-size: 16px;
    font-weight: 600;
    padding: 10px;
`
const BasketFooter = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    padding: 24px;
    margin-top: 20px;
    box-shadow: rgba(6, 5, 50, 0.4) 0px -2px 10px;
    background-color: white;
    position: -webkit-sticky; /* Required for Safari */
    position: sticky;
    bottom: 0;
`
const CloseButton = styled('button')`
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: rgb(21, 101, 192);
    color: white;
    transition: .2s;
    position: absolute;
    top: 20px;
    right: 10px;
    width: 30px;
    height: 30px;
    padding: 0;
    cursor: pointer;
`

export function Basket() {
    const dispatch = useDispatch()
    
    const [expanded, setExpanded] = useState(false);
    
    const basket = useSelector((state) => state.shop.basket)

    const handleOpenModal = useCallback(() => {
        dispatch({type: 'shop/openModal'})
    }, [dispatch]);
    
    const handleCheckout = (event) => {
        event.stopPropagation();
        handleOpenModal();
    }
    
    if (expanded) {
        document.body.style.overflow = "hidden"
    } else {
        document.body.style.overflow = "auto"
    }

    let subtotal = basket.reduce((sum, current) => sum + (current.productDescr.price * current.quantity), 0);
    let itemsQty = basket.reduce((sum, current) => sum + current.quantity, 0);

    subtotal = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(subtotal);

    return (
        <Container >

            {expanded && 
                <Background></Background>
            }
            
                <Wrapper onClick={() => setExpanded(true)} expanded={expanded}>
                    {expanded && 
                        <CloseButton className="close-button" onClick={(e) => {e.stopPropagation(); setExpanded(false)}}>
                            <div style={{width: "100%", height: "3px", backgroundColor: "white", transform: "rotate(45deg)", position: "absolute"}}></div>
                            <div style={{width: "100%", height: "3px", backgroundColor: "white", transform: "rotate(-45deg)"}}></div>
                        </CloseButton>
                    }
                    <div>
                        {!expanded &&
                            <ShoppingBagIcon style={{fontSize: "40px", color: "white"}}/>
                        }
                        
                        {!expanded && itemsQty > 0 && 
                            <BasketItemsCount>{itemsQty}</BasketItemsCount>
                        }
                    </div>
                    {expanded && 
                        <div style={{padding: "0 16px"}}>
                            <BasketHeader>
                                {itemsQty} items - Subtotal: {subtotal}
                            </BasketHeader>
                        </div>}
                    { expanded && basket.map((product, index) => (
                        <BasketItem basket={basket} product={product} key={index} />
                    ))}
                    
                    { expanded && 
                        <div style={{marginTop: "auto", width: "100%"}}>
                            <BasketFooter>
                                <div style={{display: "flex", justifyContent: "space-between"}}>
                                    <h3>Subtotal ({itemsQty} items):</h3>
                                    <h3>{subtotal}</h3>
                                </div>
                                <Button 
                                    onClick={(event) => handleCheckout(event)}
                                    variant="contained" 
                                    color="primary"
                                    disabled={itemsQty < 1} 
                                    sx={{fontWeight: 600}}>
                                        Proceed to checkout
                                </Button>
                            </BasketFooter>
                        </div>}
                </Wrapper>
            
            <BasketModal />
        </Container>
    )
}


