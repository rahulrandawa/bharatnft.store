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
import { CopyToClipboard } from 'react-copy-to-clipboard';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
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

    const [bidButton, setShowBidButton] = useState(false);
    const [bidBuyButton, setShowBidBuyButton] = useState(false);
    const [bidResellButton, setShowBidResellutton] = useState(false);

    const [bidPriceList, setbidPriceList] = useState("")
    const userDetail = JSON.parse(sessionStorage.getItem('user'))

    const [newBidPrice, setNewBidPrice] = useState("");
    const [highestBidPrice, setSetHighestBidPrice] = useState("");
    const [fileExtension, setFileExtension] = useState("");
   
    const copyText = () => {
        $("#copyAddress").show()
        setTimeout(() => {
            $("#copyAddress").hide()
        }, 1000)
    }

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

    //  ============================ Resell Bid NFT modal =====================================
    const [resellBidShow, setresellBidShow] = useState(false);
    const handleResellBidClose = () => setresellBidShow(false);
    const handleResellBidShow = () => setresellBidShow(true);

    //  ============================ Buy NFT =====================================

    

    useEffect(() => {
        $("#pricecheck").hide();
        $("#nameheck").hide();
        $("#desccheck").hide();
        $("#bidPricecheck").hide();
        $("#starBidPriceCheck").hide();
        $("#startHighestPriceCheck").hide();

        $("#newPricecheck").hide();
        $('#newBidNameheck').hide();

        
    })

    $(".validate").focus(function () {
        $("#pricecheck").hide();
        $("#nameheck").hide();
        $("#desccheck").hide();
        $("#bidPricecheck").hide();
        $("#starBidPriceCheck").hide();
        $("#startHighestPriceCheck").hide();

        $("#newPricecheck").hide();
        $('#newBidNameheck').hide();
    })

    function toTimestamp(strDate) {
        var datum = Date.parse(strDate);
        return datum / 1000;
    }

    const currentDate_time = new Date()

    const [currentDateTime, setCurrentDateTime] = useState(currentDate_time)
    console.log("currentDate", currentDateTime)
    window.scroll({
        top: 0, 
        left: 0, 
        behavior: 'smooth' 
       });
    const new_auction_date = Moment(currentDateTime).format('DD MMMM YYYY h:mm A')
    const new_aucation_timestamp = toTimestamp(new_auction_date)
    console.log("formatDate", new_auction_date)

    console.log("new_aucation_timestamp", new_aucation_timestamp);

    const handleChange = (date) => {
        setCurrentDate(date)
    }

    
    async function resellBidNFT(){
        // alert(new_aucation_timestamp)
        if (!newName) {
            $("#newBidNameheck").show();
            return;
        }

        if (!newPrice) {
            $("#newPricecheck").show();
            return;
        }
        
        var tokenPrice = newPrice;
        var tokens = Web3.utils.toWei(tokenPrice.toString(), 'ether')
        var bntokens = Web3.utils.toBN(tokens)

        setresellBidShow(false)
        document.getElementById("overlay").style.display = "block";
        // uint256 _token, string memory _newName,string memoryresellAuctionNFT _Artwork_type,  uint256 _newPrice, uint _Auction_Length)
        BUYWITHCONTRACT.methods.resellAuctionNFT(nftInfo.token_id,newName, nftInfo.category,bntokens,new_aucation_timestamp)
            .send({
                from: walletAddress,
                gas: 3000000,
            }).on('error', function (error) {
                console.log("error", error)
                toast.error('You resell bid nft failed !', {
                    position: "top-center",
                    theme: "colored",
                    autoClose: 2000,
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
                formData.append("new_price", newPrice);
                formData.append("nft_name", newName);
                formData.append("auction_date", new_auction_date);
                formData.append("transaction_id", transaction_id);

                var resellBidNft = await axios.post(`${BASE_URL}/resellBidNft`, formData)
                console.log("resellBidNft",resellBidNft)


                if (resellBidNft.status == 200) {
                    console.log("Yes");
                    toast.success('You resell bid nft successfully !', {
                        position: "top-center",
                        theme: "colored",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    document.getElementById("overlay").style.display = "none";
                    setTimeout(() => {
                        setresellBidShow(false)
                        window.location.reload()
                        // navigate(`/prod_detail?id=${nftInfo.id}`)
                    }, 5000)
                }
            })

    }

    async function buyBidNFT(){
        var tokenOwner = nftInfo.wallet_address;
        var tokenPrice = nftInfo.price;
        console.log("nftInfo.token_id", nftInfo.token_id)
        console.log("nftInfo.price", tokenPrice)
        console.log("nftInfo.price.toString()", tokenPrice.toString())
        console.log("walletAddress",walletAddress)

        var tokens = Web3.utils.toWei(tokenPrice.toString(), 'ether')
        var bntokens = Web3.utils.toBN(tokens)

        document.getElementById("overlay").style.display = "block";

        BUYWITHCONTRACT.methods.BuyBidNFT(nftInfo.token_id)
            .send({
                from: walletAddress,
                gas: 3000000,
                value: bntokens
            }).on('error', function (error) {
                console.log("error", error)
                toast.error('Your buy bid nft failed !', {
                    position: "top-center",
                    theme: "colored",
                    autoClose: 2000,
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
                formData.append("price", nftInfo.price);
                formData.append("bid_auction_id", nftInfo.bid_auction_id);
                formData.append("transaction_id", transaction_id);

                var buyBidNft = await axios.post(`${BASE_URL}/buyBidNft`, formData)

                console.log("buyBidNft",buyBidNft);

                if (buyBidNft.status == 200) {
                    toast.success('You buy bid nft successfully !', {
                        position: "top-center",
                        theme: "colored",
                        autoClose: 2000,
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
                }else{
                    toast.error('Your buy bid nft failed !', {
                        position: "top-center",
                        theme: "colored",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    document.getElementById("overlay").style.display = "none";
                }
            })
    }

    async function bidNFT(){
        // setLoading(true)
        document.getElementById("overlay").style.display = "block";

        if (!newBidPrice ) {
            $("#bidPricecheck").show();
            return;
        }

        var startNFTPrice = nftInfo.price

        if(startNFTPrice >= newBidPrice){
            $("#starBidPriceCheck").show();
            return;
        }

        if(nftInfo.highest_bid != 0){
            if(nftInfo.highest_bid >= newBidPrice){
                $("#startHighestPriceCheck").show();
                return;
            }  
        }

        var tokenPrice  =   newBidPrice;
        var tokens = Web3.utils.toWei(tokenPrice.toString(),'ether')
        var bidPrice = Web3.utils.toBN(tokens)

        setBidShow(false)
        BUYWITHCONTRACT.methods.bid(nftInfo.token_id, bidPrice)
        .send({
            from: walletAddress,
            gas: 3000000,
        }).on('error', function (error) {
            console.log("error", error)
            // setLoading(false)
            toast.error('You bid placed failed !', {
                position: "top-center",
                theme: "colored",
                autoClose: 2000,
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
            formData.append("auction_price", newBidPrice);
            formData.append("transaction_id", transaction_id);

            var bidAuctionNft = await axios.post(`${BASE_URL}/bidAuctionNft`, formData)
            console.log("bidAuctionNft", bidAuctionNft.status)
            
            if(bidAuctionNft.status == 200){
                console.log("Yes");
                toast.success('Your placed bid successfully !', {
                    position: "top-center",
                    theme: "colored",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                document.getElementById("overlay").style.display = "none";
                setTimeout(() => {
                    setBidShow(false)
                    window.location.reload()
                    // navigate(`/prod_detail?id=${nftInfo.id}`)
                }, 5000)
            }
        })
        
    }

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
                        autoClose: 2000,
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
                            autoClose: 2000,
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
                    autoClose: 2000,
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
                        autoClose: 2000,
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
            })
    }

    function toTimestamp(strDate) {
        var datum = Date.parse(strDate);
        return datum / 1000;
    }

    const auction_date = Moment(nftInfo.aucation_date).format('MMMM DD YYYY h:mm A')
    console.log("auction_date", auction_date)

    const startDate = new Date()
    const [currentDate, setCurrentDate] = useState(startDate)
    console.log("currentDate", currentDate)

    const current_date = Moment(currentDate).format('MMMM DD YYYY h:mm A')
    const current_date_timestamp = toTimestamp(current_date)
    console.log("current_date", current_date)
    console.log("current_date_timestamp", current_date_timestamp)

    async function detail(walletAddress) {
        let checkAddress = sessionStorage.getItem('loginUserAdd')


        var nft_info_data = await axios.get(BASE_URL + '/getMintNFTDeatils?id=' + id + '&address=' + checkAddress)

        console.log("nft_info_bidPriceList", nft_info_data.data.result)

        setmetaData(nft_info_data.data)
        setNftInfo(nft_info_data.data.result)
        setNewName(nft_info_data.data.result.name)
        setNewDescription(nft_info_data.data.result.description)
        // var orderCreator = nft_info_data.data.id.slice(-walletAddress.length)
        var orderCreator = nft_info_data.data.result.wallet_address
        var mintType = nft_info_data.data.result.mint_type
        var buyResellStatus = nft_info_data.data.result.buyResellStatus
        setNftOwner(orderCreator);

        var bidPriceList = nft_info_data.data.result.bidPriceList;
        setbidPriceList(bidPriceList);

        const auction_date = Moment(nftInfo.aucation_date).format('MMMM DD YYYY h:mm A')
        const aucation_timestamp = nftInfo.aucation_timestamp;
        
        var fileName = nft_info_data.data.result.image;
        var fileExtension = fileName.split(/[#?]/)[0].split('.').pop().trim();
        
        setFileExtension(fileExtension);


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

            const highest_bid = nftInfo.highest_bid;
            // console.log("highest_bid",highest_bid)
            setSetHighestBidPrice(highest_bid)

            if (current_date_timestamp > aucation_timestamp) {
                console.log("overtime")
                
            } else {
                console.log("reamining")
                
            }
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
                                    {(() => {
                                        if(fileExtension == 'mp3'){
                                            return(
                                                <div>
                                                    <img src={nftInfo.preview_image} alt="featured" className='img-fluid' />
                                                    <audio controls controlsList="nodownload"  autoplay style={{width:"100%", marginTop: "15px"}}>
                                                        <source src={nftInfo.image} type="audio/ogg"></source>
                                                        <source src={nftInfo.image} type="audio/mpeg"></source>
                                                        Your browser does not support the audio element.
                                                    </audio>
                                                    
                                                </div>
                                            )
                                        }else if(fileExtension == 'mp4'){
                                            return (
                                                <video width="320" height="240" controls autoplay className='img-fluid'>
                                                    <source src={nftInfo.image} type="video/mp4"></source>
                                                    Your browser does not support the audio element.
                                                </video>
                                            )
                                        }else{
                                            return(
                                                <img src={nftInfo.image} alt="featured" className='img-fluid' />
                                            )
                                        }
                                    })()}
                                </div>

                                <div className="prod_detail_div">

                                    <div className="prod_user_price">
                                        <div className='owner-img'>
                                            <img src={nftInfo.userProfile} alt="profile" className='img-fluid' />

                                            <div className='' style={{ display: "flex", gap: "6px" }}>
                                                <h6>Owned By</h6>
                                                <Link to={`/User_profile?id=${nftInfo.user_id}`}>{nftOwnerAddress.slice(0, 6)}.....{nftOwnerAddress.slice(-6, nftOwnerAddress.length)}</Link>
                                                <CopyToClipboard text={walletAddress}
                                                    onCopy={() => copyText()}>
                                                    <span><FaRegCopy className='copy-icon ms-1' /></span>
                                                </CopyToClipboard>
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
                                                    {/* <div className="countdown_text">Sale ends {nftInfo.aucation_date.slice(0, 12)} at {nftInfo.aucation_date.slice(-7, nftInfo.length)}</div> */}
                                                    <div className="countdown_text">Sale ends {nftInfo.aucationDate} at {nftInfo.aucationTime}</div>
                                                    <div className="count_down">
                                                        <div className="countdown">
                                                            <Timer currentTime={auction_date} />
                                                        </div>
                                                        <div>
                                                            {
                                                                (() => {
                                                                    if (userDetail) {
                                                                        if (userDetail.address === nftOwnerAddress) {
                                                                            if (current_date_timestamp > nftInfo.aucation_timestamp) {
                                                                                if(nftInfo.bidPriceList == ''){
                                                                                    return(
                                                                                
                                                                                        <button className='bid_resell_btn' onClick={handleResellBidShow}>Resell </button>
                                                                                    )
                                                                                }else{
                                                                                    return(
                                                                                        <button className='bid_resell_btn' onClick={handleResellBidShow}>Resell </button>
                                                                                    )
                                                                                }
                                                                            }else{
                                                                                return(null)
                                                                            }
                                                                            

                                                                        }else{
                                                                            if (current_date_timestamp > nftInfo.aucation_timestamp) {
                                                                                if(nftInfo.checkBidUser == 1){
                                                                                    return (
                                                                                        <button className='bid_btn' onClick={handleBidShow} disabled title='You bid placed already' style={{background: "#e5cdd2"}}>Bid</button>
                                                                                    )
                                                                                }if(nftInfo.checkBidUser == 2){
                                                                                    return(
                                                                                        <button className='bid_buy_btn' onClick={buyBidNFT}>Buy</button>
                                                                                    )
                                                                                }if(nftInfo.checkBidUser == 3){
                                                                                    return(
                                                                                        <button className='bid_resell_btn' onClick={handleResellBidShow}>Resell</button>
                                                                                    )
                                                                                }else{     
                                                                                    if (userDetail.address === nftOwnerAddress) {
                                                                                        return (
                                                                                            <button className='bid_resell_btn' onClick={handleResellBidShow}>Resell</button>
                                                                                        )
                                                                                    }          
                                                                                    
                                                                                }
                                                                            } else {

                                                                                if(nftInfo.checkBidUser == 1){
                                                                                    return (
                                                                                        <button className='bid_btn' onClick={handleBidShow} disabled title='You bid placed already' style={{background: "#e5cdd2"}}>Bid</button>
                                                                                    )
                                                                                }if(nftInfo.checkBidUser == 2){
                                                                                    return(
                                                                                        <button className='bid_buy_btn' onClick={buyBidNFT}>Buy</button>
                                                                                    )
                                                                                }if(nftInfo.checkBidUser == 3){
                                                                                    return(
                                                                                        <button className='bid_resell_btn' onClick={handleResellBidShow}>Resell</button>
                                                                                    )
                                                                                }else{               
                                                                                    return (
                                                                                        <button className='bid_btn' onClick={handleBidShow}>Bid</button>
                                                                                    )
                                                                                }

                                                                            }
                                                                        }
                                                                    }
                                                                })()
                                                            }
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
                                                                        {
                                                                            (() => {
                                                                                if (nftInfo.wallet_address === walletAddress) {

                                                                                    return (
                                                                                        <th>Status</th>
                                                                                    )
                                                                                } 
                                                                            })()
                                                                        }
                                                                        {/* <th>Status</th> */}
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        bidPriceList.length == 0 ?
                                                                            <tr >
                                                                                <td colspan={4}><p>No Bid's price Available</p></td>
                                                                            </tr>
                                                                            : bidPriceList.map((e, index) => {
                                                                                return (
                                                                                    <tr>
                                                                                        <td>{index + 1}</td>
                                                                                        <td>
                                                                                            <Link to={`/User_profile?id=${e.user_id}`}>{e.bidwalletAddress.slice(0, 6)}.....{e.bidwalletAddress.slice(-6, e.bidwalletAddress.length)}</Link>
                                                                                        </td>
                                                                                        <td>
                                                                                            {
                                                                                                (() => {
                                                                                                    if (nftInfo.chain === "BNB") {

                                                                                                        return (
                                                                                                            <img src={bnb} alt="img" className='img-fluid me-1' style={{ width: "20px", height: "20px" }} />
                                                                                                        )
                                                                                                    } else {
                                                                                                        return (
                                                                                                            <img src={ethereum} alt="img" className='img-fluid me-1' style={{ width: "20px", height: "20px" }} />
                                                                                                        )
                                                                                                    }
                                                                                                })()
                                                                                            }
                                                                                            {e.bidPrice}
                                                                                        </td>
                                                                                        {/* {e.status} */}
                                                                                            {
                                                                                             
                                                                                                (() => {
                                                                                                    if (nftInfo.wallet_address === walletAddress) {
                                                                                                        if(e.status == 0){
                                                                                                            return(<td>Pending</td>)
                                                                                                        }else if(e.status == 1){
                                                                                                            return(<td>Buy NFT</td>)
                                                                                                        }else if(e.status == 2){
                                                                                                            return(<td>Rejected Bid </td>)
                                                                                                        }else if(e.status == 3){
                                                                                                            return(<td>Waiting for user buy NFT</td>)
                                                                                                        }
                                                                                                    } 
                                                                                                })()
                                                                                            } 
                                                                                        
                                                                                    </tr>
                                                                                )
                                                                            })
                                                                    }
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
                                        var preview_image = e.preview_image

                                        var e_fileName = e.image;
                                        var e_fileExtension = e_fileName.split(/[#?]/)[0].split('.').pop().trim();

                                        console.log("fileExtension",e_fileExtension);

                                        if (index < 4)
                                            return (
                                                <Col lg={3} md={6}>
                                                    <Card className='mt-4' onClick={() => { handleClcik(e.id) }}>
                                                        <div className="nft_img_div">
                                                            {(() => {
                                                            if(e_fileExtension == 'mp3'){
                                                                return(
                                                                    // <Card.Img src={image} />
                                                                    <div>
                                                                         {/* <Card.Img src={preview_image} /> */}
                                                                        <img src={preview_image} alt="featured" style={{height: "200px"}}/>
                                                                        <audio controls autoplay style={{width: "280px"}}>
                                                                            <source src={image} type="audio/ogg"></source>
                                                                            <source src={image} type="audio/mpeg"></source>
                                                                            Your browser does not support the audio element.
                                                                        </audio>
                                                                    </div>
                                                                )
                                                            }else if(e_fileExtension == 'mp4'){
                                                                return (
                                                                    <video width="320" height="240" controls autoplay className='img-fluid'>
                                                                        <source src={image} type="video/mp4"></source>
                                                                        Your browser does not support the audio element.
                                                                    </video>
                                                                )
                                                            }else{
                                                                return(
                                                                    <Card.Img src={image} />
                                                                )
                                                            }
                                                        })()}

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
                                                                                    if(mint_type === "2" && auction_left_date != "" && auction_left_date != " "){
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
                        autoClose={2000}
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
                    <Modal.Title>Placed Bid</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='form-section resell_modal'>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Name" value={newName} readOnly/>
                            <p className='required-text' id="nameheck">Please Enter New Name </p>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Description"
                                style={{ height: '100px' }} value={newDescription} readOnly/>
                            <p className='required-text' id="desccheck">Please Enter New Description </p>
                        </Form.Group>

                        <Form.Group className="mt-4 mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Control type="text" placeholder="Category" value={nftInfo.category} readOnly={true} style={{ textTransform: "capitalize" }} />
                        </Form.Group>

                        <Form.Group className="mt-4 mb-3">
                            <Form.Label>Starting Bid Price</Form.Label>
                            <Form.Control type="text" placeholder="Starting Bid Price" readOnly={true}  value={nftInfo.nft_price}/>
                        </Form.Group>

                        {
                            (() => {
                                if (nftInfo.highest_bid != 0) {
                                    return (
                                        <Form.Group className="mt-4 mb-3">
                                            <Form.Label>Highest Bid Price</Form.Label>
                                            <Form.Control type="text" placeholder="Highest Bid Price" readOnly={true}  value={nftInfo.highest_bid}/>
                                        </Form.Group>
                                    )
                                }
                            })()
                        }

                        <Form.Group className="mt-4 mb-3 new_price_field">
                            <Form.Label>Place Bid Price</Form.Label>
                            <Form.Control type="number" min="0" placeholder="Price" onChange={(e) => setNewBidPrice(e.target.value)} />
                            <p className='required-text' id="bidPricecheck">Please Enter Bid Price </p>
                            <p className='required-text' id="starBidPriceCheck">You cannot bid below the starting bid price </p>
                            <p className='required-text' id="startHighestPriceCheck">You cannot bid below the highest bid price </p>
                            
                        </Form.Group>

                        <Form.Group className="mt-4 mb-3 d-none">
                            <Form.Label>Token ID</Form.Label>
                            <Form.Control type="text" placeholder="Token Id" readOnly={true} value={nftInfo.token_id} />
                        </Form.Group>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="countdown_bid ">
                        <button className='bid_btn' onClick={bidNFT}>
                            Bid
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
            {/* ===============Bid nft modal end=================== */}

            {/*=============resell bid nft modal start================== */}
            <Modal show={resellBidShow} onHide={handleResellBidClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Resell Bid</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='form-section resell_modal'>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Name" value={newName} onChange={(e) => setNewName(e.target.value)} />
                            <p className='required-text' id="newBidNameheck">Please Enter New Name </p>
                        </Form.Group>
                       
                        <Form.Group className="mt-4 mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Control type="text" placeholder="Photography" readOnly={true} style={{ textTransform: "capitalize" }} value={nftInfo.category} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Choose New Till Date and Time</Form.Label>
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
                            {/* <p className='required-text' id="desccheck">Please Choose Till Date and Time </p> */}
                        </Form.Group>

                        <Form.Group className="mt-4 mb-3 new_price_field">
                            <Form.Label>New Price</Form.Label>
                            <Form.Control type="number" min="0" placeholder="Price" onChange={(e) => setNewPrice(e.target.value)} />
                            <p className='required-text' id="newPricecheck">Please Enter Price </p>
                        </Form.Group>

                        <Form.Group className="mt-4 mb-3 d-none">
                            <Form.Label>Token ID</Form.Label>
                            <Form.Control type="text" placeholder="Token Id" readOnly={true} value={nftInfo.token_id} />
                        </Form.Group>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className='resell_btn' onClick={resellBidNFT}>
                        Resell
                    </button>
                </Modal.Footer>
            </Modal>
            {/* ===============resell bid nft modal end=================== */}
        </>
    )
}

export default Prod_detail