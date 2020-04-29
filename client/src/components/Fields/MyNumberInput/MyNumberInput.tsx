import React, { FC } from 'react';
import { useField } from 'formik';
import { styled } from '@/utils';
import InputNumber, { InputNumberProps } from 'antd/lib/input-number';

interface OwnProps {
    label?: string;
    onChange: (value: number | undefined) => void;
}

type Props = OwnProps & InputNumberProps & React.RefAttributes<unknown>;

const MyNumberInput: FC<Props> = ({ label, onChange, ...props }) => {
    const [field, meta] = useField(props as any);
    return (
        <Wrapper className="my-field-number-input">
            <label>
                {label && label}
                <InputNumber {...field} {...props} onChange={onChange} />
            </label>
            {meta.touched && meta.error && <div className="error">{meta.error}</div>}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    margin: 5px;

    label {
        display: flex;
        flex-direction: column;
    }

    svg {
        margin-right: 5px;
    }

    .error {
        font-size: ${({ theme }) => theme.fontSize.normal};
        color: ${({ theme }) => theme.color.red};
    }
`;
export default MyNumberInput;
