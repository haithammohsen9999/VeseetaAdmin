import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

import { db, auth } from '../../Firebase/Firebase';

import '../../index.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import changeUser from "../../store/Actions/user";
import changeShow from '../../store/Actions/show';
import { useTranslation } from 'react-i18next';
const Login = () => {

    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();

        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                console.log(user.auth.uid);
                localStorage.setItem('token', true);
                const user1 = JSON.stringify(user)
                localStorage.setItem('user',user1)
                dispatch(changeUser(user))
                dispatch(changeShow('d-block'))
                navigate('/home');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    };
let token = localStorage.getItem('token');

    useEffect(() => {
      if(token){
        navigate("/")
      }
    }, [token]);
    return (
        <>
            <div className=' min-vh-100  page-section d-flex align-items-center'>
                <div class="card text-center  " id="sin">
                    <div class="card-header" style={{ backgroundColor: "#0d6efd", color: "white" }}>
                        {t("signin")}
                    </div><br />
                    <div class="container py-5">
                        <form onSubmit={handleSubmit}>
                            <div class="form-group">
                                <label for="email" className='mb-2'>{t("item_email")}</label>
                                <sup style={{ color: "rgb(239, 15, 15)" }}>*</sup>

                                <input
                                    type="email"
                                    placeholder={t("item_email")}
                                    style={{ width: "75%", margin: "0 auto" }}
                                    className="form-control" id="email" name="email" required
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </div><br />

                            <div class="form-group " style={{ textAlign: "center" }}>
                                <label for="password" className='mb-2'>{t("password")}</label>
                                <sup style={{ color: "rgb(239, 15, 15)" }}>*</sup>
                               
                                <input
                                    type="password"
                                    placeholder={t("password")}
                                    style={{ width: "75%", margin: "0 auto" }} 
                                     className="form-control"
                                    id="password" name="password" required
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                                <br />
                                <button type="submit" class="btn btn-danger w-75 ">{t("sign")}</button>
                            </div><br />

                            <div class="d-flex justify-content-around">
                                <span class="form-check">
                                    <span class=""><input type="checkbox" class="form-check-input" id="remember"
                                        name="remember" /></span>
                                    <label class="form-check-label" for="remember">{t("remember")} </label>
                                </span>

                                <span><Link to='/forgetpassword' class="float-right">{t("forget")} </Link></span>
                            </div>
                    
                          
                        </form>
                    </div>

                </div>


            </div>
        </>
    );
}

export default Login;
