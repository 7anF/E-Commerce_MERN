import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { BASE_URL } from "../constant/Baseurl";
import { IProduct } from "../types/Product";

const HomePage = () => {
  const [product, setProduct] = useState<IProduct[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchproducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/product`);
        const data = await response.json();
        setProduct(data);
      } catch {
        setError(true);
      }
    };

    fetchproducts();
  }, []);

  return error ? (
    <Box>Something went wrong!!</Box>
  ) : (
    <Container
      sx={{
        mt: 2,
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        {product.map((p) => (
          <Grid item key={p._id}>
            <ProductCard {...p} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
