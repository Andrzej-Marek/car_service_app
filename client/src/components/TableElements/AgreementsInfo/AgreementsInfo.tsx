import React, { FC } from 'react';
import { Tag } from 'antd';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

interface OwnProps {
    mailSendAgreement: boolean;
    smsSendAgreement: boolean;
    marketingSendAgreement: boolean;
}

type Props = OwnProps;

const AgreementsInfo: FC<Props> = ({ mailSendAgreement, smsSendAgreement, marketingSendAgreement }) => {
    const { t } = useTranslation(['fields']);

    const colorHandler = (boolean: boolean) => (boolean ? 'green' : 'red');
    return (
        <Wrapper>
            <Tag color={colorHandler(mailSendAgreement)}>{t('fields:mailSendAgreementShort')}</Tag>
            <Tag color={colorHandler(smsSendAgreement)}>{t('fields:smsSendAgreementShort')}</Tag>
            <Tag color={colorHandler(marketingSendAgreement)}>{t('fields:marketingSendAgreementShort')}</Tag>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    .ant-tag {
        margin: 2px;
    }
`;

export default AgreementsInfo;
