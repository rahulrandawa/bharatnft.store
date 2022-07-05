import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

import axios from 'axios';
import {Container, Row, Col } from 'react-bootstrap';
var BASE_URL = process.env.REACT_APP_BASE_URL
console.log("API_URL", BASE_URL)

function Privacy() {

  const [privacy, setPrivacy] = useState("");

  useEffect(() => {
    async function check() {
      var privacy = await axios.get(BASE_URL + '/privacy_policy');

      setPrivacy(privacy.data.result)
    }
  
    check()
  }, [])

  return (
    <div>
        <Header/>

        <section className='min-hv'>
          <Container>
            <Row>
            <h2 className='text-center mb-3'>Privacy Policy</h2>
            <Col lg={12}>
         
         {/* <p>{privacy.description} </p> */}
                <textarea  cols="45" value={privacy.description} className="form-control" disabled></textarea>
               
            </Col>
            
           
            </Row>
          </Container>
         
        </section>

        <Footer/>
    </div>
  )
}

export default Privacy