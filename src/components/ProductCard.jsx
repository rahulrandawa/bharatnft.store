import React, { useState, useEffect, useRef } from 'react'
import { Card } from 'react-bootstrap'
import { FaUserCircle } from 'react-icons/fa'
import featured from '../assets/img/featured.jpg'
import { Link } from 'react-router-dom'
import ethereum from '../assets/img/ether.svg'
import bnb from '../assets/img/bnb.png'
import { BiTimeFive } from 'react-icons/bi';
import { BsFillPlayFill } from 'react-icons/bs';
import { AiOutlinePause } from 'react-icons/ai';

function ProductCard(props) {
    const [audioStatus, changeAudioStatus] = useState(false);
    const myRef = useRef();
    console.log("namenamename", props.username)

    var link = `/prod_detail?id=${props.id}`
    var name = props.name
    var image = props.image
    var userProfile = props.userProfile
    var username = props.userFullName
    var price = props.price
    var category = props.category
    var auction_left_date = props.auction_left_date
    var mint_type = props.mint_type
    var chain = props.chain
    console.log("chain", props.id)

    var e_fileName = props.image;
    var e_fileExtension = e_fileName.split(/[#?]/)[0].split('.').pop().trim();

    const startAudio = () => {
        myRef.current.play();

        changeAudioStatus(true);
    };

    const pauseAudio = () => {
        console.log("here");
        myRef.current.pause();
        changeAudioStatus(false);
    };
    return (
        <>
            {/* <div className="card-container"> */}
            <Card className='mt-4'>
            <div className='product_audio_btn_wrap'>
                                            {audioStatus ? (
                                                <button onClick={pauseAudio}><AiOutlinePause /></button>
                                            ) : (
                                                <button onClick={startAudio}><BsFillPlayFill /></button>
                                            )}
                                        </div>
                                     
                <Link to={link}>
                    <div className="nft_img_div">
                        {/* <Card.Img src={image} /> */}
                        {(() => {
                            if (e_fileExtension == 'mp3') {
                                return (
                                   
                                    <div className='product_audio_wrap'>
                                        <img src={props.preview_image} alt="featured" style={{ height: "250px", width:"100%", borderRadius:"10px" }} />
                                        <audio ref={myRef} controls controlsList="nodownload noplaybackrate" autoplay style={{ width: "280px" }}>
                                            <source src={image} type="audio/ogg"></source>
                                            <source src={image} type="audio/mpeg"></source>
                                            Your browser does not support the audio element.
                                        </audio>
                                    </div>
                                  
                                )
                            } else if (e_fileExtension == 'mp4') {
                                return (
                                    <video width="320" height="240" controls autoplay className='img-fluid'>
                                        <source src={image} type="video/mp4"></source>
                                        Your browser does not support the audio element.
                                    </video>
                                )
                            } else {
                                return (
                                    <Card.Img src={image} />
                                )
                            }
                        })()}
                    </div>

                    <div>
                        <Card.Body>
                            <div className="nft_main_div">
                                <div className="nft_left_div">
                                    <div className="category_name">{category}</div>
                                    <div className="nft_name"><h6>{name}</h6></div>
                                    <div className="buy_now_text">Buy now</div>
                                </div>
                                <div className="nft_right_div">
                                    <div className="price_text">Price</div>
                                    <div className="nft_price">
                                        {
                                            (() => {
                                                if (chain === "BNB") {

                                                    return (
                                                        <img src={bnb} alt="img" className='img-fluid me-1' />
                                                    )
                                                } else {
                                                    return (
                                                        <img src={ethereum} alt="img" className='img-fluid me-1' />
                                                    )
                                                }
                                            })()
                                        }
                                        <strong>{price}</strong>
                                    </div>
                                    <div className="nft_auction_time">
                                        {
                                            (() => {
                                                if (mint_type === "2" && auction_left_date != "" && auction_left_date != " ") {
                                                    return (
                                                        <BiTimeFive />
                                                    )
                                                } else {
                                                    return null
                                                }
                                            })()
                                        }
                                        <span>{auction_left_date}</span>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </div>
                </Link>
            </Card>
            {/* <div class="overlay">
                <div class="text">Hello World</div>
            </div>
         </div> */}

        </>


    )
}

export default ProductCard