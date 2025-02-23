import * as React from 'react';
import { useState } from 'react';
import style from './AddDoctor.module.css';

import Swal from "sweetalert2";

import { db, auth } from '../../Firebase/Firebase';
import { collection, addDoc } from "firebase/firestore";

function AddDoctor(props) {


    const [data, setData] = useState(null);
    const [Name, setName] = useState('');
    const [ImgUrl, setImgUrl] = useState('');
    const [Speciality, setSpeciality] = useState('');
    const [City, setCity] = useState('');
    const [Phone, setPhone] = useState();
    const [Waitingtime, setWaitingtime] = useState();
    const [Rate, setRate] = useState();
    const [location, setLocation] = useState();
    const [ExaminationFees, setExaminationFees] = useState();
    const [Availability, setAvailability] = useState();
    const [About, setAbout] = useState();


    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const docRef = await addDoc(collection(db, "Doctor"), { Name, Speciality, Phone, ImgUrl, City });
            console.log("Document written with ID: ", docRef.id);
            let addDoctor = document.getElementById("add_Doctor");
            showAlert("Doctor added successfully", "success")
            addDoctor.classList.add("d-none");
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        e.target.reset();
    };
    function showAlert(message, icon) {
        Swal.fire({
            title: message,
            icon: icon,
            showConfirmButton: false,
            timer: 2000
        });
    }


    function close(e) {
        e.preventDefault();
        let addDoctor = document.getElementById("add_Doctor");
        addDoctor.classList.add("d-none");
    }


    return (
        <>

            <div className={`${style.contain}`}>
                <div className="row justify-content-center  mx-1 mb-5">
                    <div className="col-lg-12 mb-4">
                        <div className={` ${style.pull_left}`}>
                            <h2>Add Doctor</h2>
                        </div>
                    </div>

                    <form className={`${style.create_accont}`} onSubmit={handleFormSubmit}>

                        <div className="row">
                            <div className={` col-12 `}>
                                <button className={`${style.pull_right} outline-none fa-solid fa-square-xmark fs-4  text-danger`} style={{ border: "none" }} onClick={close}> </button>
                            </div>

                            <div className="col-lg-6  mb-3">
                                <div className="form-group">
                                    <strong className='d-block mb-2'>Doctor Name:</strong>
                                    <input type="text"
                                        onChange={(e) => {
                                            setName(e.target.value);
                                        }}
                                        className="form-control" placeholder="Doctor Name" />

                                </div>
                            </div>
                            <div className="col-lg-6  mb-3">
                                <div className="form-group">
                                    <strong className='d-block mb-2'>Doctor Speciality:</strong>
                                    <input type="text"
                                        onChange={(e) => {
                                            setSpeciality(e.target.value);
                                        }}
                                        className="form-control" placeholder="Doctor Speciality" />

                                </div>
                            </div>
                            <div className="col-lg-6  mb-3">
                                <div className="form-group">
                                    <strong className='d-block mb-2'>Doctor City:</strong>
                                    <input type="text"
                                        onChange={(e) => {
                                            setCity(e.target.value);
                                        }}
                                        className="form-control" placeholder="Doctor City" />

                                </div>
                            </div>
                            <div className="col-lg-6  mb-3">
                                <div className="form-group">
                                    <strong className='d-block mb-2'>Doctor Phone:</strong>
                                    <input type="text"
                                        onChange={(e) => {
                                            setPhone(e.target.value);
                                        }}
                                        className="form-control" placeholder="Doctor Phone" />

                                </div>
                            </div>
                            <div className="col-lg-6  mb-3">
                                <div className="form-group">
                                    <strong className='d-block mb-2'>Doctor Image URL:</strong>
                                    <input type="text"
                                        onChange={(e) => {
                                            setImgUrl(e.target.value);
                                        }}
                                        className="form-control" placeholder="Doctor Image URl" />

                                </div>
                            </div>
                            <div className="col-lg-6  mb-3">
                                <div className="form-group">
                                    <strong className='d-block mb-2'>Location:</strong>
                                    <input type="text"
                                        onChange={(e) => {
                                            setLocation(e.target.value);
                                        }}
                                        className="form-control" placeholder="Location" />

                                </div>
                            </div>
                            <div className="col-lg-6  mb-3">
                                <div className="form-group">
                                    <strong className='d-block mb-2'>ExaminationFees:</strong>
                                    <input type="text"
                                        onChange={(e) => {
                                            setExaminationFees(e.target.value);
                                        }}
                                        className="form-control" placeholder="ExaminationFees" />

                                </div>
                            </div>
                            <div className="col-lg-6  mb-3">
                                <div className="form-group">
                                    <strong className='d-block mb-2'>Rate:</strong>
                                    <input type="text"
                                        onChange={(e) => {
                                            setRate(e.target.value);
                                        }}
                                        className="form-control" placeholder="Rate" />

                                </div>
                            </div>
                            <div className="col-lg-6  mb-3">
                                <div className="form-group">
                                    <strong className='d-block mb-2'>Waitingtime:</strong>
                                    <input type="text"
                                        onChange={(e) => {
                                            setWaitingtime(e.target.value);
                                        }}
                                        className="form-control" placeholder="Waitingtime" />

                                </div>
                            </div>
                            <div className="col-lg-6  mb-3">
                                <div className="form-group">
                                    <strong className='d-block mb-2'>Availability:</strong>
                                    <input type="text"
                                        onChange={(e) => {
                                            setAvailability(e.target.value);
                                        }}
                                        className="form-control" placeholder="Availability" />

                                </div>
                            </div>
                            <div className="col-12  mb-3">
                                <div className="form-group">
                                    <strong className='d-block mb-2'>About:</strong>
                                    <input type="text"
                                        onChange={(e) => {
                                            setAbout(e.target.value);
                                        }}
                                        className="form-control" placeholder="About" />

                                </div>
                            </div>



                            <div className="col-xs-12 col-sm-12 col-md-12 text-center">
                                <button type="submit" className={`btn ${style.btnCreate} mb-3`}>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddDoctor;


