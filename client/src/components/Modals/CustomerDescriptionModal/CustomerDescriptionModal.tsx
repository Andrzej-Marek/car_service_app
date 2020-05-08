import React, { FC } from 'react';
import { Descriptions, Modal, Tag } from 'antd';
import { styled } from '@/utils';
import { CustomerFragment } from '@/generated/graphql';
import { useTranslation } from 'react-i18next';
import AgreementsInfo from '@/components/TableElements/AgreementsInfo';

interface OwnProps {
    customer: CustomerFragment;
    visible: boolean;
    toggle: () => void;
}

type Props = OwnProps;

const CustomerDescriptionModal: FC<Props> = ({ customer, visible, toggle }) => {
    const { t } = useTranslation('fields');

    const {
        discount,
        firstname,
        mailSendAgreement,
        marketingSendAgreement,
        smsSendAgreement,
        adress,
        comment,
        companyName,
        lastname,
        mail,
        phone,
        postcode,
        street,
        vatNumber,
    } = customer;

    return (
        <CustomModal title={t('infoCustomer')} visible={visible} footer={null} onCancel={toggle}>
            <Descriptions bordered size="small" layout="vertical">
                <Descriptions.Item label={t('firstname')}>{firstname}</Descriptions.Item>
                <Descriptions.Item label={t('lastname')}>{lastname}</Descriptions.Item>
                <Descriptions.Item label={t('companyName')}>{companyName}</Descriptions.Item>
                <Descriptions.Item label={t('mail')}>{mail}</Descriptions.Item>
                <Descriptions.Item label={t('phone')}>{phone}</Descriptions.Item>
                <Descriptions.Item label={t('postcode')}>{postcode}</Descriptions.Item>
                <Descriptions.Item label={t('street')}>{street}</Descriptions.Item>
                <Descriptions.Item label={t('vatNumber')}>{vatNumber}</Descriptions.Item>
                <Descriptions.Item label={t('adress')}>{adress}</Descriptions.Item>
                <Descriptions.Item label={t('discount')}>
                    {(discount || discount === 0) && discount + '%'}
                </Descriptions.Item>
                <Descriptions.Item label={t('agreements')}>
                    <AgreementsInfo
                        mailSendAgreement={mailSendAgreement}
                        smsSendAgreement={smsSendAgreement}
                        marketingSendAgreement={marketingSendAgreement}
                    />
                </Descriptions.Item>
            </Descriptions>
            <Descriptions>
                {comment && <Descriptions.Item label={t('comment')}>{comment}</Descriptions.Item>}
            </Descriptions>
        </CustomModal>
    );
};

const CustomModal = styled(Modal)`
    top: 20px;
    width: 95vw !important;
    max-width: 1000px;
`;

export default CustomerDescriptionModal;
