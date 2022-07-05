import React from 'react'
import {Container,Row, Col,Button} from 'react-bootstrap'
import featured from '../assets/img/cat-01.jpg'
import { Link } from 'react-router-dom'
import bottom_img from '../assets/img/bottom_img.png'

function Banner() {
  return (
    <>
    <div className='bg-images'>
        <Container>
            <Row>
                <Col lg={6} md={8} sm={12}>
                <h1 className="hero-title"> Bringing together artists from the entire <span>BHARAT</span> </h1>
                <h3 className="hero-subtitle mb-5">To Explore, Collect, &amp; Trade NFTs</h3>
                <div className="explore_div">
                <Link to='/all_nft' className='explore_marketplace_txt'>Explore Marketplace</Link>
                </div>
                </Col>
                <Col lg={6} md={4} sm={12} className=''>
                    <img src={featured} alt="featured" className='img-fluid'/>
                </Col>
            </Row>
        </Container>
    </div>
  
    </>
  )
}

export default Banner