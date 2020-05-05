import React, { FC } from 'react';
import { styled } from '@/utils';
import { Select, Spin } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import { GetAllCustomersQuery } from '@/generated/graphql';
import { GET_ALL_CUSTOMERS } from '@/graphql/customer/querys/getAllCustomers';

interface OwnProps {
    setFieldValue: any;
    defaultValue?: string | null;
}
type Props = OwnProps;

const { Option } = Select;
const SelectUser: FC<Props> = ({ setFieldValue, defaultValue }) => {
    const { data, loading } = useQuery<GetAllCustomersQuery>(GET_ALL_CUSTOMERS);

    return (
        <SelectContent>
            <Select
                showSearch
                notFoundContent={loading ? <Spin size="small" /> : null}
                optionFilterProp="children"
                onSelect={value => setFieldValue('customerId', value + '')}
                defaultValue={defaultValue || undefined}
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
    );
};

const SelectContent = styled.div`
    max-width: 90vw;
    max-width: 350px;
    margin: 0 auto;
    padding-top: 10px;

    .ant-select {
        width: 100%;
    }
`;
export default SelectUser;
