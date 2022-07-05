import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Container, Row, Col, Tabs, Tab, InputGroup, FormControl, Card } from 'react-bootstrap'
import ProfileImg from '../assets/img/Profile.png'
import { FaRegCopy } from 'react-icons/fa'
import { FaGlobe } from 'react-icons/fa'
import { FaGithubAlt } from 'react-icons/fa'
import { FaFacebook } from 'react-icons/fa'
import { FaSnapchatGhost } from 'react-icons/fa'
import { FaTiktok } from 'react-icons/fa'
import { FaCommentDots } from 'react-icons/fa'
import { FaYoutube } from 'react-icons/fa'
import ProductCard from './ProductCard'
import axios from 'axios';
import Web3 from "web3";
import { Link } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import $ from 'jquery'
import ReactPaginate from 'react-paginate';

// var BASE_URL = "http://148.72.244.170:5001"
// http://148.72.244.170:5000/user/user

var BASE_URL = process.env.REACT_APP_BASE_URL
console.log("API_URL", BASE_URL)

var user = JSON.parse(sessionStorage.getItem("user"))

let checkAddress = sessionStorage.getItem('loginUserAdd')
console.log("user_walletAddress", checkAddress);

function Profile() {
    const [walletAddress, setwalletAddress] = useState("");
    const [User, setUser] = useState([])
    const [onSale, setOnSaleData] = useState([])
    const [activity, setActivity] = useState([])
    const [owned, setOwned] = useState([])

    console.log("user_______________________Data)", User)
    console.log("user_______________onsele)", onSale)
    async function getUserProfile() {


        // var data = await axios.post(`${BASE_URL}/user/user`, { id: user.user.id }, config)

        const formData = new FormData();
        formData.append("user_address", checkAddress);


        var getPRofile = await axios.post(`${BASE_URL}/getProfile`, formData)
        setUser(getPRofile.data.result)
        setOnSaleData(getPRofile.data.result.on_sale)
        setActivity(getPRofile.data.result.activity)
        setOwned(getPRofile.data.result.owned)
    }

    console.log("ownedownedownedownedowned=================)", owned)
    useEffect(() => {
        getUserProfile()
        var loginUserAdd = sessionStorage.getItem("loginUserAdd");
        if (loginUserAdd) {
            setwalletAddress(loginUserAdd)
        }

    }, [])

    const copyText = () => {
        $("#copyAddress").show()
        setTimeout(() => {
            $("#copyAddress").hide()
        }, 1000)
    }

    // ============= Activity pagination start===============
    const [currentItemsActivity, setCurrentItemsActivity] = useState(null);
    const [pageCountActivity, setPageCountActivity] = useState(0);

    const [itemOffsetActivity, setItemOffsetActivity] = useState(0);
    const itemsPerPageActivity = 6
    useEffect(() => {

        const endOffsetActivity = itemOffsetActivity + itemsPerPageActivity;

        setCurrentItemsActivity(activity.slice(itemOffsetActivity, endOffsetActivity));
        setPageCountActivity(Math.ceil(activity.length / itemsPerPageActivity));
    }, [itemOffsetActivity, itemsPerPageActivity, activity]);

    const handlePageClickActivity = (event) => {
        const newOffsetActivity = (event.selected * itemsPerPageActivity) % activity.length;
        setItemOffsetActivity(newOffsetActivity);
    };
    // ============= Activity pagination end===============

    // =============On Sell pagination start===============
    const [currentItemsOnSale, setCurrentItemsOnSale] = useState(null);
    const [pageCountOnSale, setPageCountOnSale] = useState(0);

    const [itemOffsetOnSale, setItemOffsetOnSale] = useState(0);
    const itemsPerPageOnSale = 6
    useEffect(() => {

        const endOffsetOnSale = itemOffsetOnSale + itemsPerPageOnSale;

        setCurrentItemsOnSale(onSale.slice(itemOffsetOnSale, endOffsetOnSale));
        setPageCountOnSale(Math.ceil(onSale.length / itemsPerPageOnSale));
    }, [itemOffsetOnSale, itemsPerPageOnSale, onSale]);

    const handlePageClickOnSale = (event) => {
        const newOffsetOnSale = (event.selected * itemsPerPageOnSale) % onSale.length;
        setItemOffsetOnSale(newOffsetOnSale);
    };
    // =============On Sell pagination end===============

    // =============Owned pagination start===============
    const [currentItemsOwned, setCurrentItemsOwned] = useState(null);
    const [pageCountOwned, setPageCountOwned] = useState(0);

    const [itemOffsetOwned, setItemOffsetOwned] = useState(0);
    const itemsPerPageOwned = 6
    useEffect(() => {

        const endOffsetOwned = itemOffsetOwned + itemsPerPageOwned;

        setCurrentItemsOwned(owned.slice(itemOffsetOwned, endOffsetOwned));
        setPageCountOwned(Math.ceil(owned.length / itemsPerPageOwned));
    }, [itemOffsetOwned, itemsPerPageOwned, owned]);

    const handlePageClickOwned = (event) => {
        const newOffsetOwned = (event.selected * itemsPerPageOwned) % owned.length;
        setItemOffsetOwned(newOffsetOwned);
    };
    // =============Owned pagination end===============
    return (
        <div>
            <Header />
            <section className='profile'>
                <Container>
                    <Row>
                        <Col lg={4} md={5}>
                            {User ?
                                <div className='profile-detail text-center'>
                                    <img src={User.profileImage} alt="profile" className='img-fluid' />

                                    <div className='border mt-3 rounded-pill py-1'>
                                        {walletAddress.slice(0, 6)}.......{walletAddress.slice(-6, walletAddress.length)}
                                        <CopyToClipboard text={walletAddress}
                                            onCopy={() => copyText()}>
                                            <span><FaRegCopy className='copy-icon ms-1' /></span>
                                        </CopyToClipboard>
                                    </div>
                                    <span style={{ color: '#0d6efd', display: "none" }} className="copy" id="copyAddress" >Copied.</span>
                                    <div className='mt-4 heading-name'>
                                        <h3>{User.name}</h3>
                                        <h6>{User.username}</h6>
                                    </div>

                                    <div className='edit-profile mt-4'>
                                        <ul className='list-unstyled d-flex justify-content-between align-items-center'>
                                            <li><strong>{User.followingCount}</strong> <span className='d-block'>Following</span></li>
                                            <li><strong>{User.followerCount}</strong> <span className='d-block'>Followers</span></li>
                                            <li><Link to="/edit_profile">Edit Profile</Link></li>
                                        </ul>
                                    </div>

                                    <div className='Bio mt-4 text-start'>
                                        <h6><strong>Bio</strong></h6>
                                        <hr></hr>
                                        <span>{User.bio}</span>
                                    </div>

                                    <div className='link text-start mt-4'>
                                        <h6><strong>Links</strong></h6>

                                        <ul className='list-unstyled mt-3'>
                                            <li className='d-flex editing_icon'> <FaGlobe />
                                                <InputGroup>
                                                    <FormControl
                                                        placeholder="http://www.xyz.com"
                                                        aria-label="Recipient's username"
                                                        aria-describedby="basic-addon2"
                                                        value={User.links}
                                                        readOnly
                                                    />
                                                </InputGroup>
                                            </li>
                                            <li className='d-flex editing_icon'> <FaGithubAlt />
                                                <InputGroup>
                                                    <FormControl
                                                        placeholder="http://discord.com"
                                                        aria-label="Recipient's username"
                                                        aria-describedby="basic-addon2"
                                                        value={User.discord_link}
                                                        readOnly
                                                    />
                                                </InputGroup>
                                            </li>

                                            <li className='d-flex editing_icon'> <FaFacebook />
                                                <InputGroup>
                                                    <FormControl
                                                        placeholder="http://facebook.com"
                                                        aria-label="Recipient's username"
                                                        aria-describedby="basic-addon2"
                                                        value={User.facebook_link}
                                                        readOnly
                                                    />
                                                </InputGroup>
                                            </li>

                                            <li className='d-flex editing_icon'> <FaSnapchatGhost />
                                                <InputGroup>
                                                    <FormControl
                                                        placeholder="http://snapchat.com"
                                                        aria-label="Recipient's username"
                                                        aria-describedby="basic-addon2"
                                                        value={User.snapchat}
                                                        readOnly
                                                    />
                                                </InputGroup>
                                            </li>
                                            <li className='d-flex editing_icon'> <FaTiktok />
                                                <InputGroup>
                                                    <FormControl
                                                        placeholder="http://tiktok.com"
                                                        aria-label="Recipient's username"
                                                        aria-describedby="basic-addon2"
                                                        value={User.tiktok_link}
                                                        readOnly
                                                    />
                                                </InputGroup>
                                            </li>

                                            <li className='d-flex editing_icon'> <FaCommentDots />
                                                <InputGroup>
                                                    <FormControl
                                                        placeholder="http://twitch.com"
                                                        aria-label="Recipient's username"
                                                        aria-describedby="basic-addon2"
                                                        value={User.twich_link}
                                                        readOnly
                                                    />
                                                </InputGroup>
                                            </li>
                                            <li className='d-flex editing_icon'> <FaYoutube />
                                                <InputGroup>
                                                    <FormControl
                                                        placeholder="http://youtube.com"
                                                        aria-label="Recipient's username"
                                                        aria-describedby="basic-addon2"
                                                        value={User.youtube_link}
                                                        readOnly
                                                    />
                                                </InputGroup>
                                            </li>
                                        </ul>
                                    </div>

                                    <div>
                                        <ul className='list-unstyled d-flex justify-content-between border-top border-bottom py-2'>
                                            <li><strong>Joined</strong></li>
                                            <li><strong>{User.joined_date}</strong></li>
                                        </ul>
                                    </div>
                                </div>
                                :
                                <div className='profile-detail text-center'>
                                </div>

                            }

                        </Col>
                        <Col lg={8} md={7}>
                            <Tabs defaultActiveKey="sale" id="uncontrolled-tab-example" className="mb-3 cus-tabs">
                                <Tab eventKey="sale" title="On sale">
                                    <Row>
                                        {(
                                            currentItemsOnSale ?

                                                currentItemsOnSale.map((e) => {
                                                    var link = `/prod_detail?id=${e.id}`
                                                    var e_fileName = e.image;
                                                    var e_fileExtension = e_fileName.split(/[#?]/)[0].split('.').pop().trim();

                                                    return (
                                                        <Col lg={4} md={6}>

                                                            <Card className='mt-4'>
                                                                <Link to={link}>
                                                                    <div className="nft_img_div">
                                                                        {/* <Card.Img src={e.image} /> */}
                                                                        {(() => {
                                                                            if(e_fileExtension == 'mp3'){
                                                                                return(
                                                                                    <div>
                                                                                        <img src={e.preview_image} alt="featured" style={{height: "200px"}}/>
                                                                                        <audio controls autoplay style={{width: "250px"}}>
                                                                                            <source src={e.image} type="audio/ogg"></source>
                                                                                            <source src={e.image} type="audio/mpeg"></source>
                                                                                            Your browser does not support the audio element.
                                                                                        </audio>
                                                                                    </div>
                                                                                )
                                                                            }else if(e_fileExtension == 'mp4'){
                                                                                return (
                                                                                    <video width="320" height="240" controls autoplay className='img-fluid'>
                                                                                        <source src={e.image} type="video/mp4"></source>
                                                                                        Your browser does not support the audio element.
                                                                                    </video>
                                                                                )
                                                                            }else{
                                                                                return(
                                                                                    <Card.Img src={e.image} />
                                                                                )
                                                                            }
                                                                        })()}
                                                                    </div>

                                                                    <div>
                                                                        <Card.Body>
                                                                            <div className='user-section d-flex justify-content-between'>
                                                                                <div>{e.name}</div>
                                                                                <h5>{e.nft_price}</h5>
                                                                            </div>
                                                                        </Card.Body>
                                                                    </div>
                                                                </Link>
                                                            </Card>
                                                        </Col>
                                                    )
                                                })

                                                :
                                                <div className='filter_data_card text-center py-5'>
                                                    <p>No NFT's Available</p>
                                                </div>
                                        )

                                        }

                                    </Row>
                                    <Row>
                                        <Col lg={12}>
                                            {
                                                (() => {
                                                    
                                                
                                                    if (onSale.length > 6) {
                                                        return (
                                                            <div className="paginate mt-4">
                                                                <ReactPaginate
                                                                    breakLabel="..."
                                                                    nextLabel=" >>"
                                                                    onPageChange={handlePageClickOnSale}
                                                                    pageRangeDisplayed={3}
                                                                    marginPagesDisplayed={2}
                                                                    pageCount={pageCountOnSale}
                                                                    previousLabel="<< "
                                                                    containerClassName='pagination justify-content-end'
                                                                    pageClassName='page-item'
                                                                    pageLinkClassName='page-link'
                                                                    previousClassName='page-item'
                                                                    previousLinkClassName='page-link'
                                                                    nextClassName='page-item'
                                                                    nextLinkClassName='page-link'
                                                                    breakClassName='page-item'
                                                                    breakLinkClassName='page-link'
                                                                    activeClassName='active'

                                                                />
                                                            </div>
                                                        )
                                                    }

                                                })()
                                            }

                                        </Col>
                                    </Row>
                                </Tab>

                                <Tab eventKey="activity" title="Activity">
                                    <Row>
                                        {(
                                            currentItemsActivity ?

                                                currentItemsActivity.map((e) => {
                                                    var link = `/prod_detail?id=${e.id}`
                                                    return (
                                                        <Col lg={4} md={6}>

                                                            <Card className='mt-4'>
                                                                <Link to={link}>
                                                                    <div className="nft_img_div">
                                                                        <Card.Img src={e.image} />
                                                                    </div>

                                                                    <div>
                                                                        <Card.Body>
                                                                            <div className='user-section d-flex justify-content-between'>
                                                                                <div>{e.name}</div>
                                                                                <h5>{e.nft_price}</h5>
                                                                            </div>
                                                                        </Card.Body>
                                                                    </div>
                                                                </Link>
                                                            </Card>
                                                        </Col>
                                                    )
                                                })

                                                :
                                                <div className='filter_data_card text-center py-5'>
                                                    <p>No NFT's Available</p>
                                                </div>
                                        )

                                        }

                                    </Row>
                                    <Row>
                                        <Col lg={12}>
                                            {
                                                (() => {
                                                   
                                                    if (activity.length > 6) {
                                                        return (
                                                            <div className="paginate mt-4">
                                                                <ReactPaginate
                                                                    breakLabel="..."
                                                                    nextLabel=" >>"
                                                                    onPageChange={handlePageClickActivity}
                                                                    pageRangeDisplayed={3}
                                                                    marginPagesDisplayed={2}
                                                                    pageCount={pageCountActivity}
                                                                    previousLabel="<< "
                                                                    containerClassName='pagination justify-content-end'
                                                                    pageClassName='page-item'
                                                                    pageLinkClassName='page-link'
                                                                    previousClassName='page-item'
                                                                    previousLinkClassName='page-link'
                                                                    nextClassName='page-item'
                                                                    nextLinkClassName='page-link'
                                                                    breakClassName='page-item'
                                                                    breakLinkClassName='page-link'
                                                                    activeClassName='active'

                                                                />
                                                            </div>
                                                        )
                                                    }
                                                })()
                                            }

                                        </Col>
                                    </Row>
                                </Tab>
                                <Tab eventKey="owned" title="Owned">
                                    <Row>
                                        {(
                                            currentItemsOwned ?

                                                currentItemsOwned.map((e) => {
                                                    var link = `/prod_detail?id=${e.id}`
                                                    return (
                                                        <Col lg={4} md={6}>

                                                            <Card className='mt-4'>
                                                                <Link to={link}>
                                                                    <div className="nft_img_div">
                                                                        <Card.Img src={e.image} />
                                                                    </div>

                                                                    <div>
                                                                        <Card.Body>
                                                                            <div className='user-section d-flex justify-content-between'>
                                                                                <div>{e.name}</div>
                                                                                <h5>{e.nft_price}</h5>
                                                                            </div>
                                                                        </Card.Body>
                                                                    </div>
                                                                </Link>
                                                            </Card>
                                                        </Col>
                                                    )
                                                })

                                                :
                                                <div className='filter_data_card text-center py-5'>
                                                    <p>No NFT's Available</p>
                                                </div>
                                        )

                                        }
                                    </Row>
                                    <Row>
                                        <Col lg={12}>
                                            {
                                                (() => {
                                                   
                                                    if (owned.length > 6) {
                                                        return (
                                                            <div className="paginate mt-4">
                                                                <ReactPaginate
                                                                    breakLabel="..."
                                                                    nextLabel=" >>"
                                                                    onPageChange={handlePageClickOwned}
                                                                    pageRangeDisplayed={3}
                                                                    marginPagesDisplayed={2}
                                                                    pageCount={pageCountOwned}
                                                                    previousLabel="<< "
                                                                    containerClassName='pagination justify-content-end'
                                                                    pageClassName='page-item'
                                                                    pageLinkClassName='page-link'
                                                                    previousClassName='page-item'
                                                                    previousLinkClassName='page-link'
                                                                    nextClassName='page-item'
                                                                    nextLinkClassName='page-link'
                                                                    breakClassName='page-item'
                                                                    breakLinkClassName='page-link'
                                                                    activeClassName='active'

                                                                />
                                                            </div>
                                                        )
                                                    }
                                                })()
                                            }

                                        </Col>
                                    </Row>
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Container>
            </section>
            <Footer />
        </div>

    )
}

export default Profile