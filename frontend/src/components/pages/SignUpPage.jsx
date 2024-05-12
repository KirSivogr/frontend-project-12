import Header from '../UI/Header';
import authorizationImage from '../../assets/signUpImage.jpg';
import SignUpForm from '../forms/signUpForm';

const SignUpPage = () => (
  <div className="d-flex flex-column h-100">
    <Header />
    <div className="container-fluid vh-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex w-100 pb-0">
              <div className="col-md-6 d-flex align-items-center justify-content-center ">
                <img alt="login.submit" src={authorizationImage} width="300px" height="300px" className="mx-auto d-block" />
              </div>
              <SignUpForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SignUpPage;
