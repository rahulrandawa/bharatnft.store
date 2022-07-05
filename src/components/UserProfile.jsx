import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {Container,Row, Col,Tabs,Tab,Card,InputGroup,FormControl} from 'react-bootstrap'
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
import axios from 'axios'
import {useSearchParams } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import $ from 'jquery'
import ethereum from '../assets/img/ether.svg'
import bnb from '../assets/img/bnb.png'

const BASE_URL = process.env.REACT_APP_BASE_URL
console.log("API_URL", BASE_URL)

function UserProfile() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [userData, setuserData] = useState("")
    const [creatorAddress, setcreatorAddress] = useState("")
        // const searchParams = useSearchParams();
        const [onSale, setOnSaleData] = useState([])
        const [activity, setActivity] = useState([])
        const [owned, setOwned] = useState([])
    console.log("activityyyyyyyyyyyyyyyyyyyyyyyyyyyyy", activity);
    
    const copyText = () => {
        $("#copyAddress").show()
        setTimeout(() => {
            $("#copyAddress").hide()
        }, 1000)
    }

    async function getUserProfile(){
        const id =  searchParams.get("id") 
        console.log("iddddd", id);
        var creators = await axios.get(`${BASE_URL}/getTopCreatorDetail?user_id=${id}`)

        setuserData(creators.data.result)
        setOnSaleData(creators.data.result.on_sale)
        setActivity(creators.data.result.activity)
        setOwned(creators.data.result.owned)
        setcreatorAddress(creators.data.result.address)
    }
    useEffect(()=>{
        getUserProfile()
    }, [])
   
      // =============On Sell pagination start===============
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
  // =============On Sell pagination end===============

  // =============Activity pagination start===============
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
  // =============Activity pagination end===============

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
        <Header/>
            <section className='profile'>
                <Container>
                    <Row>
                          <Col lg={12}>
                              <Link to='/' className='GoBack_btn fw-bold'><FaArrowLeft className='back-icon' />  Go Back</Link>
                          </Col>
                    </Row>
                    <Row>
                        <Col sm={4}>
                            <div className='profile-detail text-center'>
                                <img src={userData.profileImage} alt="profile" className='img-fluid'/>
                                
                                <div className='border mt-3 rounded-pill py-1'>
                                    {/* {userData.address} */}
                                    {creatorAddress.slice(0, 6)}.......{creatorAddress.slice(-6, creatorAddress.length)}
                                    <CopyToClipboard text={creatorAddress}
                                        onCopy={() => copyText()}>
                                        <span><FaRegCopy className='copy-icon ms-1' /></span>
                                    </CopyToClipboard>
                                </div>
                                
                                <div className='mt-4 heading-name'>
                                    <h4>{userData.name}</h4>
                                    <p>{userData.username}</p>
                                </div>

                                <div className='edit-profile mt-4'>
                                    <ul className='list-unstyled d-flex justify-content-between align-items-center'>
                                        <li><a href="#">Follow</a></li>
                                        <li><strong>{userData.followingCount}</strong> <span className='d-block'>Following</span></li>
                                        <li><strong>{userData.followerCount}</strong> <span className='d-block'>Followers</span></li>
                                        
                                    </ul>
                                </div>

                                <div className='Bio mt-4 text-start'>
                                    <h6><strong>Bio</strong></h6>
                                    <hr></hr>
                                    <span>{userData.bio}</span>
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
                                                    value={userData.links}
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
                                                    value={userData.discord_link}
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
                                                    value={userData.facebook_link}
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
                                                    value={userData.snapchat}
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
                                                    value={userData.tiktok_link}
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
                                                    value={userData.twich_link}
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
                                                    value={userData.youtube_link}
                                                    readOnly
                                                />
                                            </InputGroup>
                                        </li>
                                        
                                    </ul>
                                </div>


                                <div>
                                    <ul className='list-unstyled d-flex justify-content-between border-top border-bottom py-2'>
                                        <li><strong>Joined</strong></li> 
                                        <li><strong>{(userData.joined_date)}</strong></li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                        <Col sm={8}>
                            <Tabs defaultActiveKey="sale" id="uncontrolled-tab-example" className="mb-3 cus-tabs">
                                <Tab eventKey="sale" title="On sale">
                                    <Row>
                                    { (
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
                                                                                {(() => {
                                                                                    if(e_fileExtension == 'mp3'){
                                                                                        return(
                                                                                            <div>
                                                                                                <img src={e.preview_image} alt="featured" style={{"height" : "200px", "width" : "250px"}}/>
                                                                                                <audio controls autoplay style={{width: "280px"}}>
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
                                                                                            {/* <div className='category_name'>{e.name}</div> */}
                                                                                            <div>
                                                                                                <td rowspan="2" colspan="2">
                                                                                                <tr>{e.name}</tr>
                                                                                                <tr>{e.category}</tr>
                                                                                                </td>
                                                                                            </div>
                                                                                            <div>
                                                                                                {
                                                                                                    (()=>{
                                                                                                        if(e.chain === "BNB"){

                                                                                                            return(
                                                                                                                <div className='nft_price'>
                                                                                                                <div class="price_text">Price </div>
                                                                                                                <img src={bnb} alt="img" className='img-fluid me-1' />
                                                                                                                {e.nft_price}
                                                                                                            </div>
                                                                                                            )
                                                                                                        }else{
                                                                                                            return(
                                                                                                                <div className='nft_price'>
                                                                                                                <div class="price_text">Price </div>
                                                                                                                <img src={ethereum} alt="img" className='img-fluid me-1' />
                                                                                                                {e.nft_price}
        
                                                                                                            </div>
                                                                                                            ) 
                                                                                                        }
                                                                                                    })()
                                                                                                }
                                                                                             
                                                                                            </div>
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
                                    { (
                                                currentItemsActivity ?

                                                currentItemsActivity.map((e) => {
                                                        var link = `/prod_detail?id=${e.id}`
                                                        var e_fileName = e.image;
                                                        var e_fileExtension = e_fileName.split(/[#?]/)[0].split('.').pop().trim();

                                                        return (
                                                            <Col lg={4} md={6}>
                                                                
                                                                <Card className='mt-4'>
                                                                <Link to={link}>
                                                                            <div className="nft_img_div">
                                                                                {(() => {
                                                                                    if(e_fileExtension == 'mp3'){
                                                                                        return(
                                                                                            <div>
                                                                                                <img src={e.preview_image} alt="featured" style={{"height" : "200px", "width" : "250px"}}/>
                                                                                                <audio controls autoplay style={{width: "280px"}}>
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
                                                                                            <div>
                                                                                                <td rowspan="2" colspan="2">
                                                                                                <tr>{e.name}</tr>
                                                                                                <tr>{e.category}</tr>
                                                                                                </td>
                                                                                            </div>

                                                                                            <h6>
                                                                                                {
                                                                                                    (()=>{
                                                                                                        if(e.chain === "BNB"){

                                                                                                            return(
                                                                                                                <img src={bnb} alt="img" className='img-fluid me-1' />
                                                                                                            )
                                                                                                        }else{
                                                                                                            return(
                                                                                                                <img src={ethereum} alt="img" className='img-fluid me-1' />
                                                                                                            ) 
                                                                                                        }
                                                                                                    })()
                                                                                                }
                                                                                                {e.nft_price}
                                                                                            </h6>
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
                                    { (
                                                currentItemsOwned ?

                                                currentItemsOwned.map((e) => {
                                                        var link = `/prod_detail?id=${e.id}`
                                                        var e_fileName = e.image;
                                                        var e_fileExtension = e_fileName.split(/[#?]/)[0].split('.').pop().trim();

                                                        return (
                                                            <Col lg={4} md={6}>
                                                                
                                                                <Card className='mt-4'>
                                                                <Link to={link}>
                                                                            <div className="nft_img_div">
                                                                                {(() => {
                                                                                    if(e_fileExtension == 'mp3'){
                                                                                        return(
                                                                                            <div>
                                                                                                <img src={e.preview_image} alt="featured" style={{"height" : "200px", "width" : "250px"}}/>
                                                                                                <audio controls autoplay style={{width: "280px"}}>
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
                                                                                            <div>
                                                                                                <td rowspan="2" colspan="2">
                                                                                                <tr>{e.name}</tr>
                                                                                                <tr>{e.category}</tr>
                                                                                                </td>
                                                                                            </div>
                                                                                            <h6>
                                                                                                {
                                                                                                    (()=>{
                                                                                                        if(e.chain === "BNB"){

                                                                                                            return(
                                                                                                                <img src={bnb} alt="img" className='img-fluid me-1' />
                                                                                                            )
                                                                                                        }else{
                                                                                                            return(
                                                                                                                <img src={ethereum} alt="img" className='img-fluid me-1' />
                                                                                                            ) 
                                                                                                        }
                                                                                                    })()
                                                                                                }
                                                                                                {e.buy_price}
                                                                                            </h6>
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
        <Footer/>
      </div>
    
  )
}

export default UserProfile