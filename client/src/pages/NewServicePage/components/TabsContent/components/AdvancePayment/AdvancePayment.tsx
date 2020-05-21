import React, { FC } from 'react';
import MyInputField from '@/components/Fields/MyInputField';
import { Col, Row, Select } from 'antd';
import { currencyList } from '@/constants';

interface OwnProps {
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}

type Props = OwnProps;

const AdvancePayment: FC<Props> = ({ setFieldValue }) => {
    const selectAfter = (
        <Select
            onChange={(value: string) => setFieldValue('currency', value)}
            options={currencyList}
            defaultValue="zł"
        />
    );

    return (
        <Row>
            <Col xs={24} sm={12} md={6} lg={4}>
                <MyInputField name="AdvancePayment" addonAfter={selectAfter} />
            </Col>
        </Row>
    );
};

export default AdvancePayment;
