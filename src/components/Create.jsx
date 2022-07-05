// import React from 'react'
import React, { useEffect, useState } from 'react'
 import Header from '../components/Header'
 import Footer from '../components/Footer'
 import {Container,Row, Col} from 'react-bootstrap'
 import single from '../assets/img/single.png'
 import multiple from '../assets/img/multiple.png'
 import {Link} from 'react-router-dom'
 import { FaArrowLeft } from 'react-icons/fa'

function Create() {
   
  return (
    <div>
        <Header/>
            <section>
                <Container>
                    <Row>
                        <Col className='Heading-Txt'>
                            <Link to='/' className='GoBack_btn fw-bold'><FaArrowLeft className='back-icon'/>  Go Back</Link>

                            <h2 class="fw-bold mb-3 mt-5">Create collectible</h2>

                            <p>Choose "Single" if you want your collectible to be one of a kind or "Multiple" if you want to sell one collectible multiple times</p>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm={6}>
                            <Link to='/create-post' className='create-img mt-5'>
                                <img src={single} alt="single" className='img-fluid h-250'/>
                                <p className='ImgTxt_color'>Single</p>
                            </Link>
                        </Col>
                        <Col sm={6}>
                            <div className='text-center mt-5 position-relative create-img'>
                                <p className='ImgTxt_color position-absolute end-0'>Coming Soon</p>
                                <img src={multiple} alt="single" className='img-fluid h-250'/>
                                <p className='ImgTxt_color'>Multiple</p>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col className='Heading-Txt'>
                        <p className='mt-5'>We do not own your private keys and cannot access your funds without your confirmation</p>
                        </Col>
                    </Row>
                </Container>
            </section>
        <Footer/>
    </div>
  )
}

export default Create