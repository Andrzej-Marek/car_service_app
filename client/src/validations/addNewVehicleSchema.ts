import * as Yup from 'yup';
import i18n from '@/i18n';
import { NUMBER_REGEX } from './regex';

const lengthValidation = (min = 4, max = 20) =>
    Yup.string()
        .min(min, i18n.t('validations:isLength', { length: min }))
        .max(max, i18n.t('validations:tooLong', { length: max }));

export const addNewVehicleSchema = Yup.object().shape({
    vehicleType: lengthValidation(1, 20).required(i18n.t('validations:required')),
    brand: lengthValidation(2).required(i18n.t('validations:required')),
    model: lengthValidation(2).required(i18n.t('validations:required')),
    vinNumber: lengthValidation(7, 18).matches(NUMBER_REGEX, i18n.t('validations:isOnlyNumbers')),
    productionYear: lengthValidation(4, 4).matches(NUMBER_REGEX, i18n.t('validations:isOnlyNumbers')),
    engineCapacity: lengthValidation(2, 8).matches(NUMBER_REGEX, i18n.t('validations:isOnlyNumbers')),
    registrationNumber: lengthValidation(4, 10),
    enginePower: lengthValidation(1, 5).matches(NUMBER_REGEX, i18n.t('validations:isOnlyNumbers')),
    color: lengthValidation(1, 12),
    mileage: lengthValidation(1, 6).matches(NUMBER_REGEX, i18n.t('validations:isOnlyNumbers')),
    comment: lengthValidation(4, 400),
});
