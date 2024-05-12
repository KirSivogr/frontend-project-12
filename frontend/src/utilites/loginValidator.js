import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

export default () => {
  const { t } = useTranslation();

  return yup.object({
    password: yup.string().required(t('login.shemaRequired')),
    username: yup.string().required(t('login.shemaRequired')),
  });
};
