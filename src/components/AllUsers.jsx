import React, { useState, useEffect } from 'react'
import Header from './Header'
import ProductCard from './ProductCard'
import axios from 'axios';
import Footer from './Footer'
import { FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import ReactPaginate from 'react-paginate';
// var BASE_URL = "http://148.72.244.170:5001"
var BASE_URL = process.env.REACT_APP_BASE_URL
console.log("API_URL", BASE_URL)

function AllUsers() {
  const [topUsers, setTopUsers] = useState("")

  async function topCreators() {
    await axios.get(`${BASE_URL}/getAllTopCreator`).then(async (data) => {
      setTopUsers(data.data.result)
    })

  }
  console.log("all users", topUsers)
  useEffect(() => {
    topCreators()
  }, [])

  // =============all users pagination start===============
  const [currentItemsUsers, setCurrentItemsUsers] = useState(null);
  const [pageCountUsers, setPageCountUsers] = useState(0);

  const [itemOffsetUsers, setItemOffsetUsers] = useState(0);
  const itemsPerPageUsers = 8
  useEffect(() => {

    const endOffsetUsers = itemOffsetUsers + itemsPerPageUsers;

    setCurrentItemsUsers(topUsers.slice(itemOffsetUsers, endOffsetUsers));
    setPageCountUsers(Math.ceil(topUsers.length / itemsPerPageUsers));
  }, [itemOffsetUsers, itemsPerPageUsers, topUsers]);

  const handlePageClickUsers = (event) => {
    const newOffsetUsers = (event.selected * itemsPerPageUsers) % topUsers.length;
    setItemOffsetUsers(newOffsetUsers);
  };
  // =============all users pagination end===============

  return (
    <div>
      <Header />
      <section className='explore-section all_nft' style={{ backgroundColor: "transparent", minHeight: "90vh" }}>
        <Container>

          <Row>
            <Col lg={12}>
              <Link to='/' className='GoBack_btn fw-bold'><FaArrowLeft className='back-icon' />  Go Back</Link>
            </Col>
          </Row>
          <Row>
            {
              (topUsers.length === 0) ?
                <Row className='mt-4'>
                  <Col lg={12} md={12}>
                    <div className='filter_data_card text-center py-5'>
                      <p>No NFT's Available</p>
                    </div>
                  </Col>
                </Row>


                :
                currentItemsUsers ?
                currentItemsUsers.map((e, index) => {

                  var link = `/User_profile?id=${e.id}`
                  var name = e.userFullName
                  var image = e.image
                  var username = e.username

                  return (
                    <Col lg={3} md={6}>

                      <Card className='mt-4'>
                        <Link to={link}>
                          <div className="nft_img_div">
                            <Card.Img src={image} />
                          </div>

                          <div>
                            <Card.Body>
                              <div className='user-section d-flex justify-content-between'>
                                <div>{username}</div>
                                <h5>{name}</h5>
                              </div>
                            </Card.Body>
                          </div>
                        </Link>
                      </Card>
                    </Col>
                  )
                })
                : " "
            }
          </Row>
          <Row>
            <Col lg={12}>
              {
                (() => {
                  if (topUsers.length > 8) {
                    return (
                      <div className="paginate mt-4">
                        <ReactPaginate
                          breakLabel="..."
                          nextLabel=" >>"
                          onPageChange={handlePageClickUsers}
                          pageRangeDisplayed={3}
                          marginPagesDisplayed={2}
                          pageCount={pageCountUsers}
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
        </Container>
      </section>
      <Footer />
    </div>
  )
}

export default AllUsers