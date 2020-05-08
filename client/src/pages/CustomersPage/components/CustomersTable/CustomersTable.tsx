import React, { FC } from 'react';
import { styled } from '@/utils';
import { Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { useTranslation } from 'react-i18next';
import AgreementsInfo from '@/components/TableElements/AgreementsInfo';
import { getColumnSearchPropsHook } from '@/hooks/getColumnSearchPropsHook';
import { CustomerFragment, DeleteCustomerMutation, DeleteCustomerMutationVariables } from '@/generated/graphql';
import { DELETE_CUSTOMER } from '@/graphql/customer/mutations';
import { useMutation } from '@apollo/react-hooks';
import ActionsRow from './components/ActionsRow';

interface OwnProps {
    customers: CustomerFragment[];
    loading: boolean;
}

type Props = OwnProps;

const CustomersTable: FC<Props> = ({ customers }) => {
    const { t } = useTranslation(['fields']);
    const [deleteCustomer] = useMutation<DeleteCustomerMutation, DeleteCustomerMutationVariables>(DELETE_CUSTOMER);

    const columns: ColumnProps<CustomerFragment>[] = [
        {
            title: t('fields:firstname'),
            dataIndex: 'firstname',
            key: 'firstname',
            ...getColumnSearchPropsHook('firstname'),
        },
        {
            title: t('fields:lastname'),
            dataIndex: 'lastname',
            key: 'lastname',
            ...getColumnSearchPropsHook('lastname'),
        },
        {
            title: t('fields:companyName'),
            dataIndex: 'companyName',
            key: 'companyName',
            ...getColumnSearchPropsHook('companyName'),
            width: 120,
        },
        {
            title: t('fields:mail'),
            dataIndex: 'mail',
            key: 'mail',
            ...getColumnSearchPropsHook('mail'),
        },
        {
            title: t('fields:phone'),
            dataIndex: 'phone',
            key: 'phone',
            ...getColumnSearchPropsHook('phone'),
        },
        {
            title: t('fields:discount'),
            dataIndex: 'discount',
            key: 'discount',
            render: (text: string) => <span>{text}%</span>,
            sorter: (a, b) => a.discount - b.discount,
        },
        {
            title: t('fields:postcode'),
            dataIndex: 'postcode',
            key: 'postcode',
        },
        {
            title: t('fields:street'),
            dataIndex: 'street',
            key: 'street',
            ...getColumnSearchPropsHook('street'),
        },
        {
            title: t('fields:adress'),
            dataIndex: 'adress',
            key: 'adress',
            ...getColumnSearchPropsHook('adress'),
        },
        {
            title: t('fields:vatNumber'),
            dataIndex: 'vatNumber',
            key: 'vatNumber',
            ...getColumnSearchPropsHook('vatNumber'),
        },
        {
            title: t('fields:agreements'),
            render: (_: string, { mailSendAgreement, marketingSendAgreement, smsSendAgreement }) => (
                <AgreementsInfo
                    smsSendAgreement={smsSendAgreement}
                    marketingSendAgreement={marketingSendAgreement}
                    mailSendAgreement={mailSendAgreement}
                />
            ),
        },
        {
            title: t('fields:actions'),
            dataIndex: 'id',
            key: 'actions',
            render: (_: string, context) => <ActionsRow context={context} />,
        },
    ];

    return (
        <Wrapper>
            <Table
                dataSource={customers}
                columns={columns}
                rowKey={record => record.id}
                size="small"
                // bordered
                scroll={{ x: 1600 }}
                pagination={{ defaultPageSize: 20 }}
                expandable={{
                    expandedRowRender: record => <p style={{ margin: 0 }}>{record.comment}</p>,
                    rowExpandable: record => !!record.comment,
                }}
            />
        </Wrapper>
    );
};

const Wrapper = styled.div``;

export default CustomersTable;
