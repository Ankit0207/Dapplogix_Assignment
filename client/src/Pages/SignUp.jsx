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
import Toast from '../Component/Toast';
const SignUp = () => {
    const [userData, setUserData] = useState({ username: "", email: "", password: "" })
    const [showPassword, setShowPassword] = useState(false);
    const [openToast, setOpenToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [severity, setSeverity] = useState("");
    const isLoading = useSelector((store) => store.blogReducer.isLoading);
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userData.username===""||userData.email === "" || userData.password === "") {
            setToastMessage("All fields are required to register.")
            setSeverity("info")
            setOpenToast(true);
        } else {
            dispatch(addUser(userData)).then((res) => {
                if (res.data.msg === "user registered") {
                    setUserData({username:"", email: "", password: "" });
                    setToastMessage("Registration Success! Login to continue.")
                    setSeverity("success")
                    setOpenToast(true);
                    setTimeout(() => {
                        navigate("/signin")
                    }, 1000)
                } else {
                    setToastMessage("User already exist.")
                    setSeverity("info")
                    setOpenToast(true);
                }
            }).catch((err) => {
                console.log(err)
            })
        }
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
            <Toast open={openToast} msg={toastMessage} severity={severity} setOpenToast={setOpenToast} setToastMessage={setToastMessage} />
        </Box>
    )
}

export default SignUp
