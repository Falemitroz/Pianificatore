import React from 'react';
import '../styles/home.css';
import { useNavigate } from 'react-router-dom';
import { GiTakeMyMoney } from "react-icons/gi";
import { GiThreeFriends } from "react-icons/gi";
import { IoAirplaneOutline } from "react-icons/io5";
import { BiHotel } from "react-icons/bi";
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import backgroundImg from '../assets/viaggi-di-gruppo.jpg';


const Home = () => {

 const navigate=useNavigate();

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
      <ResponsiveAppBar />

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
        <button className="hero-button" onClick={() => navigate("/login")}>Accedi</button>
        <button className="hero-button" onClick={() => navigate("/signup")}>Registrati</button>
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
          
            
        </>
        
    );
};

export default Home;