import React, { FC } from 'react';
import styled from 'styled-components';
import { Popover } from 'antd';
import { CameraOutlined } from '@ant-design/icons';
import { SERVER_URL } from '@/config';

interface OwnProps {
    url: string;
}

type Props = OwnProps;

const ImagePreview: FC<Props> = ({ url }) => {
    return (
        <CustomPopover content={<PreviewImage src={SERVER_URL + url} alt="" />}>
            <a href={SERVER_URL + url} target="_blank">
                <CameraOutlined />
            </a>
        </CustomPopover>
    );
};

const CustomPopover = styled(Popover)`
    background: rgba(0, 0, 0, 0) !important;
`;

const PreviewImage = styled.img`
    width: 200px;
    height: auto;
    max-height: 300px;
`;
export default ImagePreview;
