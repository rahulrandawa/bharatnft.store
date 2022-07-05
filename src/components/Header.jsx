import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Form, FormControl } from 'react-bootstrap'
import logo from '../assets/img/bharat-token.png'
import { FaSearch,FaUserCircle } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
// import { CONTACT_ADDRESS, Abi } from '../contract/bhartnft';
import Web3 from "web3";
import axios from 'axios';
import Noty from "../Noty";
// var BASE_URL = "http://148.72.244.170:5001"
var BASE_URL = process.env.REACT_APP_BASE_URL
console.log("API_URL", BASE_URL)

const web3_Stake = new Web3(window.ethereum);

function Header() {
  const [checkAddress, setcheckAddress] = useState("");
  const [eth_balance, setEthBalance] = useState("")
  const [logoutbtn, setLogoutbtn] = useState(false);
  const [search, setSearch] = useState("")
  const [data, setNftData] = useState([])
  const [userData, setUserData] = useState([])

  const [show, setShow] = useState(false);
  const [chain, setChainId] = useState("");
  const [chainNetwork, setChainNetwork] = useState("");
  const [count_notification, setCountNotification] = useState("");
  const [userAddressFourDegit, setUserAddFourDigit] = useState("");
  let navigate = useNavigate()
  const userDetail = JSON.parse(sessionStorage.getItem('user'))
  if (userDetail){
    var user_id = userDetail.id;
  }else{
    var user_id = "";
  }
  async function openMetamask() {
    window.ethereum.enable().then(async (address) => {
      var loginUserAdd = address[0];
      sessionStorage.setItem("loginUserAdd", loginUserAdd);
      console.log("loginUserAddress1loginUserAddress1", loginUserAdd);
      var ethBalance = await (await web3_Stake.eth.getBalance(loginUserAdd))
      ethBalance = Web3.utils.fromWei(ethBalance, 'ether').slice(0,6);
      console.log("ethBalance", ethBalance)
      if (ethBalance) {
        sessionStorage.setItem("ethBalance", ethBalance);
      }
      var chainId =  window.ethereum.chainId;

      
     if(chainId == 0x4){
       var chain = "ETH";
       setChainId(chain)
     }else if (chainId == 0x61){
      var chain = "BNB";
      setChainId(chain)
     }
     if (chainId) {
      sessionStorage.setItem("chainNetwork", chain);
     }
     

     
      const formData = new FormData();
      formData.append("wallet_address", loginUserAdd);
      
      var signature = ""
      // var connect_user = await axios.post(`http://148.72.244.170:5001/user/connect`, {id:loginUserAdd, signature:signature})
      var connect_user = await axios.post(`${BASE_URL}/login`, formData)

     console.log("connect_user",connect_user.data.result)
     sessionStorage.setItem("user", JSON.stringify(connect_user.data.result));
    
    const userDetail = JSON.parse(sessionStorage.getItem('user'))
    window.location.reload()
    });
  }
console.log("userDetailuserDetail",userDetail)
//   const networkChanged = (chainId) => {
//     console.log("chainIdgghj", chainId);

//     if (chainId == "4") {
//         window.ethereum.enable().then((address) => {
//             var loginUserAdd = address[0];
//             sessionStorage.setItem("loginUserAdd", loginUserAdd);
//         });

//         window.location.reload();
//     }
// };


  useEffect(() => {
    const getethBalance = sessionStorage.getItem('ethBalance')
    console.log("getethBalance",getethBalance)
    // const userDetail = JSON.parse(sessionStorage.getItem('user'))

    // setAuthUserDetail(userDetail)
    if (getethBalance) {
      setEthBalance(getethBalance)
      setLogoutbtn(true)
    }
  },[])

 
  useEffect(() => {
    // =============================== SHOW ADDRESS BY COOKIE ==============================================
    let checkAddress = sessionStorage.getItem('loginUserAdd')
    console.log("sessionStorageeeeeeeeeeeeeeeeeeeeeeee", checkAddress)
    // setUserAddFourDigit(checkAddress.slice(38, checkAddress.length))
    setcheckAddress(checkAddress)
    
    var chainNetwork = sessionStorage.getItem('chainNetwork')
  setChainNetwork(chainNetwork)
  
  }, []);


  const countNotification = async () => {
    const res = await axios.get(BASE_URL + '/count_notification?id=' + user_id)
    
    setCountNotification(res.data.result.count_notifiation)
  }
  useEffect( () => {
    countNotification()
  }, [])


  async function logoutMetamask() {
    console.log("click me")
    sessionStorage.clear()
    navigate("/")
    window.location.reload()
  }


  async function updateNotifications() {
      console.log("updateNotifications")
      var update_notification = await axios.get(BASE_URL + '/updateNotification?id=' + userDetail.id )
      navigate("/profile")
      window.location.reload()
  }

  const onKeyUp = async (e) => {
    var query = e
    if(query.length === 0){
      setNftData([])
      document.getElementById("search_box").style.display="none"
    }else{

      const formData = new FormData();
      formData.append("word", query);

      var searchData = await axios.post(`${BASE_URL}/searchNFT`, formData)

      if(searchData.data.status == 200){
        setNftData(searchData.data.result)
        document.getElementById("search_box").style.display="block"
      }
      else{
        setNftData()
        document.getElementById("search_box").style.display="block"
      }

    }
   
  }
 
  async function handleSearch (e){
    navigate(`/prod_detail?id=${e.id}`)
    window.location.reload()
  }

  

  console.log("userDatauserData", userData.profileImage)
  console.log("search data", data)
  
  return (
    <div className='header'>
    <Navbar expand="lg" className='cus_navbar' variant="dark">
      <Container>
        <Link to='/'><img src={logo} alt="logo" className="logo" style={{filter: "invert(1)"}} /></Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <div class="header_right w-40">
            <div className="form-sec">
              <FaSearch />
              <FormControl
                type="search"
                placeholder="Search items and account"
                className="search-input me-2"
                // onChange={(e) => setSearch(e.target.value)} 
                onKeyUp={(e)=>onKeyUp(e.target.value)}
              />
              
            </div> 
            <div className='search_data_box' id='search_box'>
                {data?
                    data.map((e) => {
                        // console.log("eeee", e)
                        return (
                          <div>
                            <div className='' onClick={() => handleSearch(e)}>{e.name}</div>
                          </div>
                        )
                    })
                    :
                    <div>
                      <div className=''>No Result Found</div>
                    </div>
                    } 
            </div> 
          </div>
          <Nav>

            {logoutbtn ?
              
              <div className='header_login'>
 
                <div className='header_wallet_adddress'> 
                   <span> {checkAddress.slice(0, 5)}...{checkAddress.slice(-4, checkAddress.length)}</span>
                </div>
                <div> <Link type="button" class="btn btn-outline-secondary me-5" to='/create'>Create</Link></div>
                <div><Link type="button" class="btn btn-outline-secondary" to='/' onClick={logoutMetamask}>Logout</Link></div>
                <div><button type="button" class="btn btn-outline-secondary" >{eth_balance} {chainNetwork}</button></div>
                <div onClick={updateNotifications}>
                 <Noty width={"30px"} color={"#122C34"} count={count_notification} />
               </div>
                {/* <div><Link type="button" className='user-icon' to='/profile'> <FaUserCircle /></Link></div> */}
                <div>
                  <Link type="button" className='user-icon' to='/profile'>
                  <img src={userDetail? userDetail.profileImage : ""} alt=""className="img-fluid profile_nft_img" />
                  </Link>
                </div>

                {/* <img src={userProfile} alt=""className="img-fluid profile_nft_img" /> */}
             
                
              </div>
              :
              
              <button type="button" class="btn btn-outline-secondary" onClick={openMetamask} style={{"background-color": "#4b50e6","color":" white"}}>Connect with Metamask</button>
            }
          </Nav>
          
          <div className='login-btn'>




            {/*<Link type="button" class="btn btn-outline-secondary" to=''>Ethereum</Link>*/}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Header