import React, { Fragment, useState } from 'react'
import axios from 'axios'


//Api
import Get_api from '../Api/Get_api'

// import {
//     Button,
//     Dialog,
//     DialogHeader,
//     DialogBody,
//     DialogFooter,
// } from "@material-tailwind/react";

// import {
//     Card,
//     Input,
//     Checkbox,
//     Typography,
// } from "@material-tailwind/react";

//Mui 
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';




function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Welcome to website © '}
            <a color="inherit">
                Tanachai
            </a>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

function Login() {

    //State for login to website page
    const [id_card, setId_card] = useState("")
    const [pwd1, setPwd1] = useState("")



    //Status for login to page
    const [statusLogin, setStatusLogin] = useState("")
    const [WrongstatusLogin, setWrongStatusLogin] = useState("")
    const [check_error, setCheck_error] = useState(true)


    //For button function
    const [open, setOpen] = useState(false);


    const login = () => {

        axios.post("http://localhost:3000/login", {
            id_card: id_card,
            pwd1: pwd1
        }).then((res) => {
            console.log(res)
            //ถ้าข้อมูลตรงให้เข้าถึงข้อมูล id_card
            if (res.data.status == "OK") {
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("name", res.data.name)
                localStorage.setItem("permission", res.data.permission)
                window.location = '/Homepage'
            } else {
                //ถ้าข้อมูลไม่ตรงในBaseจะเข้าลูปนี้และเข้าถึง properties.msg ที่เช็คเงื่อนไขไว้ใน index.js
                setStatusLogin(res.data.MSG)
                alert(res.data.MSG)
            }
        })
    }

    //Mui
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    console.log(id_card)

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
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            เข้าสู่ระบบ
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="id_card"
                                label="ID card (เลขบัตรประจำตัวประชาชน)"
                                name="id_card"
                                type='text'
                                autoComplete="id_card"
                                autoFocus
                                onChange={(e) => setId_card(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="รหัสผ่าน"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e) => setPwd1(e.target.value)}
                            />
                           
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={login}
                            >
                                เข้าสู่ระบบ
                            </Button>
                            
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 8, mb: 4 }} />
                </Container>
            </ThemeProvider>
            



    )
}

export default Login