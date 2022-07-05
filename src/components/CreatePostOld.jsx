import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { FaImages, FaSpinner } from 'react-icons/fa'
import { ImSpinner7 } from 'react-icons/im'
import fixedPrice from '../assets/img/fixed-price.png'
import limitedAuction from '../assets/img/limited-auction.png'
import Openbids from '../assets/img/open-bids.png'
import Web3 from "web3";
import { BiLoaderCircle } from 'react-icons/bi'
import { MINT_CONTACT_ADDRESS, MINT_Abi } from '../contract/mint';
// import { MINT_CONTACT_ADDRESS, MINT_Abi } from '../contract/artabiamint';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'moment';



import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';

// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// import { BallTriangle } from  'react-loader-spinner'

import axios from 'axios';
require('dotenv').config()


const web3_Stake = new Web3(window.ethereum);
const MintABiWthiCONTRACT = new web3_Stake.eth.Contract(MINT_Abi, MINT_CONTACT_ADDRESS);
// console.log("MintABiWthiCONTRACT", MintABiWthiCONTRACT)
// var BASE_URL = "http://148.72.244.170:5001"
var BASE_URL = process.env.REACT_APP_BASE_URL
console.log("API_URL", BASE_URL)

// console.log("API_URL", process.env.REACT_APP_BASE_URL)


