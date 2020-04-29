import React, { FC } from 'react';
import { useField } from 'formik';
import { Radio } from 'antd';
import { styled } from '@/utils';

interface OwnProps {
    [x: string]: any;
}

type Props = OwnProps;

const MyRadioGroup: FC<Props> = ({ children, ...props }) => {
    const [field, meta] = useField(props as any);
    return (
        <Wrapper className="my-radio-group">
            <Radio.Group buttonStyle="solid" {...field} {...props}>
                {children}
            </Radio.Group>
            {meta.touched && meta.error && <div className="error">{meta.error}</div>}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    margin: 5px;

    .error {
        font-size: ${({ theme }) => theme.fontSize.normal};
        color: ${({ theme }) => theme.color.red};
    }
`;
export default MyRadioGroup;
