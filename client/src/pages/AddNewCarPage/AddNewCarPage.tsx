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
import AddCustomerStep from '@/components/Steps/AddCustomerStep';

export interface FormsValues {
    addCar: undefined | AddCar;
    addCustomer: undefined | AddCustomer | { userId: string };
}

const { Step } = Steps;

const AddNewCarPage = () => {
    const { t } = useTranslation(['common', 'addNewCarPage', 'errors']);
    const [formsValues, setFormsValues] = useState<FormsValues>({
        addCar: undefined,
        addCustomer: undefined,
    });

    const [currentStep, setCurrentStep] = useState(0);

    const [steps] = useState([
        {
            title: t('addNewCarPage:addCar'),
        },
        {
            title: t('addNewCarPage:addCustomer'),
        },
        {
            title: 'Last',
        },
    ]);

    const addCustomerFormRef = useRef<FormikValues>(null);
    const addCarFormRef = useRef<FormikValues>(null);

    const nextStep = () => setCurrentStep(prevState => prevState + 1);
    const prevStep = () => setCurrentStep(prevState => prevState - 1);

    const createUserSubmitForm = (values: AddCustomer, _: FormikHelpers<AddCustomer>, userId: string) => {
        if (userId) {
            setFormsValues(prevState => ({ ...prevState, addCustomer: { userId } }));
        } else {
            setFormsValues(prevState => ({ ...prevState, addCustomer: { ...values, userId } }));
        }

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
                    <AddCustomerStep
                        formRef={addCustomerFormRef}
                        submitForm={createUserSubmitForm}
                        defaultValues={formsValues.addCustomer}
                    />
                );
            // case 1:
            //     return (
            //         <AddCustomerForm
            //             formRef={addCustomerFormRef}
            //             submitForm={createUserSubmitForm}
            //             defaultValues={formsValues.addCustomer}
            //         />
            //     );
            case 2:
                return <p>END ONE</p>;
            default:
                return <p>Default one</p>;
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

    console.log(formsValues);
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
                    <Button type="primary" onClick={() => message.success('Processing complete!')}>
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
