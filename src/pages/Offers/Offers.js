import * as React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar/Sidebar';
import style from './Offers.module.css';
import { useState, useEffect, useRef } from 'react';

import AddOffers from './../AddOffers/AddOffers';
import EditOffers from './../EditOffers/EditOffers';
import Swal from "sweetalert2";
import '../../index.css'
import { db, auth } from '../../Firebase/Firebase';
import { useSelector } from 'react-redux';
import ReactPaginate from "react-paginate";
import { useTranslation } from 'react-i18next';
const Offers = () => {


    const { t } = useTranslation();
    const [Offers, setOffers] = useState([])
    const [OffersId, setOffersId] = useState('')
    const user = useSelector(state => state.user.user);
    function afterDelete(message, icon) {
        Swal.fire({
            title: message,
            icon: icon,
            showConfirmButton: false,
            timer: 1500
        });
    }


    function DeleteAlert(id) {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                const OffersRef = db.collection('Offers').doc(id);
                OffersRef.delete()
                    .then(() => {
                        setOffers(Offers.filter(d => d.id !== id));
                        afterDelete("Offer deleted successfully.", "success");
                    })
                    .catch((error) => {
                        console.log(error);
                        afterDelete("Failed to delete Offer.", "error");
                    });
            }
        })
    }


    // const handleSubmit = async () => {
    //     try {
    //         await auth.signInWithEmailAndPassword("amanyasad88@gmail.com", "Amany@1234");

    //     } catch (error) {
    //         console.error(error);
    //     }
    // };



    const fetchOffers = async () => {

        // const user = auth.currentUser;
        console.log("user", user);
        if (user) {
            try {
                const OffersRef = db.collection('Offers');
                const OffersSnapshot = await OffersRef.get();
                const OffersData = OffersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

                console.log("Offers", OffersData);
                setOffers(OffersData);
            } catch (error) {
                console.log(error);
            }


        }
    };

    const [currentPage, setCurrentPage] = useState(0);
    let PER_PAGE = 5;
    let offset = currentPage * PER_PAGE;
    let currentPageData = Offers.slice(offset, offset + PER_PAGE).map((Offers, index) => {
        return (
           
            <>
            <tr key={index} className={`${style.tr_shadow}`}>
                <td>{index + 1}</td>
                <td>{Offers.SessionName}</td>


                <td><img className='rounded' src={Offers.ImgUrl} width={100} height={100} alt="" /></td>
                <td>{`${Offers.Available}`}</td>
                <td>{Offers.Price}&pound;</td>
                <td>{Offers.Discount}%</td>
                <td>
                    <div className="d-flex justify-content-around">
                        <Link className="item p-2" type='button' onClick={() => {
                            window.scrollTo(0, 0);
                            setOffersId(Offers.id);
                            let editOffers = document.getElementById("edit_offers");
                            editOffers.classList.remove("d-none");

                            let addOffers = document.getElementById("add_offers");
                            if (addOffers.classList.contains('d-none') === false) {
                                addOffers.classList.add("d-none");
                            }
                        }}>
                            <i className={`fa-solid fa-pen fs-6   ${style.text_creat}`} ></i>
                        </Link>

                        <form>
                            <Link type='button' className="item p-2"
                                onClick={() => {
                                    DeleteAlert(Offers.id)
                                }}>
                                <i className="fa-solid fa-trash fs-6 text-danger"></i>
                            </Link>
                        </form>
                    </div>
                </td>
            </tr>
        </>
        )
    });
    let pageCount = Math.ceil(Offers.length / PER_PAGE);

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }


    useEffect(() => {
        // handleSubmit();
        fetchOffers();
    }, []);


    console.log("Offers", Offers)

    return (
        <>

            <Sidebar />
            <section className='page-section py-2'>
                <div className='container px-3 min-vh-100' >
                    <div className='page_content'>
                        <div className="">
                            <div className="row justify-content-center mx-2">
                                <div className="col-lg-12 row my-4">
                                    <div className='col-6 p-0'>
                                        <h2 >{t("_offer")}</h2>
                                    </div>
                                    <div className={`${style.pull_right} col-6 p-0`}>
                                        <Link className={` btn ${style.btnCreate} float-end`} type="button" onClick={() => {
                                            let addOffers = document.getElementById("add_offers");
                                            addOffers.classList.remove("d-none");

                                            let editOffers = document.getElementById("edit_offers");
                                            if (editOffers.classList.contains('d-none') === false) {
                                                editOffers.classList.add("d-none");
                                            }
                                        }}>  + {t("one_offer")}</Link>
                                    </div>
                                    <br />
                                    <br />
                                </div>
                            </div>

                            <div id="add_offers" className='d-none'>
                                <AddOffers fetchData={fetchOffers} />
                            </div>



                            <div id="edit_offers" className='d-none'>
                                <EditOffers id={OffersId} fetchData={fetchOffers} />
                            </div>


                        </div>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-12">

                                    <div className="table-responsive table-responsive-data2" style={{ maxHeight: "100vh" }}>
                                        <table className={`table ${style.table_data2}  `} >
                                            <thead className={`${style.thead} text-white`}>
                                                <tr>
                                                    <th className='text-white'>{t("id")}</th>
                                                    <th className='text-white'>{t("item_name")} </th>
                                                    <th className='text-white'>{t("item_img")} </th>
                                                    <th className='text-white'>{t("item_available")} </th>
                                                    <th className='text-white'>{t("item_price")}  </th>
                                                    <th className='text-white'>{t("item_dicount")}   </th>



                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                               {currentPageData}


                                            </tbody>
                                        </table>
                                        <div className="w-75 mx-auto">

                                            <ReactPaginate
                                                nextLabel={t("next")}
                                                onPageChange={handlePageClick}
                                                pageRangeDisplayed={3}
                                                marginPagesDisplayed={2}
                                                pageCount={pageCount}
                                                previousLabel={t("prev")}
                                                pageClassName="page-item"
                                                pageLinkClassName="page-link"
                                                previousClassName="page-item"
                                                previousLinkClassName="page-link"
                                                nextClassName="page-item"
                                                nextLinkClassName="page-link"
                                                breakLabel="..."
                                                breakClassName="page-item"
                                                breakLinkClassName="page-link"
                                                containerClassName="pagination"
                                                activeClassName="active"
                                                renderOnZeroPageCount={null}
                                            />


                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Offers;


