import React, { FC } from 'react';
import { Button } from 'antd';

interface OwnProps {
    text: string;
    loading?: boolean;
    type?: ButtonType;
    onClick?: any;
    width?: number | string;
    [x: string]: any;
}

type ButtonType = 'link' | 'ghost' | 'danger' | 'default' | 'primary' | 'dashed' | undefined;

type Props = OwnProps;

const ClassicButton: FC<Props> = ({ text, loading = false, type = 'primary', onClick, width, ...rest }) => {
    return (
        <Button type={type} loading={loading} onClick={onClick} {...rest} style={{ width }}>
            {text}
        </Button>
    );
};

export default ClassicButton;
