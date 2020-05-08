import React from 'react';
import { styled } from '@/utils';
import { useQuery } from '@apollo/react-hooks';
import { GET_ALL_VEHICLES } from '@/graphql/vehicle/querys';
import { GetAllVehiclesQuery } from '@/generated/graphql';
import LoadingSpinner from '@/components/Loaders/LoadingSpinner';
import VehiclesTable from './components/VehiclesTable';

const VehiclesPage = () => {
    const { data, loading, error } = useQuery<GetAllVehiclesQuery>(GET_ALL_VEHICLES);

    if (loading) return <LoadingSpinner loading={loading} />;
    return (
        <Wrapper>
            <VehiclesTable vehicles={data?.getAllVehicles as any} />
        </Wrapper>
    );
};

const Wrapper = styled.div``;

export default VehiclesPage;
