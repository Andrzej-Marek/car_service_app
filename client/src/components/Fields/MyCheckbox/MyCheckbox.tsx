import React, { FC } from 'react';
import { useField } from 'formik';
import { Checkbox } from 'antd';
import { styled, media } from '@/utils';

interface OwnProps {
    label?: string;
    [x: string]: any;
}

type Props = OwnProps;

const MyCheckbox: FC<Props> = ({ label, ...props }) => {
    const [field, meta] = useField(props as any);
    return (
        <Wrapper className="my-checkbox">
            <Checkbox {...field} checked={field.value} {...props}>
                {label}
            </Checkbox>
            {meta.touched && meta.error && <div className="error">{meta.error}</div>}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    margin: 5px;

    label {
        font-size: ${({ theme }) => theme.fontSize.small};
    }

    svg {
        margin-right: 5px;
    }

    .error {
        font-size: ${({ theme }) => theme.fontSize.normal};
        color: ${({ theme }) => theme.color.red};
    }
`;
export default MyCheckbox;
