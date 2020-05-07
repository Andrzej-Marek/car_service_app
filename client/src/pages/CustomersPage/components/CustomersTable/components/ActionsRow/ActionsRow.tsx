import React, { FC, useState } from 'react';
import { CustomerFragment } from '@/generated/graphql';
import { styled } from '@/utils';
import { Button, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import AddCustomerModal from '@/components/Modals/AddCustomerModal';
import { ModalActionType } from '@/@types';

interface OwnProps {
    context: CustomerFragment;
}

type Props = OwnProps;

const ActionsRow: FC<Props> = ({ context }) => {
    const [updateCustomerModal, toggleUpdateCustomerModal] = useState(false);
    const { t } = useTranslation('common');
    return (
        <>
            <AddCustomerModal
                defaultValues={{ ...context, createNewCustomer: false, customerId: null } as any}
                visible={updateCustomerModal}
                toggle={() => toggleUpdateCustomerModal(!updateCustomerModal)}
                actionType={ModalActionType.UPDATE}
            />
            <Wrapper>
                <Tooltip title={t('edit')}>
                    <Button
                        type="primary"
                        shape="circle"
                        size="small"
                        onClick={() => toggleUpdateCustomerModal(!updateCustomerModal)}
                    >
                        U
                    </Button>
                </Tooltip>
                <Tooltip title={t('delete')}>
                    <Button type="danger" shape="circle" size="small">
                        X
                    </Button>
                </Tooltip>
            </Wrapper>
        </>
    );
};

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    button {
        font-size: ${({ theme }) => theme.fontSize.small};
        margin: 0 5px;
    }
`;

export default ActionsRow;
