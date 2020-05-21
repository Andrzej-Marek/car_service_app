import React, { FC } from 'react';
import { Tabs } from 'antd';
import MultiImageUploader from '@/components/Uploaders/MultiImageUploader';
import ServiceEstimate from '@/components/Estimates/ServiceEstimate';
import { ServiceEstimateFields } from '../../types';
import ServiceDeposit from './components/ServiceDeposit';
import { useTranslation } from 'react-i18next';
import AdvancePayment from './components/AdvancePayment';
import TimeTab from './components/TimeTab';
import ServiceDescription from './components/ServiceDescription';

interface OwnProps {
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
    estimate: ServiceEstimateFields[];
}

type Props = OwnProps;

const { TabPane } = Tabs;
const TabsContent: FC<Props> = ({ setFieldValue, estimate }) => {
    const { t } = useTranslation(['fields']);
    return (
        <Tabs type="card">
            <TabPane tab={t('fields:estimate')} key="1">
                <ServiceEstimate setFieldValue={setFieldValue} estimate={estimate} />
            </TabPane>
            {/* <TabPane tab="Serwisant" key="2">
                Content of Tab Pane 2
            </TabPane> */}
            <TabPane tab={t('fields:photos')} key="3">
                <MultiImageUploader
                    uploadImages={images =>
                        setFieldValue(
                            'images',
                            images.map(el => el.originFileObj),
                        )
                    }
                />
            </TabPane>
            <TabPane tab={t('fields:deposit')} key="4">
                <ServiceDeposit setFieldValue={setFieldValue} />
            </TabPane>
            {/* <TabPane tab="Rezerwacje" key="5">
                Content of Tab Pane 5
            </TabPane> */}
            <TabPane tab={t('fields:advancePayment')} key="6">
                <AdvancePayment setFieldValue={setFieldValue} />
            </TabPane>
            <TabPane tab={t('fields:time')} key="7">
                <TimeTab setFieldValue={setFieldValue} />
            </TabPane>
            <TabPane tab={t('fields:description')} key="8">
                <ServiceDescription />
            </TabPane>
        </Tabs>
    );
};

export default TabsContent;
