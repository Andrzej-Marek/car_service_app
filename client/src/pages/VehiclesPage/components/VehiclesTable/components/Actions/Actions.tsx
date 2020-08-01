import React, { FC, useState } from 'react';
import { styled } from '@/utils';
import { Vehicle } from '@/generated/graphql';
import { EditOutlined } from '@ant-design/icons';
import VehicleModal from '@/components/Modals/VehicleModal';
import { ModalActionType } from '@/types';

interface OwnProps {
    record: Vehicle;
}

type Props = OwnProps;

const Actions: FC<Props> = ({ record }) => {
    const [editModal, toggleEditModal] = useState(false);

    const {
        brand,
        id,
        model,
        vehicleType,
        color,
        comment,
        engineCapacity,
        enginePower,
        fuelType,
        insuranceDate,
        mileage,
        nextService,
        productionYear,
        registrationNumber,
        imageUrl,
        vinNumber,
        warranty,
        lengthUnit,
    } = record;

    const defaultValues = {
        brand,
        id,
        model,
        vehicleType,
        color,
        comment,
        engineCapacity,
        enginePower,
        fuelType,
        insuranceDate,
        mileage,
        nextService,
        productionYear,
        registrationNumber,
        vinNumber,
        warranty,
        imageUrl,
        lengthUnit,
    };
    return (
        <>
            <VehicleModal
                defaultValues={defaultValues as Vehicle}
                visible={editModal}
                type={ModalActionType.UPDATE}
                toggle={() => toggleEditModal(!editModal)}
            />
            <Wrapper>
                <EditOutlined onClick={() => toggleEditModal(!editModal)} />
            </Wrapper>
        </>
    );
};

const Wrapper = styled.div``;

export default Actions;
