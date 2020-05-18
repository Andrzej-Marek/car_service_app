import React, { FC } from 'react';
import { useField } from 'formik';
import { DatePicker } from 'antd';
import { styled } from '@/utils';
import { DatePickerProps } from 'antd/lib/date-picker';
import moment from 'moment';

interface OwnProps {
    label?: string;
}

type Props = OwnProps & DatePickerProps;

const MyDatePicker: FC<Props> = ({ label, ...props }) => {
    const [field, meta] = useField(props as any);

    return (
        <Wrapper className="my-field-input">
            <label>{label && label}</label>
            <DatePicker {...field} {...props} value={field.value ? moment(field.value) : null} format="DD-MM-YYYY" />
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

    .ant-picker {
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
export default MyDatePicker;
