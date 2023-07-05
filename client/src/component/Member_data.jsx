import { useEffect, useState } from 'react';
import * as React from 'react';
import axios from 'axios';
import Get_api from '../Api/Get_api';



//import component
import Navbar_project from './Navbar_project';

//For bootstrap kit
import { } from 'mdb-react-ui-kit';
import {
    MDBBadge,
    MDBBtn,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBIcon
} from 'mdb-react-ui-kit';







function Member_data() {

    const [member, setMember] = useState([])
    const [edit_status, setEdit_Status] = useState("")

    //Update function
    const status_allow = (id) => {

        axios.put('http://localhost:3000/update_status', {
            id: id,
            status: "รับการอนุมัติแล้ว",
        })
            .then(() => {
                setMember(member.map((users) => {
                    return users.id == id
                        ? {
                            id: users.id,
                            status: "รับการอนุมัติแล้ว"
                        }
                        : users
                }))
            })
        window.location.reload(false);
    }


    const status_not_allow = (id) => {

        axios.put('http://localhost:3000/update_status', {
            id: id,
            status: "ยังไม่ได้รับการอนุมัติ",
        })
            .then(() => {
                setMember(member.map((users) => {
                    return users.id == id
                        ? {
                            id: users.id,
                            status: "ยังไม่ได้รับการอนุมัติ"
                        }
                        : users
                }))
            })
        window.location.reload(false);
    }






    //MDB bootstrap
    const [staticModal, setStaticModal] = useState(false);
    const toggleShow = () => setStaticModal(!staticModal);

    //For allow accept
    const [staticModal_2, setStaticModal_2] = useState(false);
    const toggleShow_2 = () => setStaticModal_2(!staticModal_2);
    



    // Function delete member
    const deleteMember = (id) => {
        axios.delete(`http://localhost:3000/delete_member/${id}`).then((response) => {
            setMember(
                member.filter((val) => {
                    return val.id != id;
                })
            );
        });
    };


    //-----------------------------------------------------------------------------------------


    useEffect(() => {
        axios.get("http://localhost:3000/member_data").then((res) => {
            setMember(res.data)
        })
    }, [])




    return (
        <>
            <Navbar_project />
            <MDBTable align='middle'>
                <MDBTableHead>
                    <tr>
                        <th scope='col'>ID</th>
                        <th scope='col'>เลขบัตรประจำตัวประชาชน / ชื่อ / นามสกุล</th>
                        <th scope='col'>จังหวัด</th>
                        <th scope='col'>สิทธิ์การเข้าถึง</th>
                        <th scope='col'>สถานะ</th>
                        <th scope='col'>การจัดการ</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {member.map((val) => {
                        return (
                            <>
                                <tr key={val.id}>
                                    <td>{val.id}</td>
                                    <td>
                                        <div className='d-flex align-items-center'>
                                            <img
                                                src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                                                alt=''
                                                style={{ width: '45px', height: '45px' }}
                                                className='rounded-circle'
                                            />
                                            <div className='ms-3'>
                                                <p className='fw-bold mb-1'>เลขบัตรประจำตัวประชาชน: {val.id_card}</p>
                                                <p className='text-muted mb-0'>ชื่อ: {val.name} <span>นามสกุล: {val.lastname}</span></p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p className='fw-normal mb-1'>{val.province}</p>
                                    </td>
                                    <td>
                                        {val.permission}
                                    </td>

                                    <td>
                                        {val.status === "รับการอนุมัติแล้ว"
                                            ? (
                                                <>
                                                    <MDBBadge style={{ marginRight: "38px" }} color='success' pill>รับการอนุมัติแล้ว</MDBBadge>                                             
                                                </>
                                            )
                                            : (
                                                <>
                                                    <MDBBadge style={{ marginRight: "20px" }} color='danger' pill>ยังไม่ได้รับการอนุมัติ</MDBBadge>
                                                </>
                                            )
                                        }
                                    </td>
                                    <td>
                                        <MDBBtn color='link' rounded size='sm'>
                                            Edit
                                        </MDBBtn>
                                        <MDBBtn color='link' rounded size='sm' onClick={() => deleteMember(val.id)}>
                                            Delete
                                        </MDBBtn>
                                    </td>
                                </tr>
                            </>
                        )
                    })}
                </MDBTableBody>
            </MDBTable>
        </>
    )
}

export default Member_data