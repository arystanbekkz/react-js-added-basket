import {Container, Grid} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect} from "react";
import {addToBasket, fetchProducts} from "../store/actions/shopActions";
import {ProductBlock} from "../components/ProductBlock";
import {Basket} from "../components/Basket";

export function ShopPage() {
    const dispatch = useDispatch()
    const products = useSelector((state) => state.shop.products)

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    const handleAddToBasket = useCallback((product) => {
        dispatch(addToBasket(product))
    }, [dispatch])

    return (
        <Container style={{padding: "30px"}}>
            <Grid container spacing={2}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={12 / 5} key={product.id}>
                        <ProductBlock product={product} onAddToBasket={() => handleAddToBasket(product)} />
                    </Grid>
                ))}
            </Grid>
            <Basket />
        </Container>
    )
}
