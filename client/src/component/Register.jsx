import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import axios from 'axios'



//Api
import Get_api from '../Api/Get_api'


function Register() {

    //Old data
    const [data, setData] = useState([])

    //For show provinces
    const [show_provinces, setShow_provinces] = useState([])


    //Storage data from input box
    const [id_card, setId_card] = useState('')
    const [prefix, setPrefix] = useState('') //คำนำหน้า
    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [province, setProvince] = useState('')
    const [pwd1, setPwd1] = useState('')
    const [pwd2, setPwd2] = useState('')

    const [test, setTest] = useState([])
    const [error, setError] = useState(false)
    const [data_error, setData_error] = useState(false)




    //The Function for Creating member
    const create_member = () => {

        if (!id_card || !prefix || !name || !lastname || !province || !pwd1 || !pwd2) {
            setData_error(true)
            return false
        }

        //Check condition for pwd-1 and pwd-2
        if (pwd1 != pwd2) {
            setError(true)
            return false
        }


        axios.post("http://localhost:3000/create_member", {
            id_card: id_card,
            name: name,
            lastname: lastname,
            prefix: prefix,
            province: province,
            pwd1: pwd1,
            pwd2: pwd2,
        }).then(() => {
            setData([...data, {
                id_card: id_card,
                name: name,
                lastname: lastname,
                prefix: prefix,
                province: province,
                pwd1: pwd1,
                pwd2: pwd2,
            }])
        })

        window.location.reload(false);
    }



    //Get_provinces for show on selection
    const Get_provinces = () => {
        axios.get("http://localhost:3000/provinces").then((res_provinces) => {
            setShow_provinces(res_provinces.data)
        })
    }

    return (
        <div className=''>
            <div className="flex h-full bg-gray-200 items-center justify-center">
                <div className="grid bg-white rounded-lg shadow-xl w-11/12 md:w-9/12 lg:w-1/2 mt-10">

                    <div className="flex justify-center">
                        <div className="flex">
                            <h1 className="text-gray-600 font-bold md:text-2xl text-xl mt-10">ลงทะเบียนสมาชิก</h1>
                        </div>
                    </div>


                    {/* id card */}
                    <div className="grid grid-cols-1 mt-5 mx-7">
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">เลขบัตรประจำตัวประชาชน (ID card)
                            <span style={{ color: "red" }}> *</span></label>
                        <input onChange={(e) => setId_card(e.target.value)} className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" type="text" placeholder="เลขบัตรประจำตัวประชาชน (ID card)" />
                    </div>


                    {/* คำนำหน้าชื่อ */}
                    <div className="grid grid-cols-1 mt-5 mx-7">
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">คำนำหน้าชื่อ
                            <span style={{ color: "red" }}> *</span></label>
                        <div className="flex" onChange={(e) => setPrefix(e.target.value)}>
                            <div className="flex items-center mr-4">
                                <input id="inline-radio" type="radio" value="นาย" name="inline-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label for="inline-radio" className="ml-2 text-sm font-medium text-gray-900 dark:text-dark">นาย</label>
                            </div>
                            <div className="flex items-center mr-4">
                                <input id="inline-radio" type="radio" value="นางสาว" name="inline-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label for="inline-radio" className="ml-2 text-sm font-medium text-gray-900 dark:text-dark">นางสาว</label>
                            </div>
                            <div className="flex items-center mr-4">
                                <input id="inline-radio" type="radio" value="นาง" name="inline-radio-group" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label for="inline-radio" className="ml-2 text-sm font-medium text-gray-900 dark:text-dark">นาง</label>
                            </div>


                        </div>
                    </div>


                    {/* Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
                        <div className="grid grid-cols-1">
                            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"> ชื่อ
                                <span style={{ color: "red" }}> *</span></label>
                            <input onChange={(e) => setName(e.target.value)} className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" type="text" placeholder="ชื่อ" />
                        </div>


                        {/* lastname */}
                        <div className="grid grid-cols-1">
                            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">นามสกุล
                                <span style={{ color: "red" }}> *</span></label>
                            <input onChange={(e) => setLastname(e.target.value)} className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" type="text" placeholder="นามสกุล" />
                        </div>
                    </div>


                    {/* province */}
                    <div className="grid grid-cols-1 mt-5 mx-7">
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">จังหวัดที่่ทำการออกบัตรประชาชน
                            <span style={{ color: "red" }}> *</span></label>
                        <select onClick={Get_provinces()} onChange={(e) => setProvince(e.target.value)} className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                            <option>จังหวัดที่่ทำการออกบัตรประชาชน</option>
                            {show_provinces.map((data) => {
                                return (
                                    <option key={data.id}>{data.name_th}</option>
                                )
                            })}

                        </select>
                    </div>


                    {/* pwd1 */}
                    <div className="grid grid-cols-1 mt-5 mx-7">
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">รหัสผ่าน
                            <span style={{ color: "red" }}> *</span></label>
                        <input onChange={(e) => setPwd1(e.target.value)} className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" type="password" placeholder="**********" />
                    </div>


                    {/* pwd 2 */}
                    <div className="grid grid-cols-1 mt-5 mx-7">
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark">ยืนยันรหัสผ่าน
                            <span style={{ color: "red" }}> *</span></label>
                        <input onChange={(e) => setPwd2(e.target.value)} className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" type="password" placeholder="**********" />
                    </div>

                    {error
                        ? <h1>Password didn't match</h1>
                        : null}

                    <div className='flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5'>
                        <button type="submit" onClick={create_member} className='w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2'>ลงทะเบียนสมาชิก</button>

                        
                        <Link to="/login">
                            <button className='w-auto bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white px-4 py-2'>ยกเลิก</button>
                        </Link>


                    </div>

                </div>
            </div>

        </div>
    )
}

export default Register