import React, { FC } from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import { styled } from '@/utils';
import { css } from 'styled-components';

interface OwnProps {
    text: string;
    loading?: boolean;
    type?: ButtonType;
    onClick?: any;
    width?: number | string;
    maxWidth?: string;
}

type ButtonType = 'link' | 'ghost' | 'danger' | 'default' | 'primary' | 'dashed' | undefined;

type Props = OwnProps & ButtonProps;

const ClassicButton: FC<Props> = ({ text, loading = false, type = 'primary', onClick, width, maxWidth, ...rest }) => {
    return (
        <ButtonWrapper maxWidth={maxWidth as any}>
            <Button type={type} loading={loading} onClick={onClick} {...rest} style={{ width }}>
                {text}
            </Button>
        </ButtonWrapper>
    );
};

const ButtonWrapper = styled.div<{ maxWidth: string }>`
    margin: 10px 0;
    display: flex;
    justify-content: center;

    max-width: ${(props: { maxWidth: string }) =>
        props.maxWidth &&
        css`
    max-width: ${props.maxWidth}
    margin: 0 auto;
    `};
`;
export default ClassicButton;
