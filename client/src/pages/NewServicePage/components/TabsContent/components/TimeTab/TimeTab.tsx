import React, { FC } from 'react';
import styled from 'styled-components';
import MyDatePicker from '@/components/Fields/MyDatePicker';
import { useTranslation } from 'react-i18next';
import { FULL_DATE_FORMAT_WITH_TIME } from '@/constants/dateFormat';

interface OwnProps {
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}

type Props = OwnProps;

const TimeTab: FC<Props> = ({ setFieldValue }) => {
    const { t } = useTranslation(['service']);

    return (
        <Wrapper>
            <MyDatePicker
                name="estimateServiceDone"
                label={t('service:estimateServiceDone')}
                onChange={date => setFieldValue('estimateServiceDone', date)}
                showTime={{ format: 'HH:mm' }}
                format="YYYY-MM-DD HH:mm"
                showToday={false}
            />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    max-width: 300px;
`;

export default TimeTab;
