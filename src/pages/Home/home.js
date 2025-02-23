import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './home.module.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { db, auth } from '../../Firebase/Firebase';
import BarChart from '../../Components/BarChart/BarChart';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import '../../index.css'
const Home = () => {

  const { t } = useTranslation();
  const [info, setInfo] = useState([{}])
  const [city, setcity] = useState({ "Name": "Cities", "Number": 0 })
  const [speasiality, setspeasiality] = useState({ "Name": "Speaciality", "Number": 0 })
  const [doctors, setdoctors] = useState({ "Name": "Doctors", "Number": 0 })
  const [users, setusers] = useState({ "Name": "Users", "Number": 0 })
  const [offers, setoffers] = useState({ "Name": "Offers", "Number": 0 })
  const user = useSelector(state => state.user.user);



  //   const handleSubmit = async () => {
  //     try {
  //         await auth.signInWithEmailAndPassword("amanyasad88@gmail.com", "Amany@1234");

  //     } catch (error) {
  //         console.error(error);
  //     }
  // };







  const fetchInfo = async () => {
    let allinfo = [];
    // const user = auth.currentUser;
    console.log("user", user);
    if (user) {
      try {
        const OffersRef = db.collection('Offers');
        const OffersSnapshot = await OffersRef.get();
        const OffersData = OffersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const CityRef = db.collection('City');
        const CitySnapshot = await CityRef.get();
        const CityData = CitySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const SpeacialityRef = db.collection('Speciality');
        const SpeacialitySnapshot = await SpeacialityRef.get();
        const SpeacialityData = SpeacialitySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const DoctorRef = db.collection('Doctor');
        const DoctorSnapshot = await DoctorRef.get();
        const DoctorData = DoctorSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const UserRef = db.collection('Users');
        const UserSnapshot = await UserRef.get();
        const UserData = UserSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log("Offers", OffersData);
        setcity({ "Name": "City", "Number": CityData.length })
        setspeasiality({ "Name": "Speaciality", "Number": SpeacialityData.length })
        setdoctors(({ "Name": "Doctors", "Number": DoctorData.length }))
        setusers({ "Name": "Users", "Number": UserData.length })
        setoffers({ "Name": "Offers", "Number": OffersData.length })

        setInfo(allinfo)
      } catch (error) {
        console.log(error);
      }


    }
  };


  console.log("info", info)
  useEffect(() => {

    // handleSubmit()
    fetchInfo()



  }, [])


  return (

    <>
      <Sidebar />
      <section className='page-section'>
        <div className="  container my-5 min-vh-100 overflow-auto" >

          <div className='mt-5 '>
            <div className='row my-5'>
              <div className='col-lg-4 my-3 '>
                <div className="card" style={{ backgroundColor: "rgb(80, 143, 244)", color: "#fff" }}>
                  <div className="card-body">
                    <h5 className="card-title text-danger">{t("_doctor")}</h5>
                    <div className='d-flex justify-content-between'><h6 className="card-subtitle mb-2 ">{t("num_doctor")}</h6> <h6 className="card-subtitle mb-2 ">{doctors.Number}</h6></div>
                    <Link to="/doctor" className="card-link text-decoration-none text-white">{t("go_doctor")}</Link>

                  </div>
                </div>
              </div>
              <div className='col-lg-4 my-3 '>
                <div className="card" >
                  <div className="card-body" style={{ backgroundColor: "rgb(255, 191, 67)", }}>
                    <h5 className="card-title">{t("_city")}</h5>
                    <div className='d-flex justify-content-between'><h6 className="card-subtitle mb-2 text-muted">{t("num_city")} </h6> <h6 className="card-subtitle mb-2 text-muted">{city.Number}</h6></div>
                    <Link to="/cities" className="card-link text-decoration-none">{t("go_city")}</Link>

                  </div>
                </div>
              </div>
              <div className='col-lg-4 my-3 '>
                <div className="card" style={{ backgroundColor: "rgb(75, 230, 157)" }}>
                  <div className="card-body">
                    <h5 className="card-title">{t("_offer")}</h5>
                    <div className='d-flex justify-content-between'><h6 className="card-subtitle mb-2 text-muted">{t("num_offer")} </h6> <h6 className="card-subtitle mb-2 text-muted">{offers.Number}</h6></div>
                    <Link to="/offers" className="card-link text-decoration-none">{t("go_offer")}</Link>

                  </div>
                </div>
              </div>
              <div className='col-lg-4 my-3 '>
                <div className="card" style={{ backgroundColor: "rgb(146, 103, 255)" }}>
                  <div className="card-body">
                    <h5 className="card-title">{t("_speaciality")}</h5>
                    <div className='d-flex justify-content-between'><h6 className="card-subtitle mb-2 text-white">{t("num_speaciality")} </h6> <h6>{speasiality.Number}</h6></div>
                    <Link to="/speaciality" className="card-link text-decoration-none text-white">{t("go_speaciality")}</Link>

                  </div>
                </div>
              </div>
              <div className='col-lg-4 my-3 '>
                <div className="card" >
                  <div className="card-body" style={{ backgroundColor: "#f699e0", color: "white" }}>
                    <h5 className="card-title">{t("_user")}</h5>
                    <div className='d-flex justify-content-between'><h6 className="card-subtitle mb-2 text-muted">{t("num_user")} </h6> <h6 className="card-subtitle mb-2 text-muted">{users.Number}</h6></div>
                    <Link to="/users" className="card-link text-decoration-none text-white">{t("go_user")}</Link>

                  </div>
                </div>
              </div>
              {/* <div className='col-lg-4 my-3 '>
    <div className="card" >
    <div className="card-body" style={{backgroundColor:"#99f6ca"}}>
        <h5 className="card-title">Pharmacies</h5>
        <div  className='d-flex justify-content-between'><h6 className="card-subtitle mb-2 text-muted">Number Of Pharmacies </h6> <h6>150</h6></div>
        <Link to="#" className="card-link text-decoration-none">Go To Pharmacies</Link>
       
      </div>
    </div>
  </div> */}


            </div>

            <div className='row my-5'>
              <div className='col-lg-6'>
                <BarChart />

              </div>

            </div>
          </div>



        </div>
      </section>

    </>
  );
}

export default Home;
