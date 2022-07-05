

import React,{useState, useEffect, useRef} from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Timer = (props) => {
   const [timerDays, setTimerDays] = useState("00")
   const [timerHours, setTimerHours] = useState("00")
   const [timerMinutes, setTimerMinutes] = useState("00")
   const [timerSeconds, setTimerSeconds] = useState("00")

   let interval = useRef();

   const startTimer = ()=>{
     const countdownDate = new Date(props.currentTime).getTime();
     interval = setInterval(()=>{
      const now = new Date().getTime();
      const distance  = countdownDate - now;

      const days = Math.floor(distance/ (1000*60*60*24));
      const hours = Math.floor((distance% (1000*60*60*24)/(1000*60*60)));
      const minutes = Math.floor((distance% (1000*60*60))/(1000*60));
      const seconds = Math.floor((distance% (1000*60))/1000);

      if(distance<0){
        clearInterval(interval.current);
        // document.getElementById("message").style.display = "block";
        // document.getElementById("timer").style.display = "none";
      }else{
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
        // document.getElementById("message").style.display = "none";
      }

     },1000)
   }

   useEffect(()=>{
     startTimer();
     return()=>{
      clearInterval(interval.current);
     }
   })
    return (
        <>
            <Container>
                <Row>
                    <Col lg={12} className="px-0">
                        <div>
                         <div id='message' style={{display:"none"}}>Expired</div>
                            <div className='countdown-wrapper' style={{display:"flex"}} id="timer">
                                <div className='time-section'>
                                    <div className='time'>{timerDays}</div>
                                    <small className="time-text">Days</small>
                                </div>
                                <div className='time-sections  '>
                                    <div className='time point'>:</div>
                                </div>
                                <div className='time-section'>
                                    <div className='time'>{timerHours}</div>
                                    <small className="time-text">Hours</small>
                                </div>
                                <div className='time-sections'>
                                    <div className='time point'>:</div>
                                </div>
                                <div className='time-section'>
                                    <div className='time'>{timerMinutes}</div>
                                    <small className="time-text">Minutes</small>
                                </div>
                                <div className='time-sections'>
                                    <div className='time point'>:</div>
                                </div>
                                <div className='time-section'>
                                    <div className='time'>{timerSeconds}</div>
                                    <small className="time-text">Seconds</small>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}



export default Timer;