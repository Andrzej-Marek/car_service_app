import React, { FC } from 'react';
import MyInputField from '@/components/Fields/MyInputField';
import MyDatePicker from '@/components/Fields/MyDatePicker';
import { Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';

interface OwnProps {
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}

type Props = OwnProps;

const ConfigPanel: FC<Props> = ({ setFieldValue }) => {
    const { t } = useTranslation(['service']);
    return (
        <Row>
            <Col xs={12} md={6}>
                <MyInputField name="serviceNumber" width="100" label={t('service:serviceNumber')} />
            </Col>
            <Col xs={12} md={6}>
                <MyDatePicker
                    name="date"
                    label={t('service:serviceDate')}
                    onChange={date => setFieldValue('date', date)}
                />
            </Col>
        </Row>
    );
};

export default ConfigPanel;
