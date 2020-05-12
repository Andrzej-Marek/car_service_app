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
import MyUploader from '@/components/Fields/MyUploader';

const MainDashboardPage = () => {
    const [addCustomerModal, toggleAddCustomerModal] = useState(false);
    const [fastRaportModal, toggleFastRaportModal] = useState(false);

    const { user } = useContext(UserContext);
    const { t } = useTranslation('mainDashboard');

    const toggleAddCustomerModalHandler = () => {
        toggleAddCustomerModal(!addCustomerModal);
    };

    console.log(user);
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
        </Wrapper>
    );
};

const Wrapper = styled.div``;
export default MainDashboardPage;
