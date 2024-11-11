import "../assets/styles/Login.css";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
}
from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

const Login = () => {
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


            <MDBInput wrapperClass='mb-4' label='Usuario' id='form1' type='email'/>
            <MDBInput wrapperClass='mb-4' label='Contraseña' id='form2' type='password'/>


            <div className="text-center pt-1 mb-5 pb-1">
              <MDBBtn className="mb-4 w-100 gradient-custom-2">Ingresar</MDBBtn>
              <a className="text-muted" href="#!">¿Olvidaste tu contraseña?</a>
            </div>

            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
              <p className="mb-0">¿No tienes cuenta?</p>
              <MDBBtn outline className='mx-2' color='danger'>
                Danger
              </MDBBtn>
            </div>

          </div>

        </MDBCol>

        <MDBCol col='6' className="mb-5">
          <div className="d-flex flex-column justify-content-center gradient-custom-2 h-100 mb-4">

            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h4 className="mb-4">We are more than just a company</h4>
              <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

          </div>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
};

export default Login;