import React from 'react';
import { styled } from '@/utils';
import { Row, Col, Button } from 'antd';
import { GET_ALL_VEHICLES } from '@/graphql/vehicle/querys';
import { useQuery } from '@apollo/react-hooks';
import { GetAllVehiclesQuery, VehicleFragment } from '@/generated/graphql';
import MySelect from '@/components/Fields/MySelect';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import ConfigPanel from './components/ConfigPanel';
import TabsContent from './components/TabsContent';
import { SerivceEstimate } from './types';
import ClassicButton from '@/components/Buttons/ClassicButton';

const NewServicePage = () => {
    const { t } = useTranslation(['fields']);
    const { data: vehicleList, loading, error } = useQuery<GetAllVehiclesQuery>(GET_ALL_VEHICLES);

    const createSelectVehicleList = (vehicleList: VehicleFragment[]) => {
        const optionFormat = vehicleList.map(({ id, brand, model, registrationNumber, customer }) => ({
            value: id,
            label: `${brand} ${model} ${registrationNumber && registrationNumber} - ${customer.firstname} ${
                customer.lastname
            }`,
        }));
        return optionFormat;
    };
    if (error) return <div>Error</div>;
    if (!vehicleList?.getAllVehicles) return <div>NO VEHICLE LIST</div>;
    const { getAllVehicles } = vehicleList;
    return (
        <Wrapper>
            <Formik
                initialValues={{
                    date: new Date(),
                    vehicleId: '',
                    serviceNumber: '10/05/2020',
                    estimate: [
                        {
                            name: '',
                            price: '',
                            amount: '',
                            summary: '',
                        },
                    ] as SerivceEstimate[],
                }}
                onSubmit={values => console.log(values)}
            >
                {({ setFieldValue, handleSubmit, values }) => (
                    <form onSubmit={handleSubmit}>
                        <Row>
                            <Col xs={24} lg={12}>
                                <ConfigPanel setFieldValue={setFieldValue} />
                            </Col>
                            <Col xs={24} lg={12}>
                                <MySelect
                                    name="vehicleId"
                                    label={t('fields:selectVehicle')}
                                    onChange={(value: string) => setFieldValue('vehicleId', value)}
                                    options={createSelectVehicleList(getAllVehicles)}
                                />
                            </Col>
                        </Row>
                        <br />
                        <br />
                        <TabsContent setFieldValue={setFieldValue} estimate={values.estimate} />
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </form>
                )}
            </Formik>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    .my-select {
        max-width: 100%;
        width: 300px;
    }
`;

export default NewServicePage;
