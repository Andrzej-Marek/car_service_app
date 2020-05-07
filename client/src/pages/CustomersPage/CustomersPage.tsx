import React from 'react';
import CustomersTable from './components/CustomersTable';
import { useQuery } from '@apollo/react-hooks';
import { GetAllCustomersQuery } from '@/generated/graphql';
import { GET_ALL_CUSTOMERS } from '@/graphql/customer/querys/getAllCustomers';
import LoadingSpinner from '@/components/Loaders/LoadingSpinner';

const CustomersPage = () => {
    const { data, loading, error } = useQuery<GetAllCustomersQuery>(GET_ALL_CUSTOMERS);

    if (error) return <div>error</div>;
    if (loading) return <LoadingSpinner loading={loading} />;
    return <CustomersTable loading={loading} customers={data!.getAllCustomers} />;
};

export default CustomersPage;
