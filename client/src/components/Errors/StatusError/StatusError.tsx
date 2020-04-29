import React, { FC } from 'react';
import styled from 'styled-components';
import { Alert } from 'antd';
import { ApolloError } from 'apollo-boost';
import { useTranslation } from 'react-i18next';

interface OwnProps {
    error: ApolloError | undefined;
}

type Props = OwnProps;

const StatusError: FC<Props> = ({ error }) => {
    const { t } = useTranslation('errors');

    const displayMessageHandler = () => {
        if (!error?.graphQLErrors[0].extensions?.exception.status) {
            return 'Nie znany błąd aplikacji';
        }
        const { status } = error.graphQLErrors[0].extensions.exception;

        switch (status) {
            case 404:
                return t('notFound.account');
            default:
                return 'Nie znany błąd';
        }
    };

    if (!error) {
        return null;
    }
    return <CustomAlert message={displayMessageHandler()} type="error" showIcon closable />;
};

const CustomAlert = styled(Alert)`
    margin: 10px 0;
`;

export default StatusError;
