import React from 'react';
import { styled } from '@/utils';
import { Row, Col, Button, message } from 'antd';
import { GET_ALL_VEHICLES } from '@/graphql/vehicle/querys';
import { useQuery } from '@apollo/react-hooks';
import { GetAllVehiclesQuery, VehicleFragment, useCreateVehicleServiceMutation } from '@/generated/graphql';
import MySelect from '@/components/Fields/MySelect';
import { useTranslation } from 'react-i18next';
import { Formik, FormikHelpers } from 'formik';
import ConfigPanel from './components/ConfigPanel';
import TabsContent from './components/TabsContent';
import { CreateVehicleServiceFormFields } from './types';
import LoadingSpinner from '@/components/Loaders/LoadingSpinner';
import { mapCreateVehicleServiceFormFiledsToServerDto } from '@/helpers';
import { createVehicleServiceSchema } from './validations';
import { Currency } from '@/enums';

const NewServicePage = () => {
    const { t } = useTranslation(['fields', 'common', 'errors', 'notifications']);

    const { data: vehicleList, loading } = useQuery<GetAllVehiclesQuery>(GET_ALL_VEHICLES);
    const [createVehicleService] = useCreateVehicleServiceMutation();

    const createSelectVehicleList = (vehicleList: VehicleFragment[]) => {
        const optionFormat = vehicleList.map(({ id, brand, model, registrationNumber, customer }) => ({
            value: id,
            label: `${brand} ${model} ${registrationNumber || ''} - ${customer.firstname} ${customer.lastname}`,
        }));
        return optionFormat;
    };

    const submitHandler = async (
        formData: CreateVehicleServiceFormFields,
        { resetForm }: FormikHelpers<CreateVehicleServiceFormFields>,
    ) => {
        const mappedFormData = mapCreateVehicleServiceFormFiledsToServerDto(formData);
        try {
            createVehicleService({ variables: { createVehicleService: mappedFormData } });
            resetForm();
            message.success(t('notifications:successOperation'));
        } catch (error) {
            message.error(t('errors:generalError'));
        }
    };

    if (loading) return <LoadingSpinner loading={loading} />;
    if (!vehicleList?.getAllVehicles) return <div>NO VEHICLE LIST</div>;
    const { getAllVehicles } = vehicleList;
    return (
        <Wrapper>
            <Formik
                initialValues={
                    {
                        date: new Date() + '',
                        vehicleId: '',
                        serviceNumber: '01/05/2020',
                        estimateServiceDone: '10:42 08-05-2020',
                        netPrices: false,
                        costs: [
                            {
                                name: '',
                                price: '',
                                amount: '',
                                summary: '',
                            },
                        ],
                        deposit: [],
                        advancePayment: 0,
                        currency: Currency.polish,
                        images: [],
                        description: '',
                        privateDescription: '',
                    } as CreateVehicleServiceFormFields
                }
                validationSchema={createVehicleServiceSchema}
                onSubmit={submitHandler}
            >
                {({ setFieldValue, handleSubmit, values }) => (
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
                        <TabsContent setFieldValue={setFieldValue} estimate={values.costs} />
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
