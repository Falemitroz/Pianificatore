import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GiTakeMyMoney } from "react-icons/gi";
import { GiThreeFriends } from "react-icons/gi";
import { IoAirplaneOutline } from "react-icons/io5";
import { BiHotel } from "react-icons/bi";
import backgroundImg from '../assets/viaggi-di-gruppo.jpg';
import AuthContext from '../context/AuthContext';
import { IoLogoAndroid } from "react-icons/io";
import { IoLogoApple } from "react-icons/io";
import { FaCcVisa, } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";
import { FaCcAmex } from "react-icons/fa6";
import { BsPaypal } from "react-icons/bs";
import { FaCcApplePay } from "react-icons/fa";
import { FaGooglePay } from "react-icons/fa6";

import '../styles/Home.css';

const Home = () => {

const { user } = useContext(AuthContext);

const footer = document.getElementById("footer"); 
   


 const navigate = useNavigate();

  const icons = [
    {
      icon: <GiThreeFriends />,
      label: 'Collabora con i tuoi amici',
    }, 
    {
      icon: <GiTakeMyMoney />,
      label: 'Organizza le tue spese',
    }, 
    {
      icon: <IoAirplaneOutline />,
      label: 'Confronta i voli migliori',
    }, 
    {
      icon: <BiHotel />,
      label: 'Scegli il tuo alloggio',
    }, 
  
  ];

  
  
    return (
        <>
        <div>

            {/* Immagine di sfondo con testo sopra */}
            <div
                style={{
                position: 'relative',
                width: '100%',
                height: '90vh',
                backgroundImage: `url(${backgroundImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                }}
            >
            <h1
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                textShadow: '1px 1px 5px rgba(0,0,0,0.8)',
            }}
            >
            Organizza il tuo viaggio insieme ai tuoi amici
            </h1>
            <div
            style={{
            position: 'absolute',
            top: '70%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            alignItems: 'center',
            }}
            >
        {!user && 
            <button className="hero-button" onClick={() => navigate("/signup")}>
                Inizia ora
            </button>
        }
</div>

        </div>

        </div>
        
        <div>    
            <h2>
                PlanFriendsTrip è il sito che fa per voi!
            </h2>
        </div>
      
        <div className="icon-grid">
            {icons.map((item, index) => (
                <div className="icon-button" key={index}>
                    <div className="icon-button-icon">{item.icon}</div>
                    <h3 className="icon-button-label">{item.label}</h3>
                </div>
            ))}
        </div>

        <footer className="footer">
      <div className="app-section">
        <h2>Scarica la nostra app</h2>
        <div className="icons">
          <IoLogoAndroid />
          <IoLogoApple />
        </div>
      </div>

      <div className="info-section">
        <h2>Per conoscerci:</h2>
        <p>Chi siamo</p>
        <p>Condizioni generali</p>
        <p>Informativa sulla privacy</p>
        <p>Cookie policy</p>
        <p>Gestisci i cookie</p>
      </div>


       <div className="pay-section">
        <h2>
           Puoi pagare tramite:
        </h2>
        <div className="icons">
        <FaCcVisa />
        <FaCcMastercard />
        <FaCcAmex />
        <BsPaypal />
        <FaCcApplePay />
        <FaGooglePay />
        </div>
     </div> 
    </footer>

        </>
        
    );
};

export default Home;
