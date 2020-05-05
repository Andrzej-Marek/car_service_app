import React, { FC } from 'react';
import { styled } from '@/utils';
import { Button } from 'antd';

interface OwnProps {
    addNewFormShow: boolean;
    addNewFormShowToggle: (toggleOption: boolean) => void;
}

type Props = OwnProps;

const ToggleContent: FC<Props> = ({ addNewFormShow, addNewFormShowToggle, ...props }) => {
    return (
        <TopContent>
            <div>{addNewFormShow ? 'Dodaj nowego klienta' : 'Wybierz z listy'}</div>
            <div className="or-div">lub</div>
            <Button type="primary" name={name} onClick={() => addNewFormShowToggle(!addNewFormShow)} size="small">
                {addNewFormShow ? 'Wybierz z listy' : 'Dodaj nowego'}
            </Button>
        </TopContent>
    );
};

const TopContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;

    div,
    button {
        margin: 0 5px;
    }

    .or-div {
        font-weight: 700;
    }
`;
export default ToggleContent;
