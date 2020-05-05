import * as Yup from 'yup';
import i18n from '@/i18n';
import { PHONE_REGEX, NUMBER_REGEX } from './regex';

const lengthValidation = (min = 4, max = 50) =>
    Yup.string()
        .min(min, i18n.t('validations:isLength', { length: min }))
        .max(max, i18n.t('validations:tooLong'));

export const createUserSchema = Yup.object().shape({
    createNewCustomer: Yup.boolean(),
    customerId: Yup.string().when('$createNewCustomer', {
        is: false,
        then: lengthValidation(3).required(i18n.t('validations:required')),
        otherwise: Yup.string()
            .notRequired()
            .nullable(),
    }),
    firstname: Yup.string().when('createNewCustomer', {
        is: true,
        then: lengthValidation(3).required(i18n.t('validations:required')),
        otherwise: Yup.string().notRequired(),
    }),
    lastname: lengthValidation(),
    companyName: lengthValidation(2),
    vatNumber: lengthValidation().matches(NUMBER_REGEX, i18n.t('validations:isOnlyNumbers')),
    street: lengthValidation(),
    postcode: lengthValidation(4, 10),
    adress: lengthValidation(),
    phone: lengthValidation(9, 12).matches(PHONE_REGEX, i18n.t('validations:invalidPhoneNumber')),
    comment: lengthValidation(5, 200),
    mail: Yup.string().email(i18n.t('validations:isMail')),
});
