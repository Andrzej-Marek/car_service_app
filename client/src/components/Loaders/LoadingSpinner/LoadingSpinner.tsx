import React, { FC } from 'react';
import { styled } from '@/utils';
import { Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { SpinProps } from 'antd/lib/spin';

interface OwnProps {
    loading: boolean;
}

type Props = OwnProps & SpinProps;

const LoadingSpinner: FC<Props> = ({ loading, ...props }) => {
    const { t } = useTranslation('common');

    return (
        <Wrapper>
            <Spin spinning={loading} tip={t('loading.loading')} {...props} />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    text-align: center;
`;

export default LoadingSpinner;
