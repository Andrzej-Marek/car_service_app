import React, { FC, useState } from 'react';
import { CustomerFragment } from '@/generated/graphql';
import CustomerDescriptionModal from '@/components/Modals/CustomerDescriptionModal';
import { InfoCircleOutlined } from '@ant-design/icons';
import { styled } from '@/utils';
import { Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
interface OwnProps {
    customer: CustomerFragment;
}

type Props = OwnProps;

const OwnerCell: FC<Props> = ({ customer }) => {
    const { t } = useTranslation('fields');
    const [showModal, toggleModal] = useState(false);
    return (
        <Wrapper>
            <CustomerDescriptionModal visible={showModal} customer={customer} toggle={() => toggleModal(!showModal)} />
            <div onClick={() => toggleModal(!showModal)}>
                {customer.companyName && customer.companyName} {customer.firstname}{' '}
                {customer.lastname && customer.lastname}{' '}
                <Tooltip title={t('infoCustomer')}>
                    <InfoCircleOutlined onClick={() => toggleModal(!showModal)} />
                </Tooltip>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    svg {
        margin-left: 5px;
        color: ${({ theme }) => theme.color.lightBlue};
        font-size: ${({ theme }) => theme.fontSize.normal};
    }
`;

export default OwnerCell;
