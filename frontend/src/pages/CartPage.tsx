import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useCart } from "../context/Cart/Cart";
import { Box, Button, ButtonGroup } from "@mui/material";

const CartPage = () => {
  const { cartItems, totalAmount } = useCart();

  return (
    <Container fixed sx={{ mt: 2 }}>
      <Typography variant="h4">My Cart</Typography>
      <Box display="flex" flexDirection="column" gap={4} mt={4}>
        {cartItems.map((item) => (
          <Box
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
                <Button>Remove item</Button>
              </Box>
            </Box>
            <Box>
              <ButtonGroup variant="contained" aria-label="Basic button group">
                <Button>-</Button>
                <Button>+</Button>
              </ButtonGroup>
            </Box>
          </Box>
        ))}
        <Box>
          <Typography variant="h4" mb={4}>
            Total Amount: {totalAmount} JOD
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default CartPage;
