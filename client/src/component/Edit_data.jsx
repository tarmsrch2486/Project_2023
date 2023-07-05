import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

//Import api
import Get_api from '../Api/Get_api'

//Axios
import axios from 'axios'

import Navbar_project from './Navbar_project'



function Edit_data() {

    const { id } = useParams()
    const [select_Data, setSelect_Data] = useState([])
    const [getCountry, setGetCountry] = useState([])

    //State for checking error
    const [error, setError] = useState(false)

    //For newstate get data
    const [newname, setNewname] = useState("")
    const [newage, setNewage] = useState(0)
    const [newcountry, setNewcountry] = useState("")
    const [newposition, setNewposition] = useState("")
    const [newwage, setNewwage] = useState(0)


    //Update function
    const update_data = (id) => {

        //For Checking value empthy in the form
        if (!newname || !newage || !newcountry || !newposition || !newwage) {
            setError(true)
            return false
        }

        axios.put('http://localhost:3000/update', {
            id: id,
            wage: newwage,
            name: newname,
            age: newage,
            country: newcountry,
            position: newposition,
        })
            .then(() => {
                setSelect_Data(select_Data.map((users) => {
                    return users.id == id
                        ? {
                            id: users.id,
                            name: newage,
                            age: newage,
                            country: newcountry,
                            position: newposition,
                            wage: newwage
                        }
                        : users
                }))
            })
        window.location.reload(false);  
    }



    //For function bootstap 5
    const [validated, setValidated] = useState(false);

    const handleSubmit_bt = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };



    //UseEffect function
    useEffect(() => {
        axios.get(`http://localhost:3000/employee/${id}`).then((res) => {
            setSelect_Data(res.data)
        }),
        Get_api.get("/get_country").then((res) => {
            setGetCountry(res.data)
        })
    }, [])



    return (
        <>
        < Navbar_project/>
        <div className="container mx-auto px-20">
            
                {select_Data.map((data) => {
                    return (
                        <>

                            <div key={data.id}>
                                {/* name */}
                                <div class="mb-6">
                                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                                    <input type="text" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder={data.name}
                                        onChange={(e) => setNewname(e.target.value)} />


                                    {/* Validation */}
                                    {error && !newname &&
                                        <div>
                                            <p id="outlined_error_help" class="mt-2 text-xs text-red-600 dark:text-red-400"><span class="font-medium">ข้อมูลไม่ถูกต้อง</span> กรุณากรอกข้อมูล</p>
                                        </div>
                                    }
                                </div>



                                {/* Age */}
                                <div class="mb-6">
                                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Age</label>
                                    <input type="number" id="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                        onChange={(e) => setNewage(e.target.value)} placeholder={data.age}  />


                                    {/* Validation */}
                                    {error && !newage &&
                                        <div>
                                            <p id="outlined_error_help" class="mt-2 text-xs text-red-600 dark:text-red-400"><span class="font-medium">ข้อมูลไม่ถูกต้อง</span> กรุณากรอกข้อมูล</p>
                                        </div>
                                    }

                                </div>



                                {/* COuntry */}
                                <div class="mb-6">
                                    <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                                    <select onChange={(e) => setNewcountry(e.target.value)} id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected>Choose a country</option>
                                        {getCountry.map((country) => {
                                            return (
                                                <>
                                                    <option key={country.id} value={country.name}>{country.name}</option>
                                                </>
                                            )
                                        })}
                                    </select>


                                    {/* Validation */}
                                    {error && !newcountry &&
                                        <div>
                                            <p id="outlined_error_help" class="mt-2 text-xs text-red-600 dark:text-red-400"><span class="font-medium">ข้อมูลไม่ถูกต้อง</span> กรุณากรอกข้อมูล</p>
                                        </div>
                                    }
                                </div>



                                {/* Position */}
                                <div class="mb-6">
                                    <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Position</label>
                                    <input type="text" id="repeat-password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                        placeholder={data.position} onChange={(e) => setNewposition(e.target.value)}  />

                                    
                                    {/* Validation */}
                                    {error && !newposition &&
                                        <div>
                                            <p id="outlined_error_help" class="mt-2 text-xs text-red-600 dark:text-red-400"><span class="font-medium">ข้อมูลไม่ถูกต้อง</span> กรุณากรอกข้อมูล</p>
                                        </div>
                                    }
                                </div>


                                {/* Wage */}
                                <div class="mb-6">
                                    <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Wage</label>
                                    <input type="number" id="repeat-password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                        placeholder={data.wage} onChange={(e) => setNewwage(e.target.value)}  />
                                    
                                    
                                    {/* Validation */}
                                    {error && !newwage &&
                                        <div>
                                            <p id="outlined_error_help" class="mt-2 text-xs text-red-600 dark:text-red-400"><span class="font-medium">ข้อมูลไม่ถูกต้อง</span> กรุณากรอกข้อมูล</p>
                                        </div>
                                    }
                                </div>

                                <button onClick={() => update_data(data.id)} type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">อัพเดตข้อมูล</button>
                            </div>
                        </>
                    )
                })}
            
            
        </div>
        </>

    )
}

export default Edit_data