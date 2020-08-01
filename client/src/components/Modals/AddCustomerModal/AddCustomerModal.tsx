import React, { FC } from 'react';
import { Modal } from 'antd';
import AddCustomerForm from '@/components/Forms/AddCustomerForm';
import { styled, media } from '@/utils';
import { useTranslation } from 'react-i18next';
import { ModalActionType } from '@/types';
import { AddCustomer } from '@/components/Forms/AddCustomerForm/types';

interface OwnProps {
    visible: boolean;
    toggle: () => void;
    actionType?: ModalActionType;
    defaultValues?: AddCustomer;
}

type Props = OwnProps;
const { CREATE, CUSTOM, UPDATE } = ModalActionType;
const AddCustomerModal: FC<Props> = ({ visible, toggle, actionType = CUSTOM, defaultValues }) => {
    const { t } = useTranslation('fields');

    const displayTitleDependsOfActionType = (actionType: ModalActionType) => {
        switch (actionType) {
            case CREATE:
                return t('addCustomer');
            case CUSTOM:
                return t('addCustomer');
            case UPDATE:
                return t('updateCustomer');
            default:
                return t('addCustomer');
        }
    };
    return (
        <CustomModal
            title={displayTitleDependsOfActionType(actionType)}
            visible={visible}
            footer={null}
            onCancel={toggle}
        >
            <AddCustomerForm toggle={toggle} actionType={actionType} defaultValues={defaultValues} />
        </CustomModal>
    );
};

const CustomModal = styled(Modal)`
    width: 95vw !important;
    max-width: 1200px;
    top: 20px;

    ${media.md`
        width: 90vw !important;
    `}
`;

export default AddCustomerModal;
