import * as Yup from 'yup';
import i18n from '@/i18n';

const lengthValidation = (min = 4, max = 50) =>
    Yup.string()
        .min(min, i18n.t('validations:isLength', { length: '4' }))
        .max(max, i18n.t('validations:toLong'));

export const createUserSchema = Yup.object().shape({
    name: lengthValidation().required(i18n.t('validations:required')),
    lastname: lengthValidation(),
    companyName: lengthValidation(2),
    vatNumber: Yup.number()
        .min(4)
        .max(22),
    street: lengthValidation(),
    postcode: lengthValidation(4, 10),
    adress: lengthValidation(),
    phone: Yup.number()
        .min(6)
        .max(12),
    comment: lengthValidation(5, 200),
    mail: Yup.string().email(i18n.t('validations:isMail')),
});
