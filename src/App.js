import React, { useState, useEffect }  from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.css';
import Home from './components/Home'
import Create from './components/Create'
import CreatePost from './components/CreatePost'
import Contact from './components/Contact'
import Term from './components/Term'
import About from './components/About'
import Privacy from './components/Privacy'
import Profile from './components/Profile'
import Prod_detail from './components/Prod_detail.jsx'
import Edit_profile from './components/Edit-profile.jsx'
import User_profile from './components/UserProfile.jsx'
import Web3 from "web3";
import axios from 'axios';
import { BrowserRouter, Routes,Route, useNavigate } from "react-router-dom";
import AllNFT from './components/AllNFT';
import AllUsers from './components/AllUsers';
import {Modal} from 'react-bootstrap'
var BASE_URL = process.env.REACT_APP_BASE_URL
console.log("API_URL", BASE_URL)

const web3_Stake = new Web3(window.ethereum);


function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [checkAddress, setcheckAddress] = useState("");
  const [eth_balance, setEthBalance] = useState("")
  const [logoutbtn, setLogoutbtn] = useState(false);
  const [search, setSearch] = useState("")
  const [data, setNftData] = useState([])
  const [userData, setUserData] = useState([])
  const [chain, setChainId] = useState("");
  const [chainNetwork, setChainNetwork] = useState("");

  async function check() {
    const provider = window.ethereum;
    if(provider){
      try {
        // const binanceTestChainId = '0x61'
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x4'}],
        });

        console.log("You have succefully switched to Binance Test network")
        checkConnection();
      } catch (switchError) {
        console.log("Failed to switch to the network")
      }
    }else{
      console.log("not ")
      setShow(true)
    }
  }
    
  const provider = window.ethereum;
  function connect() {
    window.ethereum
    .request({ method: 'eth_requestAccounts' })
    .then(handleAccountsChanged)
    .catch((err) => {
      if (err.code === 4001) {
        console.log('Please connect to MetaMask.');
      } else {
        console.error(err);
      }
    });
  }

  function checkConnection() {
    console.log("You're not connected to checkConnection");
    window.ethereum.request({ method: 'eth_accounts' }).then(handleAccountsChanged).catch(console.error);
  }

  function handleAccountsChanged(accounts) {
    console.log("accounts",accounts);

    if (accounts.length === 0) {
      console.log("You're not connected to MetaMask");
      window.ethereum.enable().then(async (address) => {
          var loginUserAdd = address[0];
          sessionStorage.setItem("loginUserAdd", loginUserAdd);
          console.log("loginUserAddress1loginUserAddress1", loginUserAdd);
          var ethBalance = await (await web3_Stake.eth.getBalance(loginUserAdd))
          console.log("ethBalance", ethBalance)
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
          
        var connect_user = await axios.post(`${BASE_URL}/login`, formData)
      
        console.log("connect_user",connect_user.data.result)
        sessionStorage.setItem("user", JSON.stringify(connect_user.data.result));
        
        window.location.reload()
      });
    } else {
      var currentAccount = accounts[0];
      console.log("currentAccount",currentAccount);
    }
  }

  useEffect(() => {
    check();
    const userDetail = JSON.parse(sessionStorage.getItem('user'))
    console.log("userDetailllllllllllllllllllllllllllll",userDetail)
    
    
    // check();
    
    // const userDetail = JSON.parse(sessionStorage.getItem('user'))
    // console.log("userDetailllllllllllllllllllllllllllll",userDetail)
   
  },[])
  return (
    <div>
    {/* <BrowserRouter  basename='/bharat_nft/'> */}
    <BrowserRouter  basename='/'>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/term" element={<Term />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/prod_detail" element={<Prod_detail />} />
            <Route path="/all_nft" element={<AllNFT/>} />
            <Route path="/all_users" element={  <AllUsers/>} />
            <Route path="/edit_profile" element={<Edit_profile />} />
            <Route path="/User_profile" element={<User_profile />} />
          
        </Routes>
    </BrowserRouter>
    <Modal show={show} onHide={handleClose}  size="lg">
        <Modal.Header closeButton>
          <Modal.Title>How to Install and Use Metamask</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p class="mx-4" style={{color: "black"}}> <b>Step 1:</b> Go to Chrome Web Store Extensions Section.</p>
            <p class="mx-4" style={{color: "black"}}> <b>Step 2:</b> Search MetaMask.</p>
            <p class="mx-4" style={{color: "black"}}> <b>Step 3:</b> Check the number of downloads to make sure that the legitimate MetaMask is being installed, as hackers might try to make clones of it.</p>
            <p class="mx-4" style={{color: "black"}}> <b>Step 4:</b> Click the Add to Chrome button.</p>
            <p class="mx-4" style={{color: "black"}}> <b>Step 5:</b> Once installation is complete this page will be displayed. Click on the Get Started button.</p>
            <p class="mx-4" style={{color: "black"}}> <b>Step 6:</b> This is the first time creating a wallet, so click the Create a Wallet button. If there is already a wallet then import the already created using the Import Wallet button.</p>
            <p class="mx-4" style={{color: "black"}}> <b>Step 7:</b> Click I Agree button to allow data to be collected to help improve MetaMask or else click the No Thanks button. The wallet can still be created even if the user will click on the No Thanks button.</p>
            <p class="mx-4" style={{color: "black"}}> <b>Step 8:</b> Create a password for your wallet. This password is to be entered every time the browser is launched and wants to use MetaMask. A new password needs to be created if chrome is uninstalled or if there is a switching of browsers. In that case, go through the Import Wallet button. This is because MetaMask stores the keys in the browser. Agree to Terms of Use.</p>
            <p class="mx-4" style={{color: "black"}}> <b>Step 9:</b> Click on the dark area which says Click here to reveal secret words to get your secret phrase. </p>
            <p class="mx-4" style={{color: "black"}}> <b>Step 10:</b> This is the most important step. Back up your secret phrase properly. Do not store your secret phrase on your computer. Please read everything on this screen until you understand it completely before proceeding. The secret phrase is the only way to access your wallet if you forget your password. Once done click the Next button. </p>
            <p class="mx-4" style={{color: "black"}}> <b>Step 11:</b> Click the buttons respective to the order of the words in your seed phrase. In other words, type the seed phrase using the button on the screen. If done correctly the Confirm button should turn blue.</p>
            <p class="mx-4" style={{color: "black"}}> <b>Step 12:</b> Click the Confirm button. Please follow the tips mentioned.</p>
            <p class="mx-4" style={{color: "black"}}> <b>Step 13:</b> One can see the balance and copy the address of the account by clicking on the Account 1 area.</p>
            <p class="mx-4" style={{color: "black"}}> <b>Step 14:</b> One can access MetaMask in the browser by clicking the Foxface icon on the top right. If the Foxface icon is not visible, then click on the puzzle piece icon right next to it.</p>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default App

// basename='/bharat_nft/'