import { styled, media } from '@/utils';
import { Modal } from 'antd';

export const CustomFormModal = styled(Modal)`
    width: 95vw !important;
    max-width: 1200px;
    top: 20px;

    ${media.md`
        width: 90vw !important;
    `}
`;
