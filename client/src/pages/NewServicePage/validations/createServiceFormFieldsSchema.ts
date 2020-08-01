import * as Yup from 'yup';
import i18next from 'i18next';

export const createVehicleServiceSchema = Yup.object().shape({
    vehicleId: Yup.string().required(i18next.t('validations:required')),
    serviceNumber: Yup.string().required(i18next.t('validations:required')),
    estimateServiceDone: Yup.string().required(i18next.t('validations:required')),
});
