import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

export default (channels) => {
  const { t } = useTranslation();

  return yup.object({
    nameChannel: yup
      .string()
      .trim()
      .required(t('errors.required'))
      .notOneOf(channels, t('errors.twiceChannels'))
      .min(3, t('signUp.minName'))
      .max(20, t('signUp.maxName')),
  });
};
