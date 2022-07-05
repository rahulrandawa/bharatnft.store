import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap'
import ProfileImg from '../assets/img/Profile.png'
import { FaGlobe } from 'react-icons/fa'
import { FaDiscord } from 'react-icons/fa'
import { FaFacebook } from 'react-icons/fa'
import { FaSnapchatGhost } from 'react-icons/fa'
import { FaTiktok } from 'react-icons/fa'
import { FaCommentDots } from 'react-icons/fa'
import { FaYoutube } from 'react-icons/fa'
import {BsCameraFill} from 'react-icons/bs'
import {MdClose} from 'react-icons/md'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'


// var BASE_URL = "http://148.72.244.170:5001"
var BASE_URL = process.env.REACT_APP_BASE_URL
console.log("API_URL", BASE_URL)

function Edit_profile() {
    var [walletAddress, setwalletAddress] = useState("");
    var [name, setName] = useState("");
    var [username, setUserName] = useState("");
    var [bio, setBio] = useState("");
    var [website, setLink] = useState("");
    var [discord, setDiscord] = useState("");
    var [facebook, setFacebook] = useState("");
    var [snapChat, setSnapchat] = useState("");
    var [tiktok, setTiktok] = useState("");
    var [twitch, setTwitch] = useState("");
    var [youtube, setYoutube] = useState("");
    var [User, setUser] = useState("")
    var [createDate, setCreateDate] = useState("")
    const [imageprev, setImageprev] = useState("");
    var [profileImage, setProfileImage] = useState("")



    var [FollowerCount, setFollowerCount] = useState("");
    var [FollowingCount, setFollowingCount] = useState("");

    var user = JSON.parse(sessionStorage.getItem("user"))
    var loginUserAdd = sessionStorage.getItem("loginUserAdd")
    let navigate = useNavigate()



    async function getUserProfile() {  

        let checkAddress = sessionStorage.getItem('loginUserAdd')
        console.log("Userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",User);
        console.log("uuuuuuuuuuuuuuuuuuuuuuuuuuuuuserrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",user);

        var config = {
            headers: {
                Authorization: user.token
            }
        }
        // console.log("config", config)
        // var data = await axios.post(`${BASE_URL}/user/user`, { id: user.user.id }, config)

        const formData = new FormData();
        formData.append("user_address", checkAddress);
        var getPRofile = await axios.post(`${BASE_URL}/getProfile`, formData)

        setUser(getPRofile.data.result)
       
        setUser(getPRofile.data.result.user)
        setName(getPRofile.data.result.name)
        setUserName(getPRofile.data.result.username)
        setBio(getPRofile.data.result.bio)
        setLink(getPRofile.data.result.links)
        setDiscord(getPRofile.data.result.discord_link)
        setFacebook(getPRofile.data.result.facebook_link)
        setSnapchat(getPRofile.data.result.snapchat)
        setTiktok(getPRofile.data.result.tiktok_link)
        setTwitch(getPRofile.data.result.twich_link)
        setYoutube(getPRofile.data.result.youtube_link)
        setFollowerCount(getPRofile.data.result.followerCount)
        setFollowingCount(getPRofile.data.result.followingCount)
        setProfileImage(getPRofile.data.result.profileImage)
        setCreateDate(getPRofile.data.result.joined_date)
    }

    useEffect(() => {
        if (loginUserAdd) {
            setwalletAddress(loginUserAdd)
            getUserProfile()
        }

        const userDetail = JSON.parse(sessionStorage.getItem('user'))
        if (userDetail == "" || userDetail == null) {
            navigate("/")
        }
    }, [])


    async function UpdateProfile(e) {
        let checkAddress = sessionStorage.getItem('loginUserAdd')
        console.log("user_walletAddress",checkAddress);

        if (!name || name === "") {
            // setName(User.name)
            name = user.name ? user.name : "";
        }
        if (!username || username === "") {
            username = user.username ?  user.username : "";
        }
        if (!bio || bio === "") {
            bio = user.bio ?  user.bio : "";
        }
        if (!website || website === "") {
            website = user.links ?  user.links : "";
        }
        if (!discord || discord === "") {
            discord = user.discord_link ?  user.discord_link : "";
        }
        if (!youtube || youtube === "") {
            youtube = user.youtube_link ?  user.youtube_link : "";
        }
        if (!facebook || facebook === "") {
            facebook = user.facebook_link ?  user.facebook_link : "";
        }
        if (!twitch || twitch === "") {
            twitch = user.twich_link  ?  user.twich_link : "";
        }
        if (!tiktok || tiktok === "") {
            tiktok = user.tiktok_link  ?  user.tiktok_link : "";
        }
        if (!snapChat || snapChat === "") {
            snapChat = user.snapchat  ?  user.snapchat : "";
        }
        

        const formData = new FormData();

        formData.append("user_address", checkAddress);
        formData.append("name", name);
        formData.append("username", username);
        formData.append("bio",bio);
        formData.append("links",website);
        formData.append("discord_link", discord);
        formData.append("facebook_link", facebook);
        formData.append("snapchat", snapChat);
        formData.append("twich_link", twitch);
        formData.append("youtube_link", youtube);
        formData.append("tiktok_link", tiktok);

        // formData.append("profileImage", profileImage, profileImage.name);

        formData.append("image", profileImage);
        
        var isImage = formData.getAll("image")
        console.log("isImage",isImage);
        console.log("formDataisImage",typeof(isImage[0]))
        if(typeof(isImage[0]) === "object"){
            formData.append("profileImage", profileImage, profileImage.name);
        }

        var updateProfile = await axios.post(`${BASE_URL}/updateProfile`, formData)

        var status = updateProfile.data.status

        if (status === 200) {
            sessionStorage.setItem("user", JSON.stringify(updateProfile.data.result));
            toast.success('Profile Update successfully', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
            setTimeout(() => {
                navigate("/profile")
            }, 3000)

        }
    }

    const handleBack =()=>{
        navigate("/profile")
    }
   
    return (
        <div>
            <Header />

            <section class="edit-banner">
                <Container>
                    <Row>
                        <Col lg={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2}} className="border rounded shadow bg-white">            
                        <div className='close_btn mt-2' onClick={handleBack}><MdClose/></div>

                            <div className='profile-detail text-center p-4'>
                         
                                <div className="edit_profile_img">
                                {imageprev?
                                    <img src={imageprev} alt="profile_pic" className='img-fluid' />
                                    :
                                    <div>
                                    <img src={profileImage} alt="profile_pic" className='img-fluid' />
                                    <div class="wrapper">
                                        <div class="file-upload">
                                        <input type="file" id='profileImage' name='profileImage'
                                        // onChange={handleChange}
                                         onChange={(e)=>{
                                            setProfileImage(e.target.files[0])
                                            setImageprev(URL.createObjectURL(e.target.files[0]));

                                            }}
                                         />
                                            <BsCameraFill />
                                        </div>
                                    </div>
                                    </div>
                                    
                                }
                                    
                                </div>
                                <p className='mt-2'>Change Profile Picture</p>


                                <div className='mt-4 heading-name'>
                                    <InputGroup className='mb-4'>
                                        <FormControl
                                            placeholder="Full Name"
                                            aria-label="Recipient's username"
                                            aria-describedby="basic-addon2"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </InputGroup>

                                    <InputGroup>
                                        <FormControl
                                            placeholder="Username"
                                            aria-label="Recipient's username"
                                            aria-describedby="basic-addon2"
                                            value={username}
                                            onChange={(e) => setUserName(e.target.value)}
                                        />
                                    </InputGroup>
                                </div>

                                <div className='edit-profile mt-4'>
                                    <ul className='list-unstyled d-flex justify-content-around align-items-center'>
                                        <li className='mr-4'><strong>{FollowingCount}</strong> <span className='d-block'>Following</span></li>
                                        <li><strong>{FollowerCount}</strong> <span className='d-block'>Followers</span></li>
                                    </ul>
                                </div>

                                <div className='Bio mt-4 text-start'>
                                    <h6><strong>Bio</strong></h6>
                                    <hr></hr>
                                    <InputGroup>
                                        <FormControl
                                            placeholder="Bio"
                                            aria-label="Recipient's username"
                                            aria-describedby="basic-addon2"
                                            value={bio}
                                            onChange={(e) => setBio(e.target.value)}
                                        />
                                    </InputGroup>
                                </div>

                                <div className='link text-start mt-4'>
                                    <h6><strong>Links</strong></h6>

                                    <ul className='list-unstyled mt-3'>
                                        <li className='d-flex editing_icon'> <FaGlobe />
                                            <InputGroup>
                                                <FormControl
                                                    placeholder="Link"
                                                    aria-label="Recipient's username"
                                                    aria-describedby="basic-addon2"
                                                    value={website}
                                                    onChange={(e) => setLink(e.target.value)}
                                                />
                                            </InputGroup>
                                        </li>
                                        <li className='d-flex editing_icon'> <FaDiscord />
                                            <InputGroup>
                                                <FormControl
                                                    placeholder="john#0652"
                                                    aria-label="Recipient's username"
                                                    aria-describedby="basic-addon2"
                                                    value={discord}
                                                    onChange={(e) => setDiscord(e.target.value)}
                                                />
                                            </InputGroup>
                                        </li>
                                        <li className='d-flex editing_icon'> <FaFacebook />
                                            <InputGroup>
                                                <FormControl
                                                    placeholder="Johndeo"
                                                    aria-label="Recipient's username"
                                                    aria-describedby="basic-addon2"
                                                    value={facebook}
                                                    onChange={(e) => setFacebook(e.target.value)}
                                                />
                                            </InputGroup>
                                        </li>
                                        <li className='d-flex editing_icon'> <FaSnapchatGhost />
                                            <InputGroup>
                                                <FormControl
                                                    placeholder="Snapchat"
                                                    aria-label="Recipient's username"
                                                    aria-describedby="basic-addon2"
                                                    value={snapChat}
                                                    onChange={(e) => setSnapchat(e.target.value)}
                                                />
                                            </InputGroup>
                                        </li>
                                        <li className='d-flex editing_icon'> <FaTiktok />
                                            <InputGroup>
                                                <FormControl
                                                    placeholder="Tiktok"
                                                    aria-label="Recipient's username"
                                                    aria-describedby="basic-addon2"
                                                    value={tiktok}
                                                    onChange={(e) => setTiktok(e.target.value)}
                                                />
                                            </InputGroup>
                                        </li>
                                        <li className='d-flex editing_icon'> <FaCommentDots />
                                            <InputGroup>
                                                <FormControl
                                                    placeholder="Twitch"
                                                    aria-label="Recipient's username"
                                                    aria-describedby="basic-addon2"
                                                    value={twitch}
                                                    onChange={(e) => setTwitch(e.target.value)}
                                                />
                                            </InputGroup>
                                        </li>
                                        <li className='d-flex editing_icon'> <FaYoutube />
                                            <InputGroup>
                                                <FormControl
                                                    placeholder="Youtube"
                                                    aria-label="Recipient's username"
                                                    aria-describedby="basic-addon2"
                                                    value={youtube}
                                                    onChange={(e) => setYoutube(e.target.value)}
                                                />
                                            </InputGroup>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <ul className='list-unstyled d-flex justify-content-between border-top border-bottom py-2'>
                                        <li><strong>Joined</strong></li>
                                        <li><strong>{createDate.slice(0,8)}</strong></li>
                                    </ul>
                                </div>

                                <div>
                                    <button type="button" class="update_btn float-end mb-4" onClick={UpdateProfile}>Update</button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <ToastContainer
                    position="top-center"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </section>

            <Footer />
        </div>
    )
}

export default Edit_profile