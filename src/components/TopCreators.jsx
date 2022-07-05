import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import ProductCard from './ProductCard'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
// var BASE_URL = "http://148.72.244.170:5001"

const BASE_URL = process.env.REACT_APP_BASE_URL
console.log("API_URL", BASE_URL)

function TopCreators() {
     const navigate = useNavigate()
     const [topUsers, setTopUsers] = useState("")

     async function topCreators() {
          var creators = await axios.get(`${BASE_URL}/getAllTopCreator`)
          console.log("creators", creators)
          setTopUsers(creators.data.result)
     }

     useEffect(() => {
          topCreators()
     }, [])

     const handleAllUsers = () => {
          // setFilteredData(NftExplore)
          navigate('/all_users')
     }
     return (
          <section className='topcreators'>
               <Container>
                    <Row>
                         <Col sm={3}>
                              <h4 className='collection-title'>Top Creators</h4>
                         </Col>
                         <Col sm={9} className='d-flex justify-content-end align-items-center'>
                              <div>
                                   <Button size="sm" variant="outline-primary" className='collection-btn me-2 trending_btn' onClick={handleAllUsers}>All Creators</Button>
                              </div>
                         </Col>
                    </Row>

                    <Row>
                         {(topUsers.length === 0) ?
                              <Row className='mt-4'>
                                   <Col lg={12} md={12}>
                                        <div className='filter_data_card text-center py-5'>
                                             <p>No NFT's Available</p>
                                        </div>
                                   </Col>
                              </Row>
                              :

                              topUsers.map((e, index) => {
                                   var link = `/User_profile?id=${e.id}`
                                   var name = e.userFullName
                                   var image = e.image
                                   var username = e.username

                                   if (index < 8) {
                                        return (
                                             <Col lg={3} md={6}>
                                                  <Card className='mt-4 creators_wrap'>
                                                       <Link to={link}>
                                                            <div className="nft_img_div">
                                                                 <Card.Img src={image} />
                                                            </div>

                                                            <div>
                                                                 <Card.Body>
                                                                      <div className='user-section'>
                                                                           <h5>{name}</h5>
                                                                           <p>{username}</p>
                                                                      </div>
                                                                 </Card.Body>
                                                            </div>
                                                       </Link>
                                                  </Card>
                                             </Col>
                                        )
                                   }

                              })
                         }
                    </Row>
               </Container>
          </section>
     )
}

export default TopCreators