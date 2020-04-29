import React from 'react';
import { styled } from '@/utils';
import CustomersTable from './components/CustomersTable';

const CustomersPage = () => {
    return (
        <Wrapper>
            <CustomersTable />
        </Wrapper>
    );
};

const Wrapper = styled.div``;

export default CustomersPage;
