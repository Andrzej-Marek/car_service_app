import React, { FC } from 'react';
import { Alert } from 'antd';

interface OwnProps {
    message: string;
}

type Props = OwnProps;

const GeneralError: FC<Props> = ({ message }) => {
    return <Alert message={message} type="error" />;
};

export default GeneralError;
