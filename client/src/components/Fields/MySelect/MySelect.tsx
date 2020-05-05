import React, { FC } from 'react';
import { useField } from 'formik';
import { styled } from '@/utils';
import Select, { SelectProps } from 'antd/lib/select';

interface OwnProps {
    label?: string;
    onChange: (value: string) => void;
    name: string;
}

type Props = OwnProps & SelectProps<any>;

const MySelect: FC<Props> = ({ label, onChange, ...props }) => {
    const [field, meta] = useField(props as any);

    return (
        <Wrapper className="my-field-input">
            <label>{label && label} </label>
            <Select
                showSearch
                name={name}
                {...field}
                {...props}
                onChange={onChange}
                filterOption={(input, option) => (option!.label as any).toLowerCase().indexOf(input.toLowerCase()) >= 0}
            />
            {meta.touched && meta.error && <div className="error">{meta.error}</div>}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    margin: 5px;

    label {
        font-size: ${({ theme }) => theme.fontSize.normal};
        display: block;
    }

    .ant-select {
        width: 100%;
    }

    svg {
        margin-right: 5px;
    }

    .error {
        font-size: ${({ theme }) => theme.fontSize.normal};
        color: ${({ theme }) => theme.color.red};
    }
`;
export default MySelect;
