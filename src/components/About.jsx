import React, { useState, useEffect }  from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
var BASE_URL = process.env.REACT_APP_BASE_URL
console.log("API_URL", BASE_URL)

function About() {
  const [aboutUs, setAboutUs] = useState("");

  useEffect(() => {
    async function check() {
      var about_us = await axios.get(BASE_URL + '/about_us');
      console.log("about_usabout_us",about_us.data.result)

      setAboutUs(about_us.data.result)
    }
  
    check()
  }, [])

  return (
    <div>
        <Header/>
        <section className='min-hv'>
       <Container>
        <Row>
        <h2 className='text-center mb-3'>About Us</h2>
          <Col lg={12}>
           <textarea value={aboutUs.description} className="form-control" disabled></textarea>
            
        </Col>
        </Row>
       </Container>
       </section>
        <Footer/>
    </div>
  )
}


export default About