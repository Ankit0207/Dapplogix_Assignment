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
import { Link,useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { addUser } from '../Redux/Blogs/action';
const SignUp = () => {
    const [userData, setUserData] = useState({ username: "", email: "", password: "" })
    const [showPassword, setShowPassword] = useState(false);
    const isLoading = useSelector((store) => store.blogReducer.isLoading);
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addUser(userData)).then(()=>{
            navigate("/signin")
        })
        setUserData({username: "", email: "", password: ""})
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
                        <Typography variant="h4">Come On In!</Typography>
                    </Stack>
                    <Paper elevation={6} sx={{ p: 4, borderRadius: 2 }}>
                        <Stack spacing={4}>
                            <form onSubmit={handleSubmit}>
                                <FormControl fullWidth>
                                    <FormHelperText sx={{ fontSize: 18, fontWeight: 700 }}>Username</FormHelperText>
                                    <TextField
                                        name='username'
                                        type="text"
                                        placeholder="username"
                                        variant="outlined"
                                        onChange={handleChange}
                                        value={userData.username}
                                    />
                                </FormControl>
                                <FormControl fullWidth margin='normal'>
                                    <FormHelperText sx={{ fontSize: 18, fontWeight: 700 }}>Email Address</FormHelperText>
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
                                    <FormHelperText sx={{ fontSize: 18, fontWeight: 700 }}>Password</FormHelperText>
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
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    sx={{ mt: 3 }}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Registering' : 'Sign up'}
                                </Button>
                            </form>
                            <Typography align="center" variant="body2">
                                Already a user! {" "}
                                <Link to={"/signin"}>
                                    Login
                                </Link>
                            </Typography>
                        </Stack>
                    </Paper>
                </Stack>
            </Container>
        </Box>
    )
}

export default SignUp
