import { Box, Button, Container, Typography } from "@mui/material";
import { useAuth } from "../context/Auth/Auth";
import { useEffect } from "react";

const MyOrderPage = () => {
  const { myOrders, getMyOrders } = useAuth();

  useEffect(() => {
    getMyOrders();
  }, []);

  return (
    <Container
      fixed
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <Typography>My Orders</Typography>
      {myOrders.map(({ _id, address, total }) => (
        <Box
          sx={{
            border: 1,
            borderColor: "gray",
            borderRadius: 5,
            p: 10,
            maxWidth: 250,
          }}
        >
          <Typography>Address: {address}</Typography>
          <Typography>Total: {total}</Typography>
        </Box>
      ))}
    </Container>
  );
};

export default MyOrderPage;
