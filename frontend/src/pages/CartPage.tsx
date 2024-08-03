import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useCart } from "../context/Cart/Cart";
import { Box, Button, ButtonGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const {
    cartItems,
    totalAmount,
    updateItemInCart,
    removeItemInCart,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  const handleQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) return;

    updateItemInCart(productId, quantity);
  };

  const handleRemoveItem = (productId: string) => {
    removeItemInCart(productId);
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <Container fixed sx={{ mt: 2 }}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4">My Cart</Typography>
        <Button onClick={() => clearCart()}>Clear the cart</Button>
      </Box>
      {cartItems.length ? (
        <Box display="flex" flexDirection="column" gap={4} mt={4}>
          {cartItems.map((item, index) => (
            <Box
              key={index}
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                border: 1,
                borderColor: "#e3e3e3",
                borderRadius: 5,
              }}
              p={2}
            >
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="center"
                gap={2}
              >
                <img src={item.image} alt={item.title} width={50} />
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography>
                    {item.quantity} x {item.unitPrice} JOD
                  </Typography>
                  <Button onClick={() => handleRemoveItem(item.productId)}>
                    Remove item
                  </Button>
                </Box>
              </Box>
              <Box>
                <ButtonGroup
                  variant="contained"
                  aria-label="Basic button group"
                >
                  <Button
                    onClick={() =>
                      handleQuantity(item.productId, item.quantity - 1)
                    }
                  >
                    -
                  </Button>
                  <Button
                    onClick={() =>
                      handleQuantity(item.productId, item.quantity + 1)
                    }
                  >
                    +
                  </Button>
                </ButtonGroup>
              </Box>
            </Box>
          ))}
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h4" mb={4}>
              Total Amount: {totalAmount} JOD
            </Typography>
            <Button onClick={handleCheckout} variant="contained">
              Go To Checkout
            </Button>
          </Box>
        </Box>
      ) : (
        <Box display="flex" alignItems="center" justifyContent="center">
          <Typography variant="h2" color="gray">
            Cart is empty
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default CartPage;
