import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

//APi
import Get_api from '../Api/Get_api';
//Router
import { Link } from 'react-router-dom';

import Navbar_project from './Navbar_project';




function Show_data() {

    const [data, setData] = useState([])
    const [show_permission, setShow_Permission] = useState("")

    // Function delete member
    const deleteEmployee = (id) => {
        axios.delete(`http://localhost:3000/delete/${id}`).then((response) => {
            setData(
                data.filter((val) => {
                    return val.id != id;
                })
            );
        });
    };



    //This function Call api from the database
    useEffect(() => {
        Get_api.get("all_employee").then((res) => {
            setData(res.data)
        })

        const token = localStorage.getItem("token")
        const permission = localStorage.getItem("permission")
        fetch('http://localhost:3000/authen', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
            .then(data => {
                if (data.status == "OK") {
                    console.log(data.status)
                } else {
                    alert("กรุณาทำการเข้าสู่ระบบ")
                    window.location = "/login"
                }
            });

        setShow_Permission(permission)
    }, [])

    // console.log(check_token)






    return (
        <div>
            < Navbar_project />
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">

                    {show_permission === 'admin' || 'sub_admin'
                        ? <>
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        ID
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Age
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Country
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Position
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Wage
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Permission
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Manage
                                    </th>
                                    {/* <th scope="col" class="px-6 py-3">
                                                <span class="sr-only">Manage</span>
                                            </th> */}
                                </tr>
                            </thead>
                            {data.map((val) => {
                                return (
                                    <>
                                        <tbody>
                                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {val.id}
                                                </th>
                                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {val.name}
                                                </th>
                                                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {val.age}
                                                </td>
                                                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {val.country}
                                                </td>
                                                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {val.position}
                                                </td>
                                                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {val.wage}
                                                </td>
                                                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {val.permission}
                                                </td>

                                                <td class="px-6 py-4 ">
                                                    <Link to={`/edit_data/${val.id}`}>
                                                        <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                                                            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                                Edit
                                                            </span>
                                                        </button>
                                                    </Link>
                                                    <button onClick={() => deleteEmployee(val.id)} class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
                                                        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                            Remove
                                                        </span>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody >
                                    </>
                                )
                            })
                            }
                        </>

                        : <>
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        ID
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Age
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Country
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Position
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Wage
                                    </th>
                                </tr>
                            </thead>
                            {data.map((val) => {
                                return (
                                    <>

                                        <tbody>
                                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {val.id}
                                                </th>
                                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {val.name}
                                                </th>
                                                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {val.age}
                                                </td>
                                                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {val.country}
                                                </td>
                                                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {val.position}
                                                </td>
                                                <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {val.wage}
                                                </td>
                                            </tr>
                                        </tbody >
                                    </>
                                )
                            })
                            }
                        </>}


                </table>
            </div>

        </div >
    )
}

export default Show_data