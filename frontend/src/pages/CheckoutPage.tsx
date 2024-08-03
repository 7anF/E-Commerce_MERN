import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useCart } from "../context/Cart/Cart";
import { Box, Button, TextField } from "@mui/material";
import { useRef } from "react";
import { BASE_URL } from "../constant/Baseurl";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth/Auth";

const CheckoutPage = () => {
  const { cartItems, totalAmount } = useCart();
  const addressRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { token } = useAuth();

  const handleConfirmOrder = async () => {
    if (!addressRef) return;
    const address = addressRef.current?.value;

    const response = await fetch(`${BASE_URL}/cart/checkout`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        address,
      }),
    });

    if (!response.ok) return;

    navigate("/order-success");
  };

  return (
    <Container fixed sx={{ mt: 2 }}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4">Checkout</Typography>
      </Box>
      <TextField
        inputRef={addressRef}
        label="Delivery address"
        name="address"
        fullWidth
      />
      <Box
        display="flex"
        flexDirection="column"
        gap={1}
        mt={4}
        sx={{
          border: 1,
          borderColor: "#e3e3e3",
          borderRadius: 5,
        }}
      >
        {cartItems.map((item, index) => (
          <Box
            key={index}
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            p={2}
            borderBottom={1}
            borderColor="#e6e6e6"
          >
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              gap={4}
              width="100%"
              px={4}
            >
              <img src={item.image} alt={item.title} width={50} />
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                gap={4}
              >
                <Typography variant="h6">{item.title}</Typography>
                <Typography>
                  {item.quantity} x {item.unitPrice} JOD
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-end"
          mt={1}
          mb={4}
          px={4}
        >
          <Typography variant="h6">Total Amount: {totalAmount} JOD</Typography>
        </Box>
      </Box>
      <Button
        fullWidth
        sx={{ mt: "8px", borderRadius: "5px", p: "12px" }}
        variant="contained"
        onClick={handleConfirmOrder}
      >
        Pay now
      </Button>
    </Container>
  );
};

export default CheckoutPage;
