import React, { FC, useState } from 'react';
import { CustomerFragment } from '@/generated/graphql';
import CustomerDescriptionModal from '@/components/Modals/CustomerDescriptionModal';
import { InfoCircleOutlined } from '@ant-design/icons';

interface OwnProps {
    customer: CustomerFragment;
}

type Props = OwnProps;

const OwnerCell: FC<Props> = ({ customer }) => {
    const [showModal, toggleModal] = useState(false);
    return (
        <>
            <CustomerDescriptionModal visible={showModal} customer={customer} toggle={() => toggleModal(!showModal)} />
            <div>
                {customer.companyName && customer.companyName} {customer.firstname}{' '}
                {customer.lastname && customer.lastname} <InfoCircleOutlined onClick={() => toggleModal(!showModal)} />
            </div>
        </>
    );
};

export default OwnerCell;
