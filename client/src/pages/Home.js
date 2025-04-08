import React from 'react';
import ExpenseItem from '../components/ExpenseItem';
import '../styles/home.css';


import ResponsiveAppBar from '../components/ResponsiveAppBar';
import backgroundImg from '../assets/viaggi-di-gruppo.jpg';


const Home = () => {

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
      </div>
    </div>
  
            <a href='/login'>Accedi</a>
            <a href='/dashboard'>Dashboard</a>
            <button>{<ExpenseItem />}</button>
        </>
        
    );
};

export default Home;