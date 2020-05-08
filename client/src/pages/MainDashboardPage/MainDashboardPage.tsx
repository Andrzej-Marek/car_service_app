import React, { useState, useContext, useCallback } from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import MoneyCard from '@/components/Cards/MoneyCard';
import { BarChartOutlined } from '@ant-design/icons';
import { theme } from '@/utils';
import { useTranslation } from 'react-i18next';
import ClassicButton from '@/components/Buttons/ClassicButton';
import AddCustomerModal from '@/components/Modals/AddCustomerModal';
import { UserContext } from '@/context/UserContext';
import FastRaportModal from '@/components/Modals/FastRaportModal';
import { ModalActionType } from '@/@types';
import { useDropzone } from 'react-dropzone';
import { useMutation } from '@apollo/react-hooks';
import { UPLOAD_FILE } from '@/graphql/vehicle/mutations/uploadFile';
import { UploadFileMutation, UploadFileMutationVariables } from '@/generated/graphql';
import gql from 'graphql-tag';

const uploadFileMutation = gql`
    mutation UploadFile($file: Upload!) {
        uploadFile(file: $file)
    }
`;

const MainDashboardPage = () => {
    const [addCustomerModal, toggleAddCustomerModal] = useState(false);
    const [fastRaportModal, toggleFastRaportModal] = useState(false);
    const { user } = useContext(UserContext);
    const { t } = useTranslation('mainDashboard');

    // const [uploadFile] = useMutation<UploadFileMutation, UploadFileMutationVariables>(UPLOAD_FILE);
    const [uploadFile, { error }] = useMutation(uploadFileMutation);

    const toggleAddCustomerModalHandler = () => {
        toggleAddCustomerModal(!addCustomerModal);
    };

    const onDrop = useCallback(
        ([file]) => {
            uploadFile({ variables: { file } });
        },
        [uploadFile],
    );
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    console.log(error);
    console.log('user', user);
    return (
        <Wrapper>
            <AddCustomerModal
                visible={addCustomerModal}
                toggle={toggleAddCustomerModalHandler}
                actionType={ModalActionType.CREATE}
            />
            <FastRaportModal visible={fastRaportModal} toggle={() => toggleFastRaportModal(!fastRaportModal)} />
            <Row
                gutter={[
                    { xs: 8, sm: 16, md: 16, lg: 16 },
                    { xs: 8, sm: 8, md: 8, lg: 8 },
                ]}
            >
                <Col xs={24} md={12} lg={6}>
                    <MoneyCard
                        icon={BarChartOutlined}
                        iconBackground={theme.color.red}
                        title={t('moneyTile')}
                        value="$2000"
                    />
                </Col>
                <Col xs={24} md={12} lg={6}>
                    <MoneyCard icon={BarChartOutlined} iconBackground={theme.color.red} title="Budżet" value="$2000" />
                </Col>
                <Col xs={24} md={12} lg={6}>
                    <MoneyCard icon={BarChartOutlined} iconBackground={theme.color.red} title="Budżet" value="$2000" />
                </Col>
                <Col xs={24} md={12} lg={6}>
                    <MoneyCard icon={BarChartOutlined} iconBackground={theme.color.red} title="Budżet" value="$2000" />
                </Col>
            </Row>
            <Row
                gutter={[
                    { xs: 8, sm: 16, md: 16, lg: 16 },
                    { xs: 8, sm: 8, md: 8, lg: 8 },
                ]}
            >
                <Col xs={24} md={12} lg={6}>
                    <ClassicButton text="Dodaj klient" width="100%" onClick={toggleAddCustomerModalHandler} />
                </Col>
                <Col xs={24} md={12} lg={6}>
                    <ClassicButton text="Dodaj samochód" width="100%" />
                </Col>
                <Col xs={24} md={12} lg={6}>
                    <ClassicButton text="Przyjęcie do warsztatu" width="100%" />
                </Col>
                <Col xs={24} md={12} lg={6}>
                    <ClassicButton
                        text="Szybki raport"
                        width="100%"
                        onClick={() => toggleFastRaportModal(!fastRaportModal)}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        {isDragActive ? (
                            <p>Drop the files here ...</p>
                        ) : (
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        )}
                    </div>
                </Col>
                <Col>
                    <input
                        type="file"
                        onChange={e => {
                            const [file] = e.target.files;
                            console.log(file);
                            uploadFile({
                                variables: {
                                    file,
                                },
                            });
                        }}
                    />
                </Col>
            </Row>
        </Wrapper>
    );
};

const Wrapper = styled.div``;
export default MainDashboardPage;
