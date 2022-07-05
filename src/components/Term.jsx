import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
var BASE_URL = process.env.REACT_APP_BASE_URL
console.log("API_URL", BASE_URL)

function Term() {
  const [terms, setTerms] = useState("");

  useEffect(() => {
    async function check() {
      var terms = await axios.get(BASE_URL + '/terms_conditions');

      setTerms(terms.data.result)
    }
  
    check()
  }, [])

  return (
    <div>
        <Header/>

        <section className='min-hv'>
          <Container>
            <Row>
            <h2 className='text-center mb-3' >Term and condition</h2>
            <Col lg={12}>
            <textarea value={terms.description} className="form-control" disabled></textarea>
            </Col>
            </Row>
          </Container>
          

           
        </section>

        <Footer/>
    </div>
  )
}

export default Term