import { Link } from 'react-router-dom';
import errorImage from '../assets/errorSign.png'

const ErrorPage = () => (
    <div className="text-center">
        <img alt="Страница не найдена" className="img-fluid h-25" src={errorImage} width={150} height={150} />
        <h1 className="h4 text-muted">Страница не найдена</h1>
        <p className="text-muted">
            Но вы можете перейти
            {' '}
            <Link to="/">на главную страницу</Link>
        </p>
    </div>
);

export default ErrorPage;