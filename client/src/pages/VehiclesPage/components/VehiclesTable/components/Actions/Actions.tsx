import React, { FC } from 'react';
import { styled } from '@/utils';

interface OwnProps {}

type Props = OwnProps;

const Actions: FC<Props> = () => {
    return (
        <Wrapper>
            <div>Akcje</div>
        </Wrapper>
    );
};

const Wrapper = styled.div``;

export default Actions;
