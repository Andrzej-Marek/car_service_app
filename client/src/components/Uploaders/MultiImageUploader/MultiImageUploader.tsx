import React, { FC, useState, useContext } from 'react';
import styled from 'styled-components';
import { Upload, message, notification } from 'antd';
import { RcCustomRequestOptions, UploadChangeParam, UploadFile, RcFile } from 'antd/lib/upload/interface';
import { PlusOutlined } from '@ant-design/icons';
import { MAX_IMAGE_SIZE } from '@/config';
import { UserContext } from '@/context/UserContext';
import { useTranslation } from 'react-i18next';
import PreviewModal from '../components/PreviewModal';
import { maxFileAmount } from '@/config/plansConfig';

interface OwnProps {
    uploadImages: (files: UploadFile[]) => void;
    defaultValue?: UploadFile[];
}

type Props = OwnProps;

const MultiImageUploader: FC<Props> = ({ uploadImages, defaultValue }) => {
    const { t } = useTranslation(['fields', 'errors']);
    const { user } = useContext(UserContext);

    const [fileList, setFileList] = useState<UploadFile[]>(defaultValue || []);
    const [fileUrl, setFileUrl] = useState<null | string>(null);
    const [previewModal, togglePreviewModal] = useState(false);

    const uploadedImage = ({ file, onSuccess }: RcCustomRequestOptions) => {
        setTimeout(() => {
            onSuccess({}, file);
        }, 0);
    };

    const handlePreview = (file: UploadFile<any>) => {
        setFileUrl(URL.createObjectURL(file.originFileObj));
        togglePreviewModal(true);
    };

    const handleChange = ({ fileList, file }: UploadChangeParam<UploadFile<any>>): void | false => {
        if (fileList.length > maxFileAmount(user!.plan)) {
            notification.error({
                message: t('errors:uploads.general'),
                description: t('errors:uploads.maxAmountForPlan', { limit: maxFileAmount(user!.plan) }),
            });
            return false;
        }

        if (file.size > MAX_IMAGE_SIZE) {
            message.error(t('errors:uploads.maxSize', { limit: `${MAX_IMAGE_SIZE / 1000000}MB` }));
            return false;
        }

        uploadImages(fileList);
        setFileList(fileList);
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div className="ant-upload-text">{t('addImage')}</div>
        </div>
    );

    return (
        <Wrapper>
            <Upload
                listType="picture-card"
                name="avatar"
                accept=".jpg,.png,.jpeg"
                fileList={fileList}
                customRequest={uploadedImage}
                onPreview={handlePreview}
                onChange={handleChange}
                multiple
            >
                {fileList.length >= maxFileAmount(user!.plan) ? null : uploadButton}
            </Upload>
            <PreviewModal visible={previewModal} fileUrl={fileUrl} onCancel={() => togglePreviewModal(false)} />
        </Wrapper>
    );
};

const Wrapper = styled.div``;

export default MultiImageUploader;
