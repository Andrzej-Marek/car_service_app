import React, { FC } from 'react';
import { useField } from 'formik';
import { Input } from 'antd';
import { styled } from '@/utils';
import { TextAreaProps } from 'antd/lib/input';

const { TextArea } = Input;

interface OwnProps {
    label?: string;
}

type Props = OwnProps & TextAreaProps;

const MyTextArea: FC<Props> = ({ label, ...props }) => {
    const [field, meta] = useField(props as any);

    return (
        <Wrapper className="my-field-input">
            <label>
                {label && label}
                <TextArea {...field} {...props} />
            </label>
            {meta.touched && meta.error && <div className="error">{meta.error}</div>}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    margin: 5px;
    label {
        font-size: ${({ theme }) => theme.fontSize.normal};
    }

    svg {
        margin-right: 5px;
    }

    .error {
        font-size: ${({ theme }) => theme.fontSize.normal};
        color: ${({ theme }) => theme.color.red};
    }
`;
export default MyTextArea;
