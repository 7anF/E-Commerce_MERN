import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constant/Baseurl";
import { useAuth } from "../context/Auth/Auth";
import { useCart } from "../context/Cart/Cart";
import { Box } from "@mui/material";

const CartPage = () => {
  const [cart, setCart] = useState({});
  const [error, setError] = useState("");
  const { token } = useAuth();
  const { cartItems } = useCart();

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h4">My Cart</Typography>
      {cartItems.map((i) => (
        <Box>{i.title}</Box>
      ))}
    </Container>
  );
};

export default CartPage;
