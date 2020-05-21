import React, { FC } from 'react';
import { styled } from '@/utils';
import MyTextArea from '@/components/Fields/MyTextArea';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'antd';

const ServiceDescription = () => {
    const { t } = useTranslation(['fields']);

    return (
        <Wrapper>
            <Row>
                <Col xs={24} lg={12}>
                    <MyTextArea name="description" label={t('fields:description')} />
                </Col>
                <Col xs={24} lg={12}>
                    <MyTextArea name="privateDescription" label={t('fields:privateDescription')} />
                </Col>
            </Row>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    max-width: 768px;
`;

export default ServiceDescription;
