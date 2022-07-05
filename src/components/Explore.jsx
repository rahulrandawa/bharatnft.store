import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import ProductCard from './ProductCard'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import $ from 'jquery'
// var BASE_URL = "http://148.72.244.170:5001"
var BASE_URL = process.env.REACT_APP_BASE_URL
console.log("API_URL", BASE_URL)


function Explore() {
    const navigate = useNavigate()
    const [NftExplore, setExplore] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [show, setShow] = useState(true)


    async function explore() {

        await axios.get(`${BASE_URL}/getAllNFT`).then((data) => {
            setExplore(data.data.result)
        })

    }

    useEffect(() => {
        explore()
    }, [])

    // console.log("e.price.category", e)

    // let artwork = NftExplore.filter(e => e.price.category === "artwork")
    // let photography = NftExplore.filter(e => e.price.category === "photography")

    // let audio = NftExplore.filter(e => e.price.category === "audio")
    // let video = NftExplore.filter(e => e.price.category === "video")
    // let collectibles = NftExplore.filter(e => e.price.category === "collectibles")

    let artwork = NftExplore.filter(e => e.category === "artwork")
    let photography = NftExplore.filter(e => e.category === "photography")
    let audio = NftExplore.filter(e => e.category === "audio")
    let video = NftExplore.filter(e => e.category === "video")
    let collectibles = NftExplore.filter(e => e.category === "collectibles")

    const handleAllNft = () => {
        // setFilteredData(NftExplore)
        navigate('/all_nft')
    }
    const handleArtWork = () => {
        setFilteredData(artwork)
        setShow(false)

    }
    const handlePhotography = () => {
        setFilteredData(photography)
        setShow(false)

    }
    const handleAudio = () => {
        setFilteredData(audio)
        setShow(false)

    }
    const handleVideo = () => {
        setFilteredData(video)
        setShow(false)

    }
    const handleCollectibles = () => {
        setFilteredData(collectibles)
        setShow(false)

    }
    console.log("filter data", filteredData)

    return (
        <section className='explore-section'>
            <Container >
                <Row>
                    <Col sm={2}>
                        <h4 className='collection-title'>Explore</h4>
                    </Col>
                    <Col sm={10} className='d-flex justify-content-end align-items-center'>
                        <div className='nft_btn'>
                            <Button size="sm" variant="outline-primary" className='collection-btn me-2' onClick={handleAllNft} >All NFTs</Button>
                            <Button size="sm" variant="outline-primary" className='collection-btn me-2' onClick={handleArtWork} >Artwork</Button>
                            <Button size="sm" variant="outline-primary" className='collection-btn me-2' onClick={handlePhotography} >Photography</Button>
                            <Button size="sm" variant="outline-primary" className='collection-btn me-2' onClick={handleAudio} >Audio</Button>
                            <Button size="sm" variant="outline-primary" className='collection-btn me-2' onClick={handleVideo} >Video</Button>
                            <Button size="sm" variant="outline-primary" className='collection-btn' onClick={handleCollectibles} >Collectibles</Button>
                        </div>
                    </Col>
                </Row>

                <Row>
                    {show ?
                        (
                            (NftExplore.length === 0) ?
                                <Row className='mt-4'>
                                    <Col lg={12} md={12}>
                                        <div className='filter_data_card text-center py-5'>
                                            <p>No NFT's Available</p>
                                        </div>
                                    </Col>
                                </Row>

                                :
                                NftExplore.map((e, index) => {
                                    // console.log("eeee", e.metadata.image)
                                    if (index < 4)
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
                                                    auction_left_date={e.auction_left_date}
                                                    mint_type={e.mint_type}
                                                    chain={e.chain}
                                                    preview_image={e.preview_image}
                                                />
                                            </Col>
                                        )
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
                                filteredData.map((e, index) => {
                                    if (index < 4)
                                        return (
                                            <Col lg={3} md={6} className="filter_data">
                                                <ProductCard
                                                    price={e.price}
                                                    image={e.image}
                                                    userFullName={e.userFullName}
                                                    name={e.name}
                                                    username={e.username}
                                                    id={e.id}
                                                    category={e.category}
                                                    userProfile={e.userProfile}
                                                    auction_left_date={e.auction_left_date}
                                                    mint_type={e.mint_type}
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

export default Explore