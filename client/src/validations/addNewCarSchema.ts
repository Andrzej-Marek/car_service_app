import * as Yup from 'yup';
import i18n from '@/i18n';

const lengthValidation = (min = 4, max = 50) =>
    Yup.string()
        .min(min, i18n.t('validations:isLength', { length: min }))
        .max(max, i18n.t('validations:tooLong', { length: max }));

export const addNewCarSchema = Yup.object().shape({
    vahicleType: lengthValidation(1).required(i18n.t('validations:required')),
    brand: lengthValidation().required(i18n.t('validations:required')),
    model: lengthValidation(),
    vinNumber: lengthValidation(),
    productionYear: lengthValidation(4, 4),
    engineCapacity: lengthValidation(2, 8),
    registrationNumber: lengthValidation(),
    enginePower: lengthValidation(1, 5),
    color: lengthValidation(1, 12),
    mileage: lengthValidation(),
    comment: lengthValidation(),
});
