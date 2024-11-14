import "../assets/styles/Login.css";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
}
from 'mdb-react-ui-kit';
import React, { useState } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  
  const leerDatos = async () => {
    const endpoint = 'http://localhost:5108/api/Usuarios/VerificarInicioSesion';

    try {
      const response = await axios.post(endpoint, {
        email: email,
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/json', // Asegura que el backend interprete correctamente el cuerpo de la solicitud
        },
      });

      console.log('Respuesta del servidor:', response.data);

      // Manejo de la respuesta según tu lógica
      if (response.data.exito) { // Ajusta según la respuesta real de tu backend
        alert('Inicio de sesión exitoso');
        navigate('/Dashboard');

      } else {
        alert('Credenciales inválidas');
      }

    } catch (error) {
      if (error.response) {
        // El servidor respondió con un estado fuera del rango 2xx
        console.error('Error en la respuesta del servidor:', error.response.data);
        alert('Error al iniciar sesión. Por favor, verifica tus credenciales.');
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        console.error('No se recibió respuesta del servidor:', error.request);
        alert('Error de conexión. Por favor, intenta más tarde.');
      } else {
        // Algo sucedió al configurar la solicitud
        console.error('Error en la configuración de la solicitud:', error.message);
        alert('Error inesperado. Por favor, intenta más tarde.');
      }
    }
    
  };

  return (
    <MDBContainer className="my-5 gradient-form">

      <MDBRow>
        <MDBCol col='6' className="mb-5 card">
          <div className="d-flex flex-column ms-5 text-black">

            <div className="text-center">
              <img src="https://images.vexels.com/content/228519/preview/cute-robot-character-377f2e.png"
                style={{width: '185px'}} alt="logo" />
              <h4 className="mt-1 mb-5 pb-1">Bienvenido a SRS</h4>
            </div>

            <p>Por favor ingresa tu cuenta</p>


            <MDBInput wrapperClass='mb-4' label='Usuario' id='form1' type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <MDBInput wrapperClass='mb-4' label='Contraseña' id='form2' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>


            <div className="text-center pt-1 mb-5 pb-1">
              <MDBBtn className="mb-4 w-100 gradient-custom-2" id="botonIngreso" onClick={leerDatos}>Ingresar</MDBBtn>
              <a className="text-muted" href="#!">¿Olvidaste tu contraseña?</a>
            </div>

            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
              <p className="mb-0">¿No tienes cuenta?</p>
              <MDBBtn outline className='mx-2' color='danger'>
                Cree una
              </MDBBtn>
            </div>

          </div>

        </MDBCol>

        <MDBCol col='6' className="mb-5">
          <div className="d-flex flex-column justify-content-center gradient-custom-2 h-100 mb-4">

            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h4 className="mb-4">Somos mas que una compañia</h4>
              <p className="small mb-0">Nos especializamos en la creacion de sistemas que manejen recursos de manera inteligente para poder satisfacer la alta demanda de robots y drones en areas especificas.
              </p>
            </div>

          </div>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
};

export default Login;