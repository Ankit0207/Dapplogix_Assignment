import React, { useState } from 'react'
import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    FormHelperText,
    InputAdornment,
    Stack,
    TextField,
    Typography,
    Paper,
    IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [userData, setUserData] = useState({ email: "", password: "" });
    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post("https://blog-website-54v1.onrender.com/user/login", userData).then((res) => {
            localStorage.setItem("token",res.data.token);
            localStorage.setItem("userId",res.data.user._id);
            localStorage.setItem("username",res.data.user.username)
            setUserData({ email: "", password: "" });
            navigate("/")
        }).catch((err) => {
            console.log(err)
        })

    }
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'background.default',
            }}
        >
            <Container maxWidth="sm">
                <Stack spacing={8} alignItems="center">
                    <Stack alignItems="center">
                        <Typography variant="h4">Let's unlock</Typography>
                    </Stack>
                    <Paper elevation={6} sx={{ p: 4, borderRadius: 2 }}>
                        <Stack spacing={4}>
                            <form onSubmit={handleSubmit}>
                                <FormControl fullWidth>
                                    <FormHelperText sx={{ fontSize: 20, fontWeight: 700 }}>Email Address</FormHelperText>
                                    <TextField
                                        name="email"
                                        type="text"
                                        placeholder="user@email.com"
                                        variant="outlined"
                                        onChange={handleChange}
                                        value={userData.email}
                                    />
                                </FormControl>
                                <FormControl fullWidth margin="normal">
                                    <FormHelperText sx={{ fontSize: 20, fontWeight: 700 }}>Password</FormHelperText>
                                    <TextField
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Password123"
                                        variant="outlined"
                                        onChange={handleChange}
                                        value={userData.password}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        edge="end"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                    >
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </FormControl>
                                <Stack alignItems="center" mt={2}>
                                    <FormControlLabel control={<Checkbox />} label="Remember me" />
                                </Stack>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    sx={{ mt: 3 }}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Logging In...' : 'Sign in'}
                                </Button>
                            </form>
                            <Typography align="center" variant="body2">
                                Newcomer here? Join the club!{' '}
                                <Link to={"/signup"}>
                                    Register
                                </Link>
                            </Typography>
                        </Stack>
                    </Paper>
                </Stack>
            </Container>
        </Box>
    )
}

export default SignIn
