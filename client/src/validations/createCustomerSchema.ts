import * as Yup from 'yup';
import i18n from '@/i18n';
import { PHONE_REGEX, NUMBER_REGEX } from './regex';

const lengthValidation = (min = 4, max = 40) =>
    Yup.string()
        .min(min, i18n.t('validations:isLength', { length: min }))
        .max(max, i18n.t('validations:tooLong'))
        .nullable();

export const createCustomerSchema = Yup.object().shape({
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
        then: lengthValidation(3, 20).required(i18n.t('validations:required')),
        otherwise: Yup.string().notRequired(),
    }),
    lastname: lengthValidation(3, 20),
    companyName: lengthValidation(2, 50),
    vatNumber: lengthValidation(4, 15).matches(NUMBER_REGEX, i18n.t('validations:isOnlyNumbers')),
    street: lengthValidation(),
    postcode: lengthValidation(4, 10),
    adress: lengthValidation(),
    phone: lengthValidation(9, 12).matches(PHONE_REGEX, i18n.t('validations:invalidPhoneNumber')),
    comment: lengthValidation(5, 400),
    discount: Yup.number()
        .typeError(i18n.t('validations:isOnlyNumbers'))
        .min(0, i18n.t('validations:valueOfRange', { from: 0, to: 100 }))
        .max(100, i18n.t('validations:valueOfRange', { from: 0, to: 100 }))
        .required(i18n.t('validations:required')),
    mail: lengthValidation(4, 25).email(i18n.t('validations:isMail')),
});
