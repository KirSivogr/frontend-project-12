import {useRef, useState} from "react";
import useAuth from "../../hooks/useAuth";
import {useLocation, useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import validator from "../../utilites/validator";
import axios from "axios";
import routes from "../../utilites/routes";
import {Button, Form} from "react-bootstrap";

export default () => {
    const [authFailed, setAuthFailed] = useState(false);
    const auth = useAuth();
    const inputRef = useRef();
    const location = useLocation();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: validator,
        onSubmit: async (values) => {
            setAuthFailed(false);
            try {
                const res = await axios.post(routes.loginPath(), values);
                localStorage.setItem('token', JSON.stringify(res.data));
                auth.logIn();
                const { from } = location.state || { from: { pathname: '/' } };
                navigate(from);
            } catch (err) {
                setAuthFailed(true);
                if (err.isAxiosError && err.response.status === 401) {
                    inputRef.current.select();
                    return;
                }
                throw err;
            }
        },
    });

    return (
        <Form onSubmit={formik.handleSubmit} className="col-md-5">
            <h1 className="text-center mb-4">Войти</h1>
            <Form.Group className="form-floating">
                <Form.Control
                    className="form-control mb-3 w-100 rounded border border-primary"
                    name="username"
                    id="username"
                    required
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    placeholder={"Ваш ник"}
                    autoComplete="username"
                    isInvalid={authFailed}
                />
                <label className="ms-2 form-label" htmlFor="username">Ваш ник</label>
            </Form.Group>
            <Form.Group className="form-floating">
                <Form.Control
                    className="form-control mb-3 h-2  0 w-100 rounded border border-primary"
                    name="password"
                    id="password"
                    required
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    placeholder={"Ваш пароль"}
                    autoComplete="password"
                    isInvalid={authFailed}
                />
                <label className="ms-2 form-label" htmlFor="password">Пароль</label>
            </Form.Group>
            <Button
                type="submit"
                className="mb-3 w-100 btn-lg"
                variant="outline-primary"
            >
                Войти
            </Button>
            {authFailed
                ? <h6 className="text-danger text-center" title=""><strong>Неверные имя пользователя или пароль</strong></h6>
                : <div className="p-4" />}
        </Form>
    )
}