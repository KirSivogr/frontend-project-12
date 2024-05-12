import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

export default () => {
  const { t } = useTranslation();

  return yup.object({
    password: yup.string().required(t('signUp.required')).min(6, t('signUp.minPass')),
    username: yup.string().required(t('signUp.required')).min(3, t('signUp.minName')).max(20, t('signUp.maxName')),
    confirmPassword: yup.string().required(t('signUp.required')).oneOf([yup.ref('password')], t('signUp.difPass')),
  });
};
