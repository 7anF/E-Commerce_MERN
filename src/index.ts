import express from 'express';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute';

const app = express();
const port = 3500;
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/ecommerce")
            .then(() => console.log("Connected"))
            .catch((err) => console.log(err));

app.use('/user', userRoute)

app.listen(port, () => {
    console.log(`Server is running at:localhost:${port}`)
})