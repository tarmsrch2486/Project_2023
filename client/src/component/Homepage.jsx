import React from 'react'
import { Fragment, useRef, useEffect, useState } from 'react'
import axios from 'axios'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

import Navbar_project from './Navbar_project'

function Homepage() {


    // Function will execute on click of button
    const onButtonClick = () => {
        // using Java Script method to get PDF file
        fetch('paper_enroll_manual.pdf').then(response => {
            response.blob().then(blob => {
                // Creating new object of PDF file
                const fileURL = window.URL.createObjectURL(blob);
                // Setting various property values
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = 'paper_enroll_manual.pdf';
                alink.click();
            })
        })
    }
    const manual_book = () => {
        // using Java Script method to get PDF file
        fetch('คู่มือการขออนุญาตเป็นผู้ดำเนินการทดสอบ.pdf').then(response => {
            response.blob().then(blob => {
                // Creating new object of PDF file
                const fileURL = window.URL.createObjectURL(blob);
                // Setting various property values
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = 'คู่มือการขออนุญาตเป็นผู้ดำเนินการทดสอบ.pdf';
                alink.click();
            })
        })
    }

    


    //For permission access to website
    useEffect(() => {

        const token = localStorage.getItem("token")
        fetch('http://localhost:3000/authen', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
            .then(data => {
                if (data.status == "OK") {
                    // showAlert()
                } else {
                    alert("กรุณาทำการเข้าสู่ระบบ")
                    window.location = "/login"
                }
            });

    }, [])


    return (
        <Fragment>
            < Navbar_project />
            <Button onClick={onButtonClick} >Test_download_file</Button>
            <Button onClick={manual_book} >Text_book</Button>

        </Fragment>
    )
}

export default Homepage