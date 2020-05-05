import React, { FC } from 'react';
import { styled } from '@/utils';
import { Descriptions } from 'antd';
import { FormsValues } from '../../AddNewCarPage';
import { useTranslation } from 'react-i18next';
import { FULL_DATE_FORMAT } from '@/constants/dateFormat';
import moment from 'moment';

interface OwnProps {
    summary: FormsValues;
}

type Props = OwnProps;

const AddNewCarSummary: FC<Props> = ({ summary }) => {
    const { t } = useTranslation(['fields', 'vehicleTypes', 'fuelTypes']);
    console.log(summary);
    const { addCar } = summary;
    return (
        <Wrapper>
            <Descriptions bordered size="small">
                <Descriptions.Item label={t(`fields:vahicleType`)}>
                    {t(`vehicleTypes:${addCar?.vahicleType}`)}
                </Descriptions.Item>
                <Descriptions.Item label={t(`fields:brand`)}>{addCar?.brand}</Descriptions.Item>
                <Descriptions.Item label={t(`fields:model`)}>{addCar?.model}</Descriptions.Item>
                <Descriptions.Item label={t(`fields:vinNumber`)}>{addCar?.vinNumber}</Descriptions.Item>
                <Descriptions.Item label={t(`fields:productionYear`)}>{addCar?.productionYear}</Descriptions.Item>
                <Descriptions.Item label={t(`fields:engineCapacity`)}>{addCar?.engineCapacity}</Descriptions.Item>
                <Descriptions.Item label={t(`fields:registrationNumber`)}>
                    {addCar?.registrationNumber}
                </Descriptions.Item>
                <Descriptions.Item label={t(`fields:enginePower`)}>{addCar?.enginePower}</Descriptions.Item>
                <Descriptions.Item label={t(`fields:color`)}>{addCar?.color}</Descriptions.Item>
                <Descriptions.Item label={t(`fields:mileage`)}>{addCar?.mileage}</Descriptions.Item>
                <Descriptions.Item label={t(`fields:fuelType`)}>{t(`fuelTypes:${addCar?.fuelType}`)}</Descriptions.Item>
                <Descriptions.Item label={t(`fields:insuranceDate`)}>
                    {addCar?.insuranceDate && moment(addCar.insuranceDate).format(FULL_DATE_FORMAT)}
                </Descriptions.Item>
                <Descriptions.Item label={t(`fields:nextService`)}>
                    {addCar?.nextService && moment(addCar.nextService).format(FULL_DATE_FORMAT)}
                </Descriptions.Item>
                <Descriptions.Item label={t(`fields:warranty`)}>
                    {addCar?.warranty && moment(addCar.warranty).format(FULL_DATE_FORMAT)}
                </Descriptions.Item>
                <Descriptions.Item label={t(`fields:comment`)}>{addCar?.comment}</Descriptions.Item>
            </Descriptions>
        </Wrapper>
    );
};

const Wrapper = styled.div``;

export default AddNewCarSummary;
