import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Container, Row, Col, ListGroup, Form, Modal, Button, Card, Tabs, Tab, Table } from 'react-bootstrap'
import featured from '../assets/img/featured.jpg'
import ProfileImg from '../assets/img/Profile.png'
import { FaEdit } from 'react-icons/fa'
import { FaRegCopy } from 'react-icons/fa'
import axios from 'axios';
import Web3 from "web3";
import { useSearchParams } from 'react-router-dom'
import { ImSpinner7 } from 'react-icons/im'
import { FaRegCheckCircle, FaArrowLeft } from 'react-icons/fa'
import { useNavigate, Link } from 'react-router-dom'
import ethereum from '../assets/img/ether.svg'
import bnb from '../assets/img/bnb.png'
import { BiTimeFive } from 'react-icons/bi'

// import {BUY_CONTRACT_ADDERESS, BUY_ABI} from '../contract/buyOrder'
import { MINT_CONTACT_ADDRESS, MINT_Abi } from '../contract/mint';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';
import Timer from './Timer';
import Moment from 'moment';
import ProductCard from './ProductCard'

// var BASE_URL = "http://148.72.244.170:5001"
const BASE_URL = process.env.REACT_APP_BASE_URL
console.log("API_URL", BASE_URL)

const web3_Stake = new Web3(window.ethereum);

// const BUYWITHCONTRACT = new web3_Stake.eth.Contract(BUY_ABI, BUY_CONTRACT_ADDERESS);
const BUYWITHCONTRACT = new web3_Stake.eth.Contract(MINT_Abi, MINT_CONTACT_ADDRESS);
// console.log("BUYWITHCONTRACT",BUYWITHCONTRACT)

