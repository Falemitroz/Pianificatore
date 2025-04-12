import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import Modal from "../components/Modal";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"

const Login = () => {

    const { login } = useContext(AuthContext);

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState("");
    const [ showModal, setShowModal ] = useState(false);

    const navigate=useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            console.log("Login effettuato con successo");
        } catch (error) {
            setError(error.message);
            setShowModal(true);
        }
    };

    return (
        
        <div className="logintext"> 
        <IoIosCloseCircleOutline onClick={() => navigate("/")} className="hometext" />
        
            <h2>Login</h2>

            <Modal 
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Errore di Login"
            >
                {error}
            </Modal>

            <form onSubmit={handleLogin}>
                <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email" 
                    required/>            
                <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password" 
                    required/>
                <button type="submit">Login</button>            
            </form>
            <a href="/signup">Non hai un account? Registrati.</a>
        </div>
    );
};

export default Login;