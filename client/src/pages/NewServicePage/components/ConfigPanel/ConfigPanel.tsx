import React, { FC } from 'react';
import MyDatePicker from '@/components/Fields/MyDatePicker';
import { Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import MyMaskInputField from '@/components/Fields/MyMaskInputField';

interface OwnProps {
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}

type Props = OwnProps;

const ConfigPanel: FC<Props> = ({ setFieldValue }) => {
    const { t } = useTranslation(['service']);
    return (
        <Row>
            <Col xs={12} xl={6}>
                <MyMaskInputField mask="99/99/9999" name="serviceNumber" label={t('service:serviceNumber')} />
            </Col>
            <Col xs={12} xl={6}>
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
