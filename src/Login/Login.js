// import * as React from 'react';
import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from '../Utils/Common';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Clenic Administrator
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const headers = {
        headers: { Authorization: 'Bearer 4pb4tech' }
    };
    const ip = 'http://127.0.0.1:8000';
    const url = ip + '/api/user/login';
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            username: data.get('username'),
            password: data.get('password'),
        });
            
        axios.post(url, { username: data.get('username'), password: data.get('password') }, headers).then(response => {
            setLoading(false);
            setUserSession(response.data.token, response.data.user);
            console.log("Pasang Session");
            console.log("Response");
            console.log(response);
            console.log("Response Data");
            console.log(response.data);
            console.log("Response Data Username");
            console.log(response.data.data[0]['username']);
            sessionStorage.setItem("pengguna", response.data.data);
            sessionStorage.setItem("username", response.data.data[0]['username']);
            sessionStorage.setItem("userID", response.data.data[0]['id']);
            sessionStorage.setItem("token", response.data.data[0]['token']);
            sessionStorage.setItem("token_expired", response.data.data[0]['token_expired']);
            sessionStorage.setItem("role_id", response.data.data[0]['role_id']);
            // props.history.push('/dashboard');
            window.location.href = "/dashboard";
        }).catch(error => {
            setLoading(false);
            if (error.response.status === 401) setError(error.response.data.message);
            else setError("Something went wrong. Please try again later.");
        });
    };

    return (
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                {/* <LockOutlinedIcon /> */}
                <img className="Header-logo" src="/assets/img/brand.png" alt="Logo" />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Enter Username"
                name="username"
                autoComplete="username"
                autoFocus
                />
                <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Enter Password"
                type="password"
                id="password"
                autoComplete="current-password"
                />
                <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
                />
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Sign In
                </Button>
                <Grid container>
                <Grid item xs>
                    <Link href="#" variant="body2">
                    Forgot password?
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                    </Link>
                </Grid>
                </Grid>
            </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
        </ThemeProvider>
    );
}