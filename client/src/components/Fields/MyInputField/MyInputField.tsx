import React, { FC } from 'react';
import { useField } from 'formik';
import { Input } from 'antd';
import { styled } from '@/utils';
import { InputProps } from 'antd/lib/input';
import { CloseCircleOutlined } from '@ant-design/icons';

interface OwnProps {
    label?: string;
    crossIconOnClick?: () => void;
}

type Props = OwnProps & InputProps;

const MyInputField: FC<Props> = ({ label, crossIconOnClick, ...props }) => {
    const [field, meta] = useField(props as any);

    return (
        <Wrapper className="my-field-input">
            <label>
                {label && label}{' '}
                {crossIconOnClick && <CloseCircleOutlined className="cross-icon" onClick={crossIconOnClick} />}
            </label>
            <Input {...field} {...props} />
            {meta.touched && meta.error && <div className="error">{meta.error}</div>}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    margin: 5px;

    .cross-icon {
        color: ${({ theme }) => theme.color.red};
        margin-right: 5px;
        transition: 0.5s;
        cursor: pointer;

        :hover {
            box-shadow: ${({ theme }) => theme.boxShadow.md};
        }
    }

    label {
        font-size: ${({ theme }) => theme.fontSize.normal};
    }

    .select-after {
        font-size: 14px;
        width: 70px;
    }

    svg {
        margin-right: 5px;
    }

    .error {
        font-size: ${({ theme }) => theme.fontSize.normal};
        color: ${({ theme }) => theme.color.red};
    }
`;
export default MyInputField;
