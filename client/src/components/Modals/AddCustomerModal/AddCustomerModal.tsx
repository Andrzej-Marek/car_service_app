import React, { FC } from 'react';
import { Modal } from 'antd';
import AddCustomerForm from '@/components/Forms/AddCustomerForm';
import { styled, media } from '@/utils';

interface OwnProps {
    visible: boolean;
    toggle: () => void;
    onCancel: ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void) | undefined;
}

type Props = OwnProps;

const AddCustomerModal: FC<Props> = ({ visible, toggle, onCancel }) => {
    return (
        <CustomModal title="Add customer" visible={visible} footer={null} onCancel={onCancel}>
            <AddCustomerForm toggle={toggle} />
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
