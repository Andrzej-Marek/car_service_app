import React, { FC } from 'react';
import { useField } from 'formik';
import { Input } from 'antd';
import { styled } from '@/utils';
import { InputProps } from 'antd/lib/input';
import InputMask from 'react-input-mask';

interface OwnProps {
    label?: string;
    crossIconOnClick?: () => void;
    mask: string;
}

type Props = OwnProps & InputProps;

const MyMaskInputField: FC<Props> = ({ label, crossIconOnClick, mask, ...props }) => {
    const [field, meta] = useField(props as any);

    return (
        <Wrapper className="my-mask-input-filed">
            <label>{label && label}</label>
            <InputMask mask={mask} {...field}>
                <Input {...props} />
            </InputMask>
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
export default MyMaskInputField;
