import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constant/Baseurl";
import { useAuth } from "../context/Auth/Auth";

const CartPage = () => {
    const [cart, setCart] = useState({});
    const [error, setError] = useState('');
    const { token } = useAuth();

    useEffect(() => {
        if(!token) return;

        const fetchCart = async () => {
            const response = await fetch(`${BASE_URL}/cart`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if(!response.ok) setError("Failed to fetch user cart")

            const data = await response.json();
            setCart(data);
        };

        fetchCart();
    }, [token])

    return (
        <Container
            sx={{ mt: 2 }}
        >
            <Typography variant="h4">
                My Cart
            </Typography>
        </Container>
    )
}

export default CartPage;