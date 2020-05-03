import * as Yup from 'yup';
import i18n from '@/i18n';

const lengthValidation = (min = 4, max = 50) =>
    Yup.string()
        .min(min, i18n.t('validations:isLength', { length: min }))
        .max(max, i18n.t('validations:tooLong'));

export const createUserSchema = Yup.object().shape({
    firstname: lengthValidation().required(i18n.t('validations:required')),
    lastname: lengthValidation(),
    companyName: lengthValidation(2),
    vatNumber: lengthValidation(),
    street: lengthValidation(),
    postcode: lengthValidation(4, 10),
    adress: lengthValidation(),
    phone: lengthValidation(9, 12),
    comment: lengthValidation(5, 200),
    mail: Yup.string().email(i18n.t('validations:isMail')),
});
