import React from 'react';
import { styled } from '@/utils';
import { Table } from 'antd';

const dataSource = [
    {
        key: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
    },
    {
        key: '2',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
    },
];

const CustomersTable = () => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
    ];
    return (
        <Wrapper>
            <Table
                dataSource={dataSource}
                columns={columns}
                size="small"
                scroll={{ x: true }}
                pagination={{ defaultPageSize: 20 }}
            />
        </Wrapper>
    );
};

const Wrapper = styled.div``;

export default CustomersTable;
