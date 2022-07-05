import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import { FaHourglassStart } from 'react-icons/fa'
import { FaDoorOpen } from 'react-icons/fa'
import { FaTag } from 'react-icons/fa'
import ProductCard from './ProductCard'
import axios from 'axios';


// var BASE_URL = "http://148.72.244.170:5000"
var BASE_URL = process.env.REACT_APP_BASE_URL
console.log("API_URL", BASE_URL)

function Trending() {
    const [NftTrending, setTrending] = useState([]);
    const [image4, setImage4] = useState("")
    const [filteredData, setFilteredData] = useState([])
    const [show, setShow] = useState(true)

    // console.log("NftTrending", NftTrending)

    async function trending() {
        await axios.get(`${BASE_URL}/getTrending`).then((data) => {
            console.log("tending data", data)
            setTrending(data.data.result)

        }).catch(err=>{
            console.log("tending err", err)
        })

    }

    useEffect(() => {
        trending()
    }, [])

    console.log("trending data", NftTrending)
    let timedAuction = NftTrending.filter(e => e.mint_type === "2")
    let fixedPrice = NftTrending.filter(e => e.mint_type === "1")

    const handleTimeAuction = () => {
        setFilteredData(timedAuction)
        setShow(false)
    }

    const handleFixedPrice = () => {
        setFilteredData(fixedPrice)
        setShow(false)
    }

    // console.log("e.price.category NftTrending", NftTrending,timedAuction)

    return (
        <section className='trending-section'>
            <Container>
                <Row>
                    <Col sm={2}>
                        <h4 className='collection-title'>Trending</h4>
                    </Col>
                    <Col sm={10} className='d-flex justify-content-end align-items-center'>
                        <div>
                            <Button size="sm" variant="outline-primary" className='collection-btn me-2 trending_btn' onClick={handleTimeAuction}><FaHourglassStart /> Timed Auctions</Button>
                            {/* <Button size="sm" variant="outline-primary" className='collection-btn me-2 trending_btn'><FaDoorOpen /> Open for bids</Button> */}
                            <Button size="sm" variant="outline-primary" className='collection-btn trending_btn' onClick={handleFixedPrice}><FaTag /> Fixed Price </Button>
                        </div>
                    </Col>
                </Row>
                <Row>

                    {show ?
                        (
                            (NftTrending.length === 0) ?
                                <Row className='mt-4'>
                                    <Col lg={12} md={12}>
                                        <div className='filter_data_card text-center py-5'>
                                            <p>No NFT's Available</p>
                                        </div>
                                    </Col>
                                </Row>

                                :

                                NftTrending.map((e, index) => {

                                    if (index < 4) {
                                        return (
                                            <Col lg={3} md={6}>
                                                <ProductCard
                                                    price={e.price}
                                                    image={e.image}
                                                    userFullName={e.userFullName}
                                                    name={e.name}
                                                    username={e.username}
                                                    id={e.id}
                                                    category={e.category}
                                                    userProfile={e.userProfile}
                                                    mint_type={e.mint_type}
                                                    auction_left_date={e.auction_left_date}
                                                    chain={e.chain}
                                                    preview_image={e.preview_image}
                                                />
                                            </Col>
                                        )
                                    }


                                })
                        )
                        :
                        (
                            (filteredData.length === 0) ?
                                <Row className='mt-4'>
                                    <Col lg={12} md={12}>
                                        <div className='filter_data_card text-center py-5'>
                                            <p>No NFT's Available</p>
                                        </div>
                                    </Col>
                                </Row>

                                :
                                filteredData.map((e) => {
                                    return (
                                        <Col lg={3} md={6}>
                                            <ProductCard
                                                price={e.price}
                                                image={e.image}
                                                userFullName={e.userFullName}
                                                name={e.name}
                                                username={e.username}
                                                id={e.id}
                                                category={e.category}
                                                userProfile={e.userProfile}
                                                mint_type={e.mint_type}
                                                auction_left_date={e.auction_left_date}
                                                chain={e.chain}
                                                preview_image={e.preview_image}
                                            />
                                        </Col>
                                    )
                                })

                        )
                    }

                </Row>

            </Container>


        </section>
    )
}

export default Trending