import React, { useState, useRef } from 'react';
import { styled } from '@/utils';
import { Steps, Button, message } from 'antd';
import AddCustomerForm from '@/components/Forms/AddCustomerForm';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { AddCustomer } from '@/components/Forms/AddCustomerForm/types';
import { FormikValues, FormikHelpers } from 'formik';
import AddVehicleForm, { AddVehicle } from '@/components/Forms/AddVehicleForm';
import AddNewCarSummary from './components/AddNewVehicleSummary';
import {
    CreateNewVehicleWithCustomerMutation,
    CreateNewVehicleWithCustomerMutationVariables,
} from '@/generated/graphql';
import { CREATE_NEW_VEHICLE_AND_CUSTOMER } from '@/graphql/vehicle/mutations/createNewVehicleAndCustomer';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { RoutesEnum } from '@/Routes';
import { GET_ALL_CUSTOMERS } from '@/graphql/customer/querys/getAllCustomers';
import { GET_ALL_VEHICLES } from '@/graphql/vehicle/querys';

export interface FormsValues {
    addVehicle: undefined | AddVehicle;
    addCustomer: undefined | AddCustomer;
    vehicleImage: undefined | File;
}

const { Step } = Steps;

const AddNewVehicleWithCustomerPage = () => {
    const { t } = useTranslation(['common', 'nav', 'errors']);
    const [createNewVehileWithCustomer, { error }] = useMutation<
        CreateNewVehicleWithCustomerMutation,
        CreateNewVehicleWithCustomerMutationVariables
    >(CREATE_NEW_VEHICLE_AND_CUSTOMER);

    const history = useHistory();

    const [formsValues, setFormsValues] = useState<FormsValues>({
        addVehicle: undefined,
        addCustomer: undefined,
        vehicleImage: undefined,
    });

    const [currentStep, setCurrentStep] = useState(0);

    const [steps] = useState([
        {
            title: t('nav:addVehicle'),
        },
        {
            title: t('nav:addCustomer'),
        },
        {
            title: t('common:summary'),
        },
    ]);

    const addCustomerFormRef = useRef<FormikValues>(null);
    const addVehicleFormRef = useRef<FormikValues>(null);

    const nextStep = () => setCurrentStep(prevState => prevState + 1);
    const prevStep = () => setCurrentStep(prevState => prevState - 1);

    const createUserSubmitForm = (values: AddCustomer, _: FormikHelpers<AddCustomer>) => {
        setFormsValues(prevState => ({ ...prevState, addCustomer: values }));
        nextStep();
    };

    const addNewVehicleSubmitHandler = (values: AddVehicle) => {
        setFormsValues(prevState => ({ ...prevState, addVehicle: values }));
        nextStep();
    };

    const displayContentHandler = (currentStep: number) => {
        switch (currentStep) {
            case 0:
                return (
                    <AddVehicleForm
                        formRef={addVehicleFormRef}
                        submitForm={addNewVehicleSubmitHandler}
                        defaultValues={formsValues.addVehicle}
                        vehicleImage={formsValues.vehicleImage}
                        setVehicleImage={vehicleImage => setFormsValues(prevState => ({ ...prevState, vehicleImage }))}
                    />
                );
            case 1:
                return (
                    <AddCustomerForm
                        formRef={addCustomerFormRef}
                        submitForm={createUserSubmitForm}
                        defaultValues={formsValues.addCustomer}
                        showSwitchForm={true}
                    />
                );
            case 2:
                return <AddNewCarSummary summary={formsValues} />;
            default:
                return <p>ERROR</p>;
        }
    };

    const nextStepClickHandler = (step: number) => {
        switch (step) {
            case 0:
                if (addVehicleFormRef.current) {
                    addVehicleFormRef.current.handleSubmit();
                }
                break;
            case 1:
                if (addCustomerFormRef.current) {
                    addCustomerFormRef.current.handleSubmit();
                }
                break;
            default:
                break;
        }
    };

    const saveHandler = async () => {
        const { addVehicle, addCustomer, vehicleImage } = formsValues;

        if (addVehicle && addCustomer) {
            try {
                await createNewVehileWithCustomer({
                    variables: { addCustomer, addVehicle: addVehicle, vehicleImage: vehicleImage },
                    refetchQueries: [{ query: GET_ALL_CUSTOMERS }, { query: GET_ALL_VEHICLES }],
                });
                if (!error) {
                    history.push(RoutesEnum.VEHICLES_PAGE);
                }
                message.success(t('common:saveSuccess'));
            } catch (error) {
                message.error(t('common:saveError'));
            }
        }
    };

    return (
        <Wrapper>
            <Steps current={currentStep}>
                {steps.map(item => (
                    <Step key={item.title} title={item.title} />
                ))}
            </Steps>
            <div className="steps-content">{displayContentHandler(currentStep)}</div>
            <div className="steps-action">
                {currentStep > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={() => prevStep()}>
                        <ArrowLeftOutlined /> {t('previous')}
                    </Button>
                )}
                {currentStep === steps.length - 1 && (
                    <Button type="primary" onClick={saveHandler}>
                        {t('save')}
                    </Button>
                )}
                {currentStep < steps.length - 1 && (
                    <Button type="primary" onClick={() => nextStepClickHandler(currentStep)}>
                        {t('next')}
                    </Button>
                )}
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    .steps-content {
        margin-top: 16px;
        border: 1px dashed #e9e9e9;
        border-radius: 2px;
        min-height: 200px;
    }

    .steps-action {
        margin-top: 24px;
    }
`;

export default AddNewVehicleWithCustomerPage;
