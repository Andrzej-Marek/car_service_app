import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from 'antd';

interface OwnProps {
    visible: boolean;
    onCancel: () => void;
    fileUrl: string | null;
}

type Props = OwnProps;

const PreviewModal: FC<Props> = ({ visible, onCancel, fileUrl }) => {
    const { t } = useTranslation('fields');
    return (
        <Modal style={{ top: 20 }} visible={visible} title={t('imagePreview')} footer={null} onCancel={onCancel}>
            {fileUrl && <img alt="example" style={{ width: '100%' }} src={fileUrl} />}
        </Modal>
    );
};

export default PreviewModal;
