import React from 'react';
import { styled } from '@/utils';
import { Row, Col, Button, Input } from 'antd';
import { GET_ALL_VEHICLES } from '@/graphql/vehicle/querys';
import { useQuery } from '@apollo/react-hooks';
import { GetAllVehiclesQuery, VehicleFragment } from '@/generated/graphql';
import MySelect from '@/components/Fields/MySelect';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import ConfigPanel from './components/ConfigPanel';
import TabsContent from './components/TabsContent';
import { ServiceEstimateFields } from './types';
import LoadingSpinner from '@/components/Loaders/LoadingSpinner';

const NewServicePage = () => {
    const { t } = useTranslation(['fields', 'common']);

    const { data: vehicleList, loading } = useQuery<GetAllVehiclesQuery>(GET_ALL_VEHICLES);

    const createSelectVehicleList = (vehicleList: VehicleFragment[]) => {
        const optionFormat = vehicleList.map(({ id, brand, model, registrationNumber, customer }) => ({
            value: id,
            label: `${brand} ${model} ${registrationNumber && registrationNumber} - ${customer.firstname} ${
                customer.lastname
            }`,
        }));
        return optionFormat;
    };

    if (loading) return <LoadingSpinner loading={loading} />;
    if (!vehicleList?.getAllVehicles) return <div>NO VEHICLE LIST</div>;
    const { getAllVehicles } = vehicleList;
    return (
        <Wrapper>
            <Formik
                initialValues={{
                    date: new Date(),
                    vehicleId: '',
                    serviceNumber: '10/05/2020',
                    estimateServiceDone: '10:42 08-05-2020',
                    netPrices: false,
                    estimate: [
                        {
                            name: '',
                            price: '',
                            amount: '',
                            summary: '',
                        },
                    ] as ServiceEstimateFields[],
                    deposit: [] as string[],
                    currency: 'zł',
                    images: [],
                    description: '',
                    privateDescription: '',
                }}
                onSubmit={values => console.log(values)}
            >
                {({ setFieldValue, handleSubmit, values, handleChange }) => (
                    <form onSubmit={handleSubmit}>
                        <Row>
                            <Col xs={24} lg={12}>
                                <ConfigPanel setFieldValue={setFieldValue} />
                            </Col>
                            <Col xs={24} lg={12}>
                                <MySelect
                                    className="vehicle-select"
                                    name="vehicleId"
                                    label={t('fields:selectVehicle')}
                                    onChange={(value: string) => setFieldValue('vehicleId', value)}
                                    options={createSelectVehicleList(getAllVehicles)}
                                />
                            </Col>
                        </Row>
                        <br />
                        <TabsContent setFieldValue={setFieldValue} estimate={values.estimate} />
                        <ButtonWrapper>
                            <Button type="primary" htmlType="submit">
                                {t('common:accept')}
                            </Button>
                        </ButtonWrapper>
                    </form>
                )}
            </Formik>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    .vehicle-select {
        max-width: 300px;
    }
`;

const ButtonWrapper = styled.div`
    margin: 10px;
`;

export default NewServicePage;
