import React, { FC } from 'react';
import { styled, media } from '@/utils';
import { Modal, Tabs } from 'antd';
import FastRaportForm from '@/components/Forms/FastRaportForm';
import { useTranslation } from 'react-i18next';

interface OwnProps {
    visible: boolean;
    toggle: () => void;
}

type Props = OwnProps;

const { TabPane } = Tabs;
const FastRaportModal: FC<Props> = ({ visible, toggle }) => {
    const { t } = useTranslation(['fields']);

    return (
        <CustomModal title={t('fastRaport')} visible={visible} footer={null} onCancel={toggle}>
            <Tabs type="card">
                <TabPane tab={t('raportData')} key="1">
                    <FastRaportForm />
                </TabPane>
                <TabPane tab={t('companyData')} key="2">
                    Content of Tab Pane 2
                </TabPane>
            </Tabs>
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

export default FastRaportModal;