function Prod_detail() {
    const navigate = useNavigate()
    const [walletAddress, setwalletAddress] = useState("");
    const [metaData, setmetaData] = useState("");
    const [nftInfo, setNftInfo] = useState("");
    const [buyButton, setShowBuyButton] = useState(false);
    const [resellButton, setShowResellButton] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get("id")
    const [ownerAddress, setOwnerAddress] = useState()
    const [modalShow, setModalShow] = useState(false);
    const [nftOwnerAddress, setNftOwner] = useState("");
    const [newPrice, setNewPrice] = useState("");
    const [newName, setNewName] = useState("");
    const [newDescription, setNewDescription] = useState("");


    const userDetail = JSON.parse(sessionStorage.getItem('user'))


    const handleClose = () => {
        setModalShow(false)
        navigate("/")
    }
    //  ============================ Bid NFT modal =====================================
    const [bidShow, setBidShow] = useState(false);
    const handleBidClose = () => setBidShow(false);
    const handleBidShow = () => setBidShow(true);

    //  ============================ Resell NFT modal =====================================
    const [resellShow, setresellShow] = useState(false);
    const handleResellClose = () => setresellShow(false);
    const handleResellShow = () => setresellShow(true);

    //  ============================ Buy NFT =====================================

    useEffect(() => {
        $("#pricecheck").hide();
        $("#nameheck").hide();
        $("#desccheck").hide();
    })

    $(".validate").focus(function () {
        $("#pricecheck").hide();
        $("#nameheck").hide();
        $("#desccheck").hide();

    })

    async function resellNFT() {
        document.getElementById("overlay").style.display = "block";

        if (!newName) {
            $("#nameheck").show();
        }

        if (!newDescription) {
            $("#desccheck").show();
        }

        if (!newPrice) {
            $("#pricecheck").show();
        } else {

            var tokenPrice = nftInfo.nft_price;
            var tokens = Web3.utils.toWei(tokenPrice.toString(), 'ether')
            var bntokens = Web3.utils.toBN(tokens)

            setresellShow(false)
            BUYWITHCONTRACT.methods.resellNFT(nftInfo.token_id, bntokens, nftInfo.name, nftInfo.description)
                .send({
                    from: walletAddress,
                    gas: 3000000,
                }).on('error', function (error) {
                    console.log("error", error)
                    toast.error('You resell nft failed !', {
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

                    var transaction_id = info.transactionHash

                    const formData = new FormData();
                    formData.append("wallet_address", walletAddress);
                    formData.append("token_id", nftInfo.token_id);
                    // formData.append("new_price", nftInfo.nft_price);
                    formData.append("new_price", newPrice);
                    formData.append("nft_name", newName);
                    formData.append("nft_description", newDescription);
                    formData.append("transaction_id", transaction_id);

                    var resellNFT = await axios.post(`${BASE_URL}/resellNFT`, formData)


                    if (resellNFT.status == 200) {
                        console.log("Yes");
                        toast.success('You resell nft successfully !', {
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
                            setresellShow(false)
                            window.location.reload()
                            // navigate(`/prod_detail?id=${nftInfo.id}`)
                        }, 5000)
                    }
                })
        }

    }

    async function buyNFT() {
        document.getElementById("overlay").style.display = "block";
        // console.log("ownerAddress",ownerAddress)
        // setLoading(true)

        var tokenOwner = nftInfo.wallet_address;
        var tokenPrice = nftInfo.nft_price;
        console.log("nftInfo.price", tokenPrice)
        console.log("nftInfo.price.toString()", tokenPrice.toString())

        var tokens = Web3.utils.toWei(tokenPrice.toString(), 'ether')
        var bntokens = Web3.utils.toBN(tokens)
        // var transaction_id = "fdsfsdfsd"


        BUYWITHCONTRACT.methods.BuyNFT(tokenOwner, nftInfo.token_id, bntokens)
            .send({
                from: walletAddress,
                gas: 3000000,
                value: bntokens
            }).on('error', function (error) {
                console.log("error", error)
                toast.error('You buy nft failed !', {
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


                var transaction_id = info.transactionHash

                const formData = new FormData();
                formData.append("wallet_address", walletAddress);
                formData.append("token_id", nftInfo.token_id);
                formData.append("price", nftInfo.nft_price);
                formData.append("transaction_id", transaction_id);

                var buyMint = await axios.post(`${BASE_URL}/buyNFT`, formData)


                if (buyMint.status == 200) {
                    toast.success('You buy nft successfully !', {
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
                        // navigate(`/prod_detail?id=${nftInfo.id}`)
                        window.location.reload()
                    }, 5000)
                }
                // var result = await axios.post(`${BASE_URL}/nft/buyNft`, { _id: nftInfo._id })
                // document.getElementById("overlay").style.display = "none";
                // setModalShow(true)
                // console.log("result", result)
                // setShowBuyButton(false)
            })
    }

    async function detail(walletAddress) {
        // window.ethereumNode = new Web3('https://rinkeby.infura.io/v3/c2a257d284ca4a799384c59c70d4bd9e')
        // console.log("window.ethereumNode ", window.ethereumNode)
        // var nft_info_data = await axios.get(`http://148.72.244.170:5001/nft/getNFTbyId/?id=${id}`)

        let checkAddress = sessionStorage.getItem('loginUserAdd')


        var nft_info_data = await axios.get(BASE_URL + '/getMintNFTDeatils?id=' + id + '&address=' + checkAddress)

        // console.log("nft_info_data", nft_info_data)
        // console.log("orderCreator", nft_info_data.data.result.wallet_address)

        setmetaData(nft_info_data.data)
        setNftInfo(nft_info_data.data.result)
        setNewName(nft_info_data.data.result.name)
        setNewDescription(nft_info_data.data.result.description)
        // var orderCreator = nft_info_data.data.id.slice(-walletAddress.length)
        var orderCreator = nft_info_data.data.result.wallet_address
        var mintType = nft_info_data.data.result.mint_type
        var buyResellStatus = nft_info_data.data.result.buyResellStatus
        setNftOwner(orderCreator);

        if (mintType == 1) {
            if (userDetail) {
                if (userDetail.address == '' || userDetail.address === "null" || userDetail.address == null) {

                    setShowBuyButton(true)
                    setShowResellButton(false)
                } else {
                    if (buyResellStatus == 0) {

                        if (ownerAddress === userDetail.address) {

                            setShowBuyButton(false)
                            setShowResellButton(false)
                        } else {
                            setShowBuyButton(true)
                            setShowResellButton(false)
                        }
                    } else if (buyResellStatus == 1) {

                        setShowBuyButton(false)
                        setShowResellButton(true)
                    } else if (buyResellStatus == 2) {

                        setShowBuyButton(false)
                        setShowResellButton(false)
                    }
                }
            } else {
                setShowBuyButton(true)
                setShowResellButton(false)
            }

        } else {

            setShowBuyButton(false)
            setShowResellButton(false)
        }

    }


    useEffect(() => {
        var loginUserAdd = sessionStorage.getItem("loginUserAdd");

        if (loginUserAdd) {
            setwalletAddress(loginUserAdd)
            detail(loginUserAdd)
        }
        detail()

    }, [])

    const auction_date = Moment(nftInfo.aucation_date).format('MMMM DD YYYY h:mm A')
    console.log("auction_date", auction_date)

    // ============all  nft collection function==============
    const [NftExplore, setExplore] = useState([]);


    async function explore() {
        await axios.get(`${BASE_URL}/getAllNFT`).then(async (data) => {
            setExplore(data.data.result)

        }).catch(err => {
            console.log("err", err)
        })

    }
    useEffect(() => {
        explore()
    }, [])
    const handleAllNft = () => {
        navigate('/all_nft')
    }

    console.log("nftinfo prod ddddddddddddddddddd", metaData)

    const handleClcik = (id) => {
        navigate(`/prod_detail?id=${id}`)
        window.location.reload();


    }
    return (

        <>
            <div id="overlay" >
                <div className='loader_spiner'>
                    <ImSpinner7 />
                </div>
            </div>


            <div>
                <Header />
                <section style={{ minHeight: "100vh" }}>
                    <Container className='mt-2'>

                        <Row>
                            <Col lg={12}>
                                <Link to='/' className='GoBack_btn fw-bold'><FaArrowLeft className='back-icon' />  Go Back</Link>

                            </Col>
                        </Row>
                        <Row className='mt-3'>
                            <Col lg={4} md={5}>
                                <div className='prod-img'>
                                    <img src={nftInfo.image} alt="featured" className='img-fluid' />
                                </div>

                                <div className="prod_detail_div">

                                   <div className="prod_user_price">
                                   <div className='owner-img'>
                                        <img src={nftInfo.userProfile} alt="profile" className='img-fluid' />
                                        <div className='' style={{ display: "flex", gap: "6px" }}>
                                            <h6>Owned By</h6>
                                            <Link to={`/User_profile?id=${nftInfo.user_id}`}>{nftOwnerAddress.slice(0, 6)}.....{nftOwnerAddress.slice(-6, nftOwnerAddress.length)}</Link>
                                        </div>
                                    </div>
                                    <div className='prod_nft_price_div'>
                                        <div className='prod_nft_price_text'>Price</div>
                                        <div className='prod_nft_price'>
                                            {
                                                (() => {
                                                    if (nftInfo.chain === "BNB") {

                                                        return (
                                                            <img src={bnb} alt="img" className='img-fluid me-1' />
                                                        )
                                                    } else {
                                                        return (
                                                            <img src={ethereum} alt="img" className='img-fluid me-1' />
                                                        )
                                                    }
                                                })()
                                            }
                                            {nftInfo.price}
                                        </div>
                                    </div>
                                   </div>

                                    <div>
                                        {
                                            (nftInfo.mint_type == 2)
                                                ?

                                                <div className="countdown_bid ">
                                                    <div className="countdown_text">Sale ends {nftInfo.aucation_date.slice(0, 12)} at {nftInfo.aucation_date.slice(-7, nftInfo.length)}</div>
                                                    <div className="count_down">
                                                        <div className="countdown">
                                                            <Timer currentTime={auction_date} />
                                                        </div>
                                                        <div>
                                                            <button className='bid_btn' onClick={handleBidShow}>Bid</button>
                                                        </div>
                                                    </div>
                                                </div>

                                                :
                                                null
                                        }
                                    </div>
                                    <div className="prod_nft_buy_div">

                                        <div className='buy_div'>
                                            {

                                                (() => {
                                                    if (userDetail) {
                                                        if (userDetail.address === nftOwnerAddress) {
                                                            if (nftInfo.buyResellStatus == 1) {
                                                                return (resellButton ?
                                                                    <button className='resell_btn' onClick={handleResellShow}>Resell</button>
                                                                    :
                                                                    <div>Owned</div>
                                                                )
                                                            } else if (nftInfo.buyResellStatus == 0) {
                                                                return (<div>Owned</div>)
                                                            } else {
                                                                return (buyButton ?
                                                                    <button className='buy_btn' onClick={buyNFT}>Buy</button>
                                                                    :
                                                                    <div>Owned</div>
                                                                )
                                                            }

                                                        } else {
                                                            if (nftInfo.mint_type == 1) {
                                                                if (nftInfo.buyResellStatus == 0) {

                                                                    return (buyButton ?
                                                                        <button className='buy_btn' onClick={buyNFT}>Buy</button>
                                                                        :
                                                                        <div>Owned</div>
                                                                    )
                                                                }
                                                                else if (nftInfo.buyResellStatus == 1) {

                                                                    return (resellButton ?
                                                                        <button className='resell_btn' onClick={handleResellShow}>Resell</button>
                                                                        :
                                                                        <div>Owned</div>
                                                                    )
                                                                }
                                                                else if (nftInfo.buyResellStatus == 2) {

                                                                    return (
                                                                        <div>Owned</div>
                                                                    )
                                                                }
                                                            } else {
                                                                return (<h6>Accept highest offer</h6>)
                                                            }
                                                        }
                                                    } else {
                                                        if (nftInfo.buyResellStatus == 1) {
                                                            return (resellButton ?
                                                                <button className='resell_btn' onClick={handleResellShow}>Resell</button>
                                                                :
                                                                <div>Owned</div>
                                                            )
                                                        } else if (nftInfo.buyResellStatus == 0) {

                                                            return (buyButton ?
                                                                <button className='buy_btn' onClick={buyNFT}>Buy</button>
                                                                :
                                                                <div>Owned</div>
                                                            )
                                                        } else {
                                                            return (<div>Owned</div>)
                                                        }
                                                    }



                                                })()
                                            }

                                        </div>
                                    </div>

                                </div>



                            </Col>
                            <Col lg={8} md={7}>
                                <Tabs defaultActiveKey="nft_details" id="uncontrolled-tab-example" className="mb-3 cus-tabs">
                                    <Tab eventKey="nft_details" title="NFT Details">
                                        <ListGroup variant="flush" style={{ border: "1px solid #e0e0e0", borderRadius: "10px" }}>
                                            <ListGroup.Item className='d-flex justify-content-start'>
                                                <div className='w-50'><h6>Title</h6></div>
                                                <div className='w-50 address_link'>{nftInfo.name}</div>
                                            </ListGroup.Item>

                                            <ListGroup.Item className='d-flex justify-content-start'>
                                                <div className='w-50'><h6>Description</h6></div>
                                                <div className='w-50 address_link'>{nftInfo.description}</div>
                                            </ListGroup.Item>

                                            <ListGroup.Item className='d-flex justify-content-start'>
                                                <div className='w-50'><h6>Chain</h6></div>
                                                <div className='w-50 address_link'>{nftInfo.chain_name}</div>
                                            </ListGroup.Item>

                                            <ListGroup.Item className='d-flex justify-content-start'>
                                                <div className='w-50'><h6>Contract Address</h6></div>
                                                <div className='address_link w-50'><a href={nftInfo.contract_address} target="_blank">{nftInfo.contract_address}</a></div>
                                            </ListGroup.Item>

                                            <ListGroup.Item className='d-flex justify-content-start'>
                                                <div className='w-50'><h6>Token ID</h6></div>
                                                <div className='w-50 address_link'>{nftInfo.token_id}</div>
                                            </ListGroup.Item>
                                        </ListGroup>



                                        <h5 className='mx-3 my-3'>Item Details</h5>



                                        <ListGroup variant="flush" style={{ border: "1px solid #e0e0e0", borderRadius: "10px" }}>
                                            <ListGroup.Item className='d-flex justify-content-start'>
                                                <div className='w-50'><h6>Category:</h6></div>
                                                <div className='w-50' style={{ textTransform: "capitalize" }}>{nftInfo.category}</div>
                                            </ListGroup.Item>

                                            <ListGroup.Item className='d-flex justify-content-start'>
                                                <div className='w-50'><h6>Royalty:</h6></div>
                                                <div className='w-50'>{nftInfo.royalty}%</div>
                                            </ListGroup.Item>

                                        </ListGroup>
                                    </Tab>

                                    {
                                        (() => {
                                            if (nftInfo.mint_type == 2) {
                                                return (
                                                    <Tab eventKey="price_details" title="Price Details">
                                                        <div className="price_table">
                                                            <Table bordered hover>
                                                                <thead>
                                                                    <tr>
                                                                        <th>S No</th>
                                                                        <th>Wallet Address</th>
                                                                        <th>Bid Amount</th>
                                                                        <th>Status</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>1</td>
                                                                        <td>3450i....08uioo</td>
                                                                        <td>1000</td>
                                                                        <td>Accept</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>2</td>
                                                                        <td>3450i....08uioo</td>
                                                                        <td>1000</td>
                                                                        <td>Accept</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>3</td>
                                                                        <td>3450i....08uioo</td>
                                                                        <td>1000</td>
                                                                        <td>Accept</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>4</td>
                                                                        <td>3450i....08uioo</td>
                                                                        <td>1000</td>
                                                                        <td>Accept</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>5</td>
                                                                        <td>3450i....08uioo</td>
                                                                        <td>1000</td>
                                                                        <td>Accept</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>6</td>
                                                                        <td>3450i....08uioo</td>
                                                                        <td>1000</td>
                                                                        <td>Accept</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>7</td>
                                                                        <td>3450i....08uioo</td>
                                                                        <td>1000</td>
                                                                        <td>Accept</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>8</td>
                                                                        <td>3450i....08uioo</td>
                                                                        <td>1000</td>
                                                                        <td>Accept</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>9</td>
                                                                        <td>3450i....08uioo</td>
                                                                        <td>1000</td>
                                                                        <td>Accept</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>10</td>
                                                                        <td>3450i....08uioo</td>
                                                                        <td>1000</td>
                                                                        <td>Accept</td>
                                                                    </tr>
                                                                </tbody>
                                                            </Table>
                                                        </div>
                                                    </Tab>
                                                )
                                            } else {
                                                return null
                                            }
                                        })()
                                    }

                                </Tabs>

                            </Col>
                        </Row>


                        <Row className='mt-5'>
                            <Col sm={3}>
                                <h4 className='collection-title'>Collections</h4>
                            </Col>
                            <Col sm={9} className='d-flex justify-content-end align-items-center'>
                                <div>
                                    <Button size="sm" variant="outline-primary" className='collection-btn me-2 trending_btn' onClick={handleAllNft}>All NFT</Button>
                                </div>
                            </Col>
                        </Row>
                        <Row className='prod_nft_all '>
                            {
                                NftExplore ?
                                    NftExplore.map((e, index) => {
                                        // var link = `/prod_detail?id=${e.id}`
                                        var name = e.name
                                        var image = e.image
                                        var userProfile = e.userProfile
                                        var username = e.userFullName
                                        var price = e.price
                                        var category = e.category
                                        var auction_left_date = e.auction_left_date
                                        var mint_type = e.mint_type
                                        var chain = e.chain
                                        // console.log("eeee", e.metadata.image)
                                        if (index < 4)
                                            return (
                                                <Col lg={3} md={6}>
                                                    <Card className='mt-4' onClick={() => { handleClcik(e.id) }}>
                                                        <div className="nft_img_div">
                                                            <Card.Img src={image} />
                                                        </div>

                                                        <div>
                                                            <Card.Body>
                                                                <div className="nft_main_div">
                                                                    <div className="nft_left_div">
                                                                        <div className="category_name">{category}</div>
                                                                        <div className="nft_name"><h6>{name}</h6></div>
                                                                        <div className="buy_now_text">Buy now</div>
                                                                    </div>
                                                                    <div className="nft_right_div">
                                                                        <div className="price_text">Price</div>
                                                                        <div className="nft_price">
                                                                            {
                                                                                (() => {
                                                                                    if (chain === "BNB") {

                                                                                        return (
                                                                                            <img src={bnb} alt="img" className='img-fluid me-1' />
                                                                                        )
                                                                                    } else {
                                                                                        return (
                                                                                            <img src={ethereum} alt="img" className='img-fluid me-1' />
                                                                                        )
                                                                                    }
                                                                                })()
                                                                            }
                                                                            <strong>{price}</strong>
                                                                        </div>
                                                                        <div className="nft_auction_time">
                                                                            {
                                                                                (() => {
                                                                                    if (mint_type === "2") {
                                                                                        return (
                                                                                            <BiTimeFive />
                                                                                        )
                                                                                    } else {
                                                                                        return null
                                                                                    }
                                                                                })()
                                                                            }
                                                                            <span>{auction_left_date}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Card.Body>
                                                        </div>
                                                    </Card>
                                                </Col>
                                            )
                                    })

                                    :
                                    <div></div>
                            }
                        </Row>

                    </Container>

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

                </section>
                <Footer />
            </div>






            {/*successfull modal start */}
            <Modal show={modalShow} onHide={handleClose} centered>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className='success_modal_div'>
                                    <div className='success_icon'><FaRegCheckCircle /></div>
                                    <div className='head'>NFT Buy Successfully !</div>
                                    <div className='success_btn'>
                                        <button className='btn btn-secondary' onClick={handleClose}>
                                            Cancel
                                        </button></div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
            {/*successfull modal end */}



            {/*=============resell nft modal start================== */}
            <Modal show={resellShow} onHide={handleResellClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Resell</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='form-section resell_modal'>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Name" value={newName} onChange={(e) => setNewName(e.target.value)} />
                            <p className='required-text' id="nameheck">Please Enter New Name </p>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Description"
                                style={{ height: '100px' }} value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
                            <p className='required-text' id="desccheck">Please Enter New Description </p>
                        </Form.Group>

                        <Form.Group className="mt-4 mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Control type="text" placeholder="Photography" readOnly={true} style={{ textTransform: "capitalize" }} value={nftInfo.category} />
                        </Form.Group>

                        <Form.Group className="mt-4 mb-3 new_price_field">
                            <Form.Label>New Price</Form.Label>
                            <Form.Control type="number" min="0" placeholder="Price" onChange={(e) => setNewPrice(e.target.value)} />
                            <p className='required-text' id="pricecheck">Please Enter Price </p>
                        </Form.Group>

                        <Form.Group className="mt-4 mb-3 d-none">
                            <Form.Label>Token ID</Form.Label>
                            <Form.Control type="text" placeholder="Token Id" readOnly={true} value={nftInfo.token_id} />
                        </Form.Group>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className='resell_btn' onClick={resellNFT}>
                        Resell
                    </button>
                </Modal.Footer>
            </Modal>
            {/* ===============resell nft modal end=================== */}

            {/*=============Bid nft modal start================== */}
            <Modal show={bidShow} onHide={handleBidClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Bid</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='form-section resell_modal'>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Name" value={newName} onChange={(e) => setNewName(e.target.value)} />
                            <p className='required-text' id="nameheck">Please Enter New Name </p>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Description"
                                style={{ height: '100px' }} value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
                            <p className='required-text' id="desccheck">Please Enter New Description </p>
                        </Form.Group>

                        <Form.Group className="mt-4 mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Control type="text" placeholder="Photography" readOnly={true} style={{ textTransform: "capitalize" }} value={nftInfo.category} />
                        </Form.Group>

                        <Form.Group className="mt-4 mb-3 new_price_field">
                            <Form.Label>New Price</Form.Label>
                            <Form.Control type="number" min="0" placeholder="Price" onChange={(e) => setNewPrice(e.target.value)} />
                            <p className='required-text' id="pricecheck">Please Enter Price </p>
                        </Form.Group>

                        <Form.Group className="mt-4 mb-3 d-none">
                            <Form.Label>Token ID</Form.Label>
                            <Form.Control type="text" placeholder="Token Id" readOnly={true} value={nftInfo.token_id} />
                        </Form.Group>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="countdown_bid ">
                        <button className='bid_btn'>
                            Bid
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
            {/* ===============Bid nft modal end=================== */}
        </>
    )
}

export default Prod_detail