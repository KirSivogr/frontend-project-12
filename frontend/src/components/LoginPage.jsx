import Header from "./UI/Header";
import authorizationImage from '../assets/authorization.png'
import LoginForm from "./UI/loginForm";
import {Link} from "react-router-dom";

const LoginPage = () => {
    return (
        <div className="d-flex flex-column h-100">
            <Header />
            <div className="container-fluid vh-100">
                <div className="row justify-content-center align-content-center h-100">
                    <div className="col-md-8 col-xxl-5 ">
                        <div className="card shadow-sm border border-primary">
                            <div className="card-body d-flex w-100 pb-0">
                                <div className="col-md-6 d-flex align-items-center justify-content-center ">
                                    <img alt={'login.submit'} src={authorizationImage} width="200px" height="200px" className="mx-auto d-block" />
                                </div>
                                <LoginForm />
                            </div>
                            <div className="card-footer text-center p-4">
                                <div className="">
                                    <span className="p-2">Нет аккаунта?</span>
                                    <Link to="/signup">Регистрация</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;