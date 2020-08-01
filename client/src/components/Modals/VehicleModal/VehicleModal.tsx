import React, { FC } from 'react';
import AddVehicleForm from '@/components/Forms/AddVehicleForm';
import { Vehicle } from '@/generated/graphql';
import { ModalActionType } from '@/types';
import { CustomFormModal } from '@/assets/images/styles';
import { useTranslation } from 'react-i18next';

interface OwnProps {
    visible: boolean;
    toggle: () => void;
    defaultValues: Vehicle;
    type: ModalActionType;
}

type Props = OwnProps;

const VehicleModal: FC<Props> = ({ visible, toggle, type, defaultValues }) => {
    const { t } = useTranslation('fields');

    return (
        <CustomFormModal title={t('updateVehicle')} visible={visible} onCancel={toggle} footer={false}>
            <AddVehicleForm defaultValues={defaultValues} type={type} toggle={toggle} />
        </CustomFormModal>
    );
};

export default VehicleModal;