function CreatePost() {
    // const [createNFT, setcreateNFT] = useState('');
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [chain, setChain] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImageType] = useState('');
    const [royalty, setRoyalty] = useState('');
    const [priceInput, setPriceInput] = useState(false)
    const [price, setPrice] = useState("0.002");
    const [auctionInput, setAuctionInput] = useState(false)
    const [Unlockable, setUnlockable] = useState("");
    const [imageprev, setImageprev] = useState("");
    const [isActivePrice, setIsActivePrice] = useState(false)
    const [isActiveAuction, setIsActiveAuction] = useState(false)
    const [loading, setLoading] = useState(false)
    const [mint_type, setMintType] = useState('');
    const [auctionDate, setAuctionDate] = useState('');
    const userDetail = JSON.parse(sessionStorage.getItem('user'))

    let navigate = useNavigate()

    function toTimestamp(strDate) {
        var datum = Date.parse(strDate);
        return datum / 1000;
    }

    const startDate = new Date()

    const [currentDate, setCurrentDate] = useState(startDate)
    console.log("currentDate", currentDate)

    const auction_date = Moment(currentDate).format('DD MMMM YYYY h:mm A')
    const aucation_timestamp = toTimestamp(auction_date)
    console.log("formatDate", auction_date)

    console.log("aucation_timestamp", aucation_timestamp);

    const handleChange = (date) => {
        setCurrentDate(date)
    }

    var loginUserAdd = sessionStorage.getItem("loginUserAdd");
    console.log("loginUserAddress1loginUserAddress1", loginUserAdd);

    useEffect(() => {
        $("#royltycheck").hide();
        $("#pricecheck").hide();
        $("#namecheck").hide();
        $("#descriptioncheck").hide();

        const userDetail = JSON.parse(sessionStorage.getItem('user'))
        if (userDetail == "" || userDetail == null) {
            navigate("/")
        }
    })

    $(".validate").focus(function () {
        $("#royltycheck").hide();
        $("#pricecheck").hide();
        $("#namecheck").hide();
        $("#descriptioncheck").hide();

    })

    //  ================ Create NFT ======================
    const createnft = async () => {

        // var user_id = JSON.parse(sessionStorage.getItem("user")).user.id
        // console.log("useridddd", user_id)

        var date = Date.now()
        console.log("date", date)

        var imagetype = image.type

        if (!royalty) {
            $("#royltycheck").show();
        }
        if (!name) {
            $("#namecheck").show();
        }
        if (!description) {
            $("#descriptioncheck").show();
        }
        if (priceInput && !price) {
            $("#pricecheck").show();
        }

        if (royalty && name && description) {
            console.log("rahulUng", image)
            const formData = new FormData();
            // formData.append("image", image);

            if (mint_type == 1) {
                var tokens = Web3.utils.toWei(price.toString(), 'ether')
                var bntokens = Web3.utils.toBN(tokens)
                // setLoading(true)
                document.getElementById("overlay").style.display = "block";

                MintABiWthiCONTRACT.methods.MintFixedNFT(name, category, description, image, bntokens, royalty)
                    .send({
                        from: loginUserAdd,
                        gas: 3000000
                    }).on('error', function (error) {
                        console.log("error", error)
                        toast.error('Your mint nft failed !', {
                            position: "top-center",
                            theme: "colored",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        document.getElementById("overlay").style.display = "none";

                    }).then(async function (info) {
                        console.log('success ', info);

                        var token_id = info.events.Transfer.returnValues.tokenId
                        var transaction_id = info.transactionHash
                        // nftdata.tokenAddress = info.events.Transfer.address //contract_address

                        formData.append("image", image, image.name);
                        formData.append("name", name);
                        formData.append("description", description);
                        formData.append("chain", chain);
                        formData.append("category", category);
                        formData.append("royalty", royalty);
                        formData.append("price", price);
                        formData.append("user_id", loginUserAdd);
                        formData.append("mint_type", mint_type);
                        formData.append("auction_date", auction_date);
                        formData.append("token_id", token_id);
                        formData.append("transaction_id", transaction_id);

                        var creat_mint = await axios.post(`${BASE_URL}/single_mint`, formData)

                        console.log("dataaaa", creat_mint)
                        console.log("dataaaa", creat_mint.data.status)
                        console.log("dataaaa", creat_mint.data.result.create_mint_id)

                        var mint_id = creat_mint.data.result.create_mint_id;
                        // console.log("dataaaa", creat_mint.status)

                        if (creat_mint.status == 200) {
                            toast.success('NFT Mint Successfully !', {
                                position: "top-center",
                                theme: "colored",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                            document.getElementById("overlay").style.display = "none";
                            setTimeout(() => {
                                navigate(`/prod_detail?id=${mint_id}`)
                            }, 5000)
                        }

                    }).catch((err) => {
                        console.log('eror ', err);
                    })
            } else if (mint_type == 2) {
                var tokens = Web3.utils.toWei(price.toString(), 'ether')
                var bntokens = Web3.utils.toBN(tokens)
                // setLoading(true)
                document.getElementById("overlay").style.display = "block";

                MintABiWthiCONTRACT.methods.mintAuctionLength(name, category, description, image, bntokens, aucation_timestamp, royalty)
                    .send({
                        from: loginUserAdd,
                        gas: 3000000
                    }).on('error', function (error) {
                        console.log("error", error)
                        toast.error('Your mint nft failed !', {
                        position: "top-center",
                        theme: "colored",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                        document.getElementById("overlay").style.display = "none";

                    }).then(async function (info) {
                        console.log('success ', info);

                        var token_id = info.events.Transfer.returnValues.tokenId
                        var transaction_id = info.transactionHash
                        // nftdata.tokenAddress = info.events.Transfer.address //contract_address

                        formData.append("image", image, image.name);
                        formData.append("name", name);
                        formData.append("description", description);
                        formData.append("chain", chain);
                        formData.append("category", category);
                        formData.append("royalty", royalty);
                        formData.append("price", price);
                        formData.append("user_id", loginUserAdd);
                        formData.append("mint_type", mint_type);
                        formData.append("auction_date", auction_date);
                        formData.append("token_id", token_id);
                        formData.append("transaction_id", transaction_id);

                        var creat_mint = await axios.post(`${BASE_URL}/single_mint`, formData)

                        var mint_id = creat_mint.data.result.create_mint_id;
                        console.log("dataaaa", creat_mint.status)

                        if (creat_mint.status == 200) {
                            toast.success('NFT Mint Successfully !', {
                                position: "top-center",
                                theme: "colored",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                            // setLoading(false)
                            document.getElementById("overlay").style.display = "none";
                            setTimeout(() => {
                                navigate(`/prod_detail?id=${mint_id}`)
                            }, 5000)
                        }

                    }).catch((err) => {
                        console.log('eror ', err);
                    })
            }

        }

    }


    /*Unlock Purchase */
    const [showPurched, setShowPurched] = useState(false)
    const showPurchedBox = () => {
        setShowPurched(!showPurched)
    }

    /*Market place */

    const [showMarketPlace, setShowMarketPlace] = useState(false)
    const showMarketPlaceBox = () => {
        setShowMarketPlace(!showMarketPlace)
        console.log("showMarketPlace", showMarketPlace)

    }


    const showPriceinput = () => {
        setPriceInput(true)
        setIsActivePrice(true)
        setAuctionInput(false)
        setIsActiveAuction(false)
        setMintType(1);
    }

    const showAuctioninput = () => {
        setAuctionInput(true)
        setIsActiveAuction(true)
        setPriceInput(false)
        setIsActivePrice(false)
        setMintType(2)
    }

    return (
        <div>
            <div id="overlay" >
                <div className='loader_spiner'>
                    <ImSpinner7 />
                </div>
            </div>
            <Header />
            <section className='create_post_section'>
                <Container>

                    <Row>

                        <Col className='Heading-Txt'>
                            <Link to='/Create' className='GoBack_btn fw-bold'><FaArrowLeft className='back-icon' />  Go Back</Link>

                            <h2 className="fw-bold mb-3 mt-3">Create Post</h2>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={6} md={6}>
                            <span>Upload image</span>

                            <div className='card p-4 mt-3 text-center' style={{ border: "2px dashed" }}>
                                <div className="card-body customCardBody">
                                    <FaImages className='fs-1 mb-3' />

                                    <p>or drag and drop</p>

                                    <div className="my-4"><small>JPG, PNG, GIF, SVG, MP4, WEBP, MP3, WAV, OGG, GLB, GLTF <br></br> Up to 250MB</small></div>

                                    <Form.Control type="file" className="uploadPostImage" onChange={(e) => {
                                        setImageType(e.target.files[0]);
                                        setImageprev(URL.createObjectURL(e.target.files[0]));
                                    }
                                    } />
                                </div>
                            </div>


                        </Col>

                        <Col lg={6} md={6}>
                            <strong>Preview</strong>
                            <div className="card mt-3 img_preview" style={{ height: "270px" }}>
                                <div className="">
                                    {imageprev ?
                                        <img src={imageprev} alt="profile_pic" className='img-fluid ' />
                                        :
                                        <div></div>
                                    }

                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row>

                        <Col lg={6}>
                            <div className='form-section'>

                                <Form.Group className="mt-4 mb-3" controlId="formBasicEmail">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="" onChange={(e) => setName(e.target.value)} />
                                    <small className='required-text'
                                    >* Required</small>
                                    <p className='required-text' id="namecheck">Please Enter Name </p>

                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        placeholder=""
                                        style={{ height: '100px' }}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                    <small className='required-text'>* Required</small>
                                    <p className='required-text' id="descriptioncheck">Please Enter Description </p>

                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Chain</Form.Label>
                                    <Form.Select aria-label="Floating label select example" onChange={(e) => setChain(e.target.value)}>

                                        <option value="" selected>Select Chain</option>
                                        <option value="ETH">Ethereum</option>
                                        <option value="BNB">Binance</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Select aria-label="Floating label select example"
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        <option value="" selected>Select Category</option>
                                        <option value="artwork">Artwork</option>
                                        <option value="photography">Photography</option>
                                        <option value="audio">Audio</option>
                                        <option value="video">Video</option>
                                        <option value="collectibles">Collectibles</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3 royalty_field" controlId="formBasicEmail">
                                    <Form.Label>Royalty</Form.Label>
                                    <Form.Select aria-label="Floating label select example" className='validate'
                                        onChange={(e) => setRoyalty(e.target.value)}
                                    >
                                        <option value="" selected>Select Royalty</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </Form.Select>
                                    {/* <Form.Control className='validate' type="number" min="0" step="any" placeholder="e.g 10%" onChange={(e) => setRoyalty(e.target.value)} /> */}
                                    <small className='required-text'>* Required</small>
                                    <p className='required-text' id="royltycheck">Please Enter Royalty </p>
                                </Form.Group>


                                <div className='d-flex justify-content-between mb-4'>
                                    <div className='me-4 marketplace'>
                                        <div className={isActivePrice ? ' text-center active_card' : ' text-center'} onClick={showPriceinput}>
                                            <img src={fixedPrice} alt="single" className='img-fluid w-50' />
                                            <div><strong>Fixed price</strong></div>

                                        </div>
                                    </div>

                                    <div className='me-4 marketplace'>
                                        <div className={isActiveAuction ? ' text-center active_card' : ' text-center'} onClick={showAuctioninput}>
                                            <img src={limitedAuction} alt="single" className='img-fluid w-50' />
                                            <div><strong>Limited-auction</strong></div>
                                        </div>
                                    </div>
                                    {/* 
        <div className='marketplace'>
            <div className='card-body text-center'>
                <img src={Openbids} alt="single" className='img-fluid w-50' />
                <div><strong>Open for bids</strong></div>
            </div>
        </div>
    */}

                                </div>


                                {priceInput ?
                                    <div className='mb-3 price_field'>
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control type="hidden" placeholder="" name="mint_type" value={mint_type} />
                                        <Form.Control className='validate' type="number" step=".01" placeholder="0.00 ETH" onChange={(e) => setPrice(e.target.value)} />
                                        <p className='required-text' id="pricecheck">Please Enter Price </p>
                                    </div>
                                    :
                                    <div></div>
                                }

                                {auctionInput ?
                                    <div>
                                        <Form.Control type="hidden" placeholder="" name="mint_type" value={mint_type} />
                                        <div className='mb-3 price_field'>
                                            <Form.Label>Choose Till Date and Time</Form.Label>
                                            <DatePicker
                                                selected={currentDate}
                                                onChange={handleChange}
                                                showTimeSelect
                                                timeFormat="HH:mm"
                                                timeIntervals={20}
                                                timeCaption="time"
                                                dateFormat="dd MMMM, yyyy h:mm aa"
                                                locale="en"
                                                minDate={new Date()}
                                            />
                                            {/* <button className="btn btn-primary">Show Date</button> */}
                                        </div>
                                        {/* <div className='mb-3 price_field'>
            <Form.Label>Date</Form.Label>
            <Form.Control className='validate' type="date" placeholder="0.00 ETH" />
            <p className='required-text' id="pricecheck">Please Enter Price </p>
        </div> */}
                                        <div className='mb-3 price_field'>
                                            <Form.Label>Price</Form.Label>
                                            <Form.Control className='validate' type="number" step=".01" placeholder="0.00 ETH" onChange={(e) => setPrice(e.target.value)} />
                                            <p className='required-text' id="pricecheck">Please Enter Price </p>
                                        </div>
                                    </div>
                                    :
                                    <div></div>
                                }

                                <button type="submit" className='btn btn-dark py-2 px-5' onClick={createnft}>Post</button>

                            </div>
                        </Col>
                    </Row>


                </Container>
            </section>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Footer />
        </div>
    )
}

export default CreatePost