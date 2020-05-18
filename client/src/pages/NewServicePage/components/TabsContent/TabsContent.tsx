import React, { FC } from 'react';
import { Tabs } from 'antd';
import MultiImageUploader from '@/components/Uploaders/MultiImageUploader';
import ServisEstimate from '@/components/Estimates/ServisEstimate';
import { SerivceEstimate } from '../../types';

interface OwnProps {
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
    estimate: SerivceEstimate[];
}

type Props = OwnProps;

const { TabPane } = Tabs;
const TabsContent: FC<Props> = ({ setFieldValue, estimate }) => {
    return (
        <Tabs type="card">
            <TabPane tab="Kosztorys" key="1">
                <ServisEstimate setFieldValue={setFieldValue} estimate={estimate} />
            </TabPane>
            <TabPane tab="Serwisant" key="2">
                Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Zdjęcia" key="3">
                <MultiImageUploader uploadImages={images => console.log(images)} />
            </TabPane>
            <TabPane tab="Załączniki" key="4">
                Content of Tab Pane 4
            </TabPane>
            <TabPane tab="Rezerwacje" key="5">
                Content of Tab Pane 5
            </TabPane>
            <TabPane tab="Zaliczki" key="6">
                Content of Tab Pane 6
            </TabPane>
            <TabPane tab="Czas" key="7">
                Content of Tab Pane 7
            </TabPane>
        </Tabs>
    );
};

export default TabsContent;
