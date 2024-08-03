import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useRef, useState } from "react";
import { BASE_URL } from "../constant/Baseurl";
import { useAuth } from "../context/Auth/Auth";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    
    const { login } = useAuth();

    const onSubmit = async () => {
        const firstName = firstNameRef.current?.value;
        const lastName = lastNameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        const response = await fetch(`${BASE_URL}/user/register`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password
            })
        });

        if(!response.ok) {
            setError('Unable to register user, please try different information');
            return;
        }    

        const token = await response.json();

        if(!token || !firstName || !lastName || !email || !password) {
            setError('Incorrect data');
            return;
        };

        login(email, token);
        navigate('/');
    };

    return (
        <Container>
            <Box 
                display='flex' 
                justifyContent='center' 
                alignItems='center' 
                flexDirection='column'
                mt={4}
            >
                <Typography variant="h6">
                    Register New Account
                </Typography>
                <Box 
                    display='flex' 
                    flexDirection='column' 
                    gap={2} 
                    mt={2}
                    border={1}
                    padding={2}
                    borderColor='#f2f2f2'
                >
                    <TextField inputRef={firstNameRef} label='First name' name="First name" />
                    <TextField inputRef={lastNameRef} label='Last name' name="Last name" />
                    <TextField inputRef={emailRef} label='Email' name="Email" />
                    <TextField inputRef={passwordRef} type="password" label='Password' name="Password" />
                    <Button onClick={onSubmit} variant='contained'>Register</Button>
                    {error && <Typography color='red'>{error}</Typography>}
                </Box>
            </Box>
        </Container>
    )
}

export default RegisterPage;