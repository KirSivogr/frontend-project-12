import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import errorImage from '../../assets/errorSign.png';

const ErrorPage = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <img alt="Что-то пошло не так" className="img-fluid h-25" src={errorImage} width={150} height={150} />
      <h1 className="h4 text-muted">{t('notFound.pageNotFound')}</h1>
      <p className="text-muted">
        {t('notFound.transition')}
        {' '}
        <Link to="/">{t('notFound.mainPage')}</Link>
      </p>
    </div>
  );
};

export default ErrorPage;
