import React, { FC } from 'react';
import moment from 'moment';
import { Descriptions } from 'antd';
import { FormsValues } from '../../AddNewVehicleWithCustomerPage';
import { useTranslation } from 'react-i18next';
import { FULL_DATE_FORMAT } from '@/constants/dateFormat';

interface OwnProps {
    summary: FormsValues;
}

type Props = OwnProps;

const AddNewVehicleSummary: FC<Props> = ({ summary }) => {
    const { t } = useTranslation(['fields', 'vehicleTypes', 'fuelTypes']);
    const { addVehicle } = summary;
    return (
        <Descriptions bordered size="small" layout="vertical">
            <Descriptions.Item label={t(`fields:vehicleType`)}>
                {t(`vehicleTypes:${addVehicle?.vehicleType}`)}
            </Descriptions.Item>
            <Descriptions.Item label={t(`fields:brand`)}>{addVehicle?.brand}</Descriptions.Item>
            <Descriptions.Item label={t(`fields:model`)}>{addVehicle?.model}</Descriptions.Item>
            <Descriptions.Item label={t(`fields:vinNumber`)}>{addVehicle?.vinNumber}</Descriptions.Item>
            <Descriptions.Item label={t(`fields:productionYear`)}>{addVehicle?.productionYear}</Descriptions.Item>
            <Descriptions.Item label={t(`fields:engineCapacity`)}>{addVehicle?.engineCapacity}</Descriptions.Item>
            <Descriptions.Item label={t(`fields:registrationNumber`)}>
                {addVehicle?.registrationNumber}
            </Descriptions.Item>
            <Descriptions.Item label={t(`fields:enginePower`)}>{addVehicle?.enginePower}</Descriptions.Item>
            <Descriptions.Item label={t(`fields:color`)}>{addVehicle?.color}</Descriptions.Item>
            <Descriptions.Item label={t(`fields:mileage`)}>{addVehicle?.mileage}</Descriptions.Item>
            <Descriptions.Item label={t(`fields:fuelType`)}>{t(`fuelTypes:${addVehicle?.fuelType}`)}</Descriptions.Item>
            <Descriptions.Item label={t(`fields:insuranceDate`)}>
                {addVehicle?.insuranceDate && moment(addVehicle.insuranceDate).format(FULL_DATE_FORMAT)}
            </Descriptions.Item>
            <Descriptions.Item label={t(`fields:nextService`)}>
                {addVehicle?.nextService && moment(addVehicle.nextService).format(FULL_DATE_FORMAT)}
            </Descriptions.Item>
            <Descriptions.Item label={t(`fields:warranty`)}>
                {addVehicle?.warranty && moment(addVehicle.warranty).format(FULL_DATE_FORMAT)}
            </Descriptions.Item>
            <Descriptions.Item label={t(`fields:comment`)}>{addVehicle?.comment}</Descriptions.Item>
        </Descriptions>
    );
};

export default AddNewVehicleSummary;
