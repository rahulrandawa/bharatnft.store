import React, { useState } from 'react';

import Header from './Header'
import Banner from './Banner'
import Trending from './Trending'
import Explore from './Explore'
import TopCreators from './TopCreators'
import Footer from './Footer'
import Timer from './Timer';




function App() {
  return (
    <div className="App">
      {/* <div id='stars'></div>
      <div id='stars2'></div>
      <div id='stars3'></div> */}
      <div>
        <span>
          <Header/>
          <Banner/>
          <Trending/>
          <Explore/>
          <TopCreators/>
          <Footer/>
        </span>
        {/* <Timer currentTime={'06-09-2022  11:07 am'} /> */}
      </div>
      
 </div>
  );
}

export default App;
