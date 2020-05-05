import { styled } from '@/utils';

export const Error = styled.div`
    font-size: ${({ theme }) => theme.fontSize.normal};
    color: ${({ theme }) => theme.color.red};

    .center {
        text-align: center;
    }
`;
