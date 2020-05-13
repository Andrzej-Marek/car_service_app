import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';
import { styled } from '@/utils';
import { Upload, message } from 'antd';
import { RcCustomRequestOptions, RcFile, UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import { MAX_IMAGE_SIZE } from '@/config';
import PreviewModal from '../components/PreviewModal';

interface OwnProps {
    uploadImage: (image: UploadFile) => void;
    defaultValue?: UploadFile;
}

type Props = OwnProps;

const SingleImageUploader: FC<Props> = ({ uploadImage, defaultValue }) => {
    const { t } = useTranslation(['fields', 'errors']);
    const [fileList, setFileList] = useState<UploadFile[]>(defaultValue ? [defaultValue] : []);
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

    const handleChange = ({ fileList, file }: UploadChangeParam<UploadFile<any>>) => {
        uploadImage(file);
        setFileList(fileList);
    };

    const beforeUploadHandler = (file: RcFile) => {
        if (file.size > MAX_IMAGE_SIZE) {
            message.error(t('errors:uploads.maxSize', { limit: `${MAX_IMAGE_SIZE}MB` }));
            return false;
        }

        return true;
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
                beforeUpload={beforeUploadHandler}
            >
                {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <PreviewModal visible={previewModal} fileUrl={fileUrl} onCancel={() => togglePreviewModal(false)} />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    .ant-upload-picture-card-wrapper {
        display: flex;
        justify-content: center;
    }
`;

export default SingleImageUploader;
