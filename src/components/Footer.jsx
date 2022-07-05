import React from 'react'
import { Col, Container, Row, InputGroup, FormControl, Button } from 'react-bootstrap'
import logo from '../assets/img/bharat-token.png'
import {Link} from 'react-router-dom'

function Footer() {
  return (
    <footer>
        <Container>
            <Row>
                <Col sm={4}>
                    <Link to='/'><img src={logo} alt="logo" className="logo img-fluid w-75" style={{filter: "invert(1)"}} /></Link>
                    
                </Col>
                <Col sm={5}>
                    <ul className='list-unstyled'>
                        <li><Link to='/about'>About Us</Link></li>
                        <li><Link to='/privacy'>Privacy Policy</Link></li>
                        <li><Link to='/term'>Terms & conditions</Link></li>
                        {/* <li><a href="#">Subscribe to our newsletter</a></li> */}
                    </ul>

                    {/* <InputGroup className="w-75">
                        <FormControl
                        placeholder="Email address"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        />
                        <Button>
                        OK
                        </Button>
                   </InputGroup> */}
                </Col>
                <Col sm={3}>
                    <ul className='list-unstyled'>
                        <li><Link to='/contact'>Contact Us</Link></li>
                        {/* <li><a href="#">How it works</a></li> */}
                        
                        
                    </ul>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer