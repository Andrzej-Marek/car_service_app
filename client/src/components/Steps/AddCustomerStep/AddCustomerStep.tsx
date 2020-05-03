import React, { FC, useState } from 'react';
import AddCustomerForm from '@/components/Forms/AddCustomerForm';
import { styled } from '@/utils';
import { Select, Button, Spin } from 'antd';
import { useLazyQuery } from '@apollo/react-hooks';
import { GET_ALL_CUSTOMERS } from '@/graphql/customer/querys/getAllCustomers';
import { GetAllCustomersQuery } from '@/generated/graphql';
import { FormikValues, FormikHelpers } from 'formik';
import { AddCustomer } from '@/components/Forms/AddCustomerForm/types';

interface OwnProps {
    formRef?: React.RefObject<FormikValues>;
    submitForm?: (values?: AddCustomer, formikHelpers?: FormikHelpers<AddCustomer>, userId?: string) => void;
    defaultValues?: AddCustomer | { userId: string };
}

type Props = OwnProps;

const { Option } = Select;

const AddCustomerStep: FC<Props> = ({ defaultValues, formRef, submitForm }) => {
    const [addNewCustomerForm, toggleAddNewCustomerForm] = useState(false);
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [getAllCustomers, { data, loading }] = useLazyQuery<GetAllCustomersQuery>(GET_ALL_CUSTOMERS);

    const onSelect = (value: string) => {
        setSelectedUser(value);
        if (submitForm) {
            submitForm(undefined, undefined, value);
        }
    };

    return (
        <Wrapper>
            <TopContent>
                <div>{addNewCustomerForm ? 'Dodaj nowego klienta' : 'Wybierz z listy'}</div>
                <div className="or-div">lub</div>
                <Button type="primary" onClick={() => toggleAddNewCustomerForm(!addNewCustomerForm)} size="small">
                    {addNewCustomerForm ? 'Wybierz z listy' : 'Dodaj nowego'}
                </Button>
            </TopContent>
            {addNewCustomerForm ? (
                <AddCustomerForm formRef={formRef} submitForm={submitForm} defaultValues={defaultValues} />
            ) : (
                <SelectContent>
                    <Select
                        showSearch
                        onFocus={() => getAllCustomers()}
                        notFoundContent={loading ? <Spin size="small" /> : null}
                        optionFilterProp="children"
                        onSelect={onSelect}
                    >
                        {data &&
                            data.getAllCustomers.map(({ firstname, lastname, companyName, id, adress }) => (
                                <Option key={id} value={id}>
                                    {companyName && companyName + ': '}
                                    {firstname} {lastname} {adress && ' - ' + adress}
                                </Option>
                            ))}
                    </Select>
                </SelectContent>
            )}
        </Wrapper>
    );
};

const Wrapper = styled.div``;
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
const SelectContent = styled.div`
    max-width: 90vw;
    max-width: 350px;
    margin: 0 auto;
    padding-top: 10px;

    .ant-select {
        width: 100%;
    }
`;

export default AddCustomerStep;
