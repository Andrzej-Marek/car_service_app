import React, { FC, useCallback } from 'react';
import { styled } from '@/utils';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';

interface OwnProps {
    onChange: (files: FileList) => void;
    multiple?: boolean;
    defaultValues?: File[];
}

type Props = OwnProps;

const MyUploader: FC<Props> = ({ onChange, defaultValues, multiple = false }) => {
    const { t } = useTranslation('fields');

    const onDrop = useCallback(files => {
        onChange(files);
    }, []);

    const { getRootProps, getInputProps, isDragActive, acceptedFiles, isDragReject, fileRejections } = useDropzone({
        onDrop,
        accept: ['.jpg', '.png', '.jpeg'],
        multiple: multiple,
        maxSize: 2,
    });

    console.log(isDragReject);
    console.log('fileRejections', fileRejections);
    const displayImageInfo = (defaultValues: File[] | undefined, acceptedFiles: File[]) => {
        if (defaultValues?.length) {
            return (
                <AcceptedFilesWrapper>
                    {defaultValues.map((el, index) => (
                        <div key={index}>{el.name}</div>
                    ))}
                </AcceptedFilesWrapper>
            );
        }

        if (acceptedFiles.length) {
            return (
                <AcceptedFilesWrapper>
                    {acceptedFiles.map((el, index) => (
                        <div key={index}>{el.name}</div>
                    ))}
                </AcceptedFilesWrapper>
            );
        }
        return null;
    };
    return (
        <Wrapper>
            <Uploader {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? <p>{t('dropFileHere')}</p> : <p>{t('dragOrClick')}</p>}
                {displayImageInfo(defaultValues, acceptedFiles)}
            </Uploader>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    margin: 5px;
`;

const AcceptedFilesWrapper = styled.div`
    padding: 5px 0;
    div {
        font-weight: 700;
    }
`;

const Uploader = styled.div`
    width: 100%;
    height: 100px;
    border-radius: 4px;
    border: 1px dashed ${({ theme }) => theme.color.primaryDark};
    text-align: center;
    font-size: ${({ theme }) => theme.fontSize.small};

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    cursor: pointer;

    p {
        margin: 0;
    }
`;
export default MyUploader;
