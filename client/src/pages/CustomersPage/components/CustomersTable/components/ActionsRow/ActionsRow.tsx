import React, { FC, useState } from 'react';
import { CustomerFragment } from '@/generated/graphql';
import { styled } from '@/utils';
import { Button, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import AddCustomerModal from '@/components/Modals/AddCustomerModal';
import { ModalActionType } from '@/types';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

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
                    <EditOutlined onClick={() => toggleUpdateCustomerModal(!updateCustomerModal)} className="edit" />
                </Tooltip>
                <Tooltip title={t('delete')}>
                    <DeleteOutlined className="delete" />
                </Tooltip>
            </Wrapper>
        </>
    );
};

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
        font-size: ${({ theme }) => theme.fontSize.icon};
        margin: 0 5px;
    }

    .delete {
        color: ${({ theme }) => theme.color.red};
    }

    .edit {
        color: ${({ theme }) => theme.color.lightBlue};
    }
`;

export default ActionsRow;
