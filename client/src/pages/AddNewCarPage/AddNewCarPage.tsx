import React, { useState, useRef } from 'react';
import { styled } from '@/utils';
import { Steps, Button, message } from 'antd';
import AddCustomerForm from '@/components/Forms/AddCustomerForm';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { AddCustomer } from '@/components/Forms/AddCustomerForm/types';
import { FormikValues, FormikHelpers } from 'formik';
import AddCarForm from '@/components/Forms/AddCarForm';
import { AddCar } from '@/components/Forms/AddCarForm/types';
import AddNewCarSummary from './components/AddNewCarSummary';
import {
    CreateNewVehicleWithCustomerMutation,
    CreateNewVehicleWithCustomerMutationVariables,
} from '@/generated/graphql';
import { CREATE_NEW_VEHICLE_AND_CUSTOMER } from '@/graphql/vehicle/mutations/createNewVehicleAndCustomer';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { RoutesEnum } from '@/Routes';

export interface FormsValues {
    addCar: undefined | AddCar;
    addCustomer: undefined | AddCustomer;
}

const { Step } = Steps;

const AddNewCarPage = () => {
    const { t } = useTranslation(['common', 'nav', 'errors']);
    const [createNewVehileWithCustomer, { error }] = useMutation<
        CreateNewVehicleWithCustomerMutation,
        CreateNewVehicleWithCustomerMutationVariables
    >(CREATE_NEW_VEHICLE_AND_CUSTOMER);

    const history = useHistory();

    const [formsValues, setFormsValues] = useState<FormsValues>({
        addCar: undefined,
        addCustomer: undefined,
    });

    const [currentStep, setCurrentStep] = useState(0);

    const [steps] = useState([
        {
            title: t('nav:addCar'),
        },
        {
            title: t('nav:addCustomer'),
        },
        {
            title: t('common:summary'),
        },
    ]);

    const addCustomerFormRef = useRef<FormikValues>(null);
    const addCarFormRef = useRef<FormikValues>(null);

    const nextStep = () => setCurrentStep(prevState => prevState + 1);
    const prevStep = () => setCurrentStep(prevState => prevState - 1);

    const createUserSubmitForm = (values: AddCustomer, _: FormikHelpers<AddCustomer>) => {
        setFormsValues(prevState => ({ ...prevState, addCustomer: values }));

        nextStep();
    };

    const addNewCarSubmitHandler = (values: AddCar) => {
        setFormsValues(prevState => ({ ...prevState, addCar: values }));
        nextStep();
    };

    const displayContentHandler = (currentStep: number) => {
        switch (currentStep) {
            case 0:
                return (
                    <AddCarForm
                        formRef={addCarFormRef}
                        submitForm={addNewCarSubmitHandler}
                        defaultValues={formsValues.addCar}
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
                if (addCarFormRef.current) {
                    addCarFormRef.current.handleSubmit();
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
        const { addCar, addCustomer } = formsValues;

        if (addCar && addCustomer) {
            try {
                await createNewVehileWithCustomer({ variables: { addCustomer, addVehicle: addCar } });
                if (!error) {
                    history.push(RoutesEnum.HOME_PAGE);
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

export default AddNewCarPage;
