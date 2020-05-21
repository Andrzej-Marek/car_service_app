import React, { FC } from 'react';
import styled from 'styled-components';
import MySelect from '@/components/Fields/MySelect';
import { depositList } from './depositList';
import { useTranslation } from 'react-i18next';

interface OwnProps {
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}

type Props = OwnProps;

const ServiceDeposit: FC<Props> = ({ setFieldValue }) => {
    const { t } = useTranslation(['fields']);
    return (
        <Wrapper>
            <MySelect
                label={t('addDeposit')}
                mode="multiple"
                name="deposit"
                onChange={(values: string[]) => setFieldValue('deposit', values)}
                options={depositList}
            />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    .my-select {
        width: 90% !important;
        max-width: 500px !important;
    }
`;

export default ServiceDeposit;
