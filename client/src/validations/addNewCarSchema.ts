import * as Yup from 'yup';
import i18n from '@/i18n';
import { NUMBER_REGEX } from './regex';

const lengthValidation = (min = 4, max = 50) =>
    Yup.string()
        .min(min, i18n.t('validations:isLength', { length: min }))
        .max(max, i18n.t('validations:tooLong', { length: max }));

export const addNewCarSchema = Yup.object().shape({
    vahicleType: lengthValidation(1).required(i18n.t('validations:required')),
    brand: lengthValidation().required(i18n.t('validations:required')),
    model: lengthValidation().required(i18n.t('validations:required')),
    vinNumber: lengthValidation().matches(NUMBER_REGEX, i18n.t('validations:isOnlyNumbers')),
    productionYear: lengthValidation(4, 4).matches(NUMBER_REGEX, i18n.t('validations:isOnlyNumbers')),
    engineCapacity: lengthValidation(2, 8).matches(NUMBER_REGEX, i18n.t('validations:isOnlyNumbers')),
    registrationNumber: lengthValidation(),
    enginePower: lengthValidation(1, 5).matches(NUMBER_REGEX, i18n.t('validations:isOnlyNumbers')),
    color: lengthValidation(1, 12),
    mileage: lengthValidation().matches(NUMBER_REGEX, i18n.t('validations:isOnlyNumbers')),
    comment: lengthValidation(),
});
