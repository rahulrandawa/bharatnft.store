import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Col, Container, Row,Form,Button } from 'react-bootstrap'
import $ from 'jquery';

import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

var BASE_URL = process.env.REACT_APP_BASE_URL
console.log("API_URL", BASE_URL)
function Contact() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");


    useEffect(() => {
        $("#namecheck").hide();
        $("#emailcheck").hide();
        $("#subjectcheck").hide();
        $("#msgcheck").hide();

    })

    $(".validate").focus(function () {
        $("#namecheck").hide();
        $("#emailcheck").hide();
        $("#subjectcheck").hide();
        $("#msgcheck").hide();

    })

    const sendContact = async () => {
        if (!name) {
            $("#namecheck").show();
            
        }
        if (!email) {
            $("#emailcheck").show();
            
        }
        if (!subject) {
            $("#subjectcheck").show();
        }
        if (!message) {
            $("#msgcheck").show();
        }
        
        if (name && email && subject && message) {
            const formData = new FormData();
            formData.append("fullname", name);
            formData.append("email", email);
            formData.append("subject", subject);
            formData.append("message", message);

            var creat_mint = await axios.post(`${BASE_URL}/contactUsMail`, formData)

            if (creat_mint.status == 200) {
                toast.success('Contact send successfull !', {
                    position: "top-center",
                    theme: "colored",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setTimeout(() => {
                    window.location.reload()
                }, 5000)
            }else{
                toast.error('Somethings went wrong !', {
                    position: "top-center",
                    theme: "colored",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    }

  return (
    <div>
        <Header/>

        <section className='mx-auto my-5 px-5'>
            <Container>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h2 className='mb-5'>Contact Us</h2>

                        <div className='contact_form'>
                            <Form>
                                <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Name" onChange={(e) => setName(e.target.value)}/>
                                    <p className='required-text' id="namecheck">Please Enter Name </p>
                                </Form.Group>
                                <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Email-Id</Form.Label>
                                    <Form.Control type="email" placeholder="Email-Id" onChange={(e) => setEmail(e.target.value)}/>
                                    <p className='required-text' id="emailcheck">Please Enter Email-Id </p>
                                </Form.Group>
                                <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Subject</Form.Label>
                                    <Form.Control type="text" placeholder="Subject" onChange={(e) => setSubject(e.target.value)}/>
                                    <p className='required-text' id="subjectcheck">Please Enter Subject </p>
                                </Form.Group>
                                <Form.Group className="mb-4" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Message</Form.Label>
                                    <Form.Control as="textarea" rows={3} onChange={(e) => setMessage(e.target.value)}/>
                                    <p className='required-text' id="msgcheck">Please Enter Message </p>
                                </Form.Group>
                                <div className="d-grid">
                                    <Button variant="primary" size="md" className='send_btn'  onClick={sendContact}>
                                        Send
                                    </Button>
                                </div>
                               
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>

        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />

        <Footer/>
    </div>
  )
}

export default Contact