import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import ProductCard from './ProductCard'
import axios from 'axios';
import Footer from './Footer'
import Header from './Header'
import { FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
// var BASE_URL = "http://148.72.244.170:5001"
var BASE_URL = process.env.REACT_APP_BASE_URL
console.log("API_URL", BASE_URL)


function AllNFT() {
    const [NftExplore, setExplore] = useState([]);
    async function explore() {
        console.log("fdfsdfsdf", `${BASE_URL}/getAllNFT`)
        await axios.get(`${BASE_URL}/getAllNFT`).then(async (data) => {
            console.log("rahul_nft", data.data.result)
            setExplore(data.data.result)
        })

    }

    useEffect(() => {
        explore()
    }, [])


    // =============all nft pagination start===============
    const [currentItemsNFT, setCurrentItemsNFT] = useState(null);
    const [pageCountNFT, setPageCountNFT] = useState(0);

    const [itemOffsetNFT, setItemOffsetNFT] = useState(0);
    const itemsPerPageNFT = 8
    useEffect(() => {

        const endOffsetNFT = itemOffsetNFT + itemsPerPageNFT;

        setCurrentItemsNFT(NftExplore.slice(itemOffsetNFT, endOffsetNFT));
        setPageCountNFT(Math.ceil(NftExplore.length / itemsPerPageNFT));
    }, [itemOffsetNFT, itemsPerPageNFT, NftExplore]);

    const handlePageClickNFT = (event) => {
        const newOffsetNFT = (event.selected * itemsPerPageNFT) % NftExplore.length;
        setItemOffsetNFT(newOffsetNFT);
    };
    // =============all nft pagination end===============
    console.log("currentItemsNFT", currentItemsNFT)
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
                            (NftExplore.length === 0) ?
                                <Row className='mt-4'>
                                    <Col lg={12} md={12}>
                                        <div className='filter_data_card text-center py-5'>
                                            <p>No NFT's Available</p>
                                        </div>
                                    </Col>
                                </Row>

                                :

                                currentItemsNFT.map((e, index) => {
                                    console.log("eeee", e.price)

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
                        }
                    </Row>
                    <Row>
                        <Col lg={12}>
                            {
                                (() => {

                                    if (NftExplore.length > 8) {
                                        return (
                                            <div className="paginate mt-4">
                                                <ReactPaginate
                                                    breakLabel="..."
                                                    nextLabel=" >>"
                                                    onPageChange={handlePageClickNFT}
                                                    pageRangeDisplayed={3}
                                                    marginPagesDisplayed={2}
                                                    pageCount={pageCountNFT}
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

export default AllNFT