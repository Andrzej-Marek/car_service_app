import React, { FC } from 'react';
import { styled } from '@/utils';
import { useTranslation } from 'react-i18next';
import { Formik, FormikHelpers, FormikValues } from 'formik';
import { Col, Row, message, Modal } from 'antd';
import MyInputField from '@/components/Fields/MyInputField';
import MyCheckbox from '@/components/Fields/MyCheckbox';
import MyNumberInput from '@/components/Fields/MyNumberInput';
import MyTextArea from '@/components/Fields/MyTextArea';
import ClassicButton from '@/components/Buttons/ClassicButton';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_NEW_CUSTOMER } from '@/graphql/customer/mutations';
import { CreateNewCustomerMutation, CreateNewCustomerMutationVariables } from '@/generated/graphql';
import GeneralError from '@/components/Errors/GeneralError';
import { createUserSchema } from '@/validations';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { AddCustomer } from './types';
import SelectUser from './components/SelectUser';
import ToggleContent from './components/ToggleContent';
import { Error } from '@/assets/images/styles';

interface OwnProps {
    toggle?: () => void;
    formRef?: React.RefObject<FormikValues>;
    submitForm?: (values: AddCustomer, formikHelpers: FormikHelpers<AddCustomer>) => void;
    defaultValues?: AddCustomer;
    showSwitchForm?: boolean;
}

type Props = OwnProps;

const { confirm } = Modal;

const AddCustomerForm: FC<Props> = ({ toggle, defaultValues, submitForm, formRef, showSwitchForm = false }) => {
    const { t } = useTranslation(['fields', 'common', 'errors', 'validations']);
    const [createNewCustomer, { error }] = useMutation<CreateNewCustomerMutation, CreateNewCustomerMutationVariables>(
        CREATE_NEW_CUSTOMER,
    );

    const showConfirmModal = async (values: AddCustomer, helpers: FormikHelpers<AddCustomer>) => {
        confirm({
            title: t('validations:createUserBooleansAccept'),
            content: t('validations:createUserBooleansAcceptExplain'),
            icon: <ExclamationCircleOutlined />,
            onOk() {
                if (submitForm) {
                    submitForm(values, helpers);
                } else {
                    InComponentSubmitHandler(values, helpers);
                }
            },
            okText: t('common:save'),
            cancelText: t('common:cancel'),
        });
    };

    const InComponentSubmitHandler = async (values: AddCustomer, helpers: FormikHelpers<AddCustomer>) => {
        try {
            await createNewCustomer({ variables: values });
            toggle && toggle();
            message.success(t('common:saveSuccess'));
            helpers.resetForm();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Formik
            innerRef={formRef as any}
            initialValues={
                defaultValues
                    ? defaultValues
                    : {
                          createNewCustomer: !showSwitchForm,
                          customerId: null,
                          firstname: '',
                          lastname: '',
                          companyName: '',
                          vatNumber: '',
                          street: '',
                          postcode: '',
                          adress: '',
                          phone: '',
                          mail: '',
                          comment: '',
                          discount: 0,
                          mailSendAgreement: false,
                          smsSendAgreement: false,
                          marketingSendAgreement: false,
                      }
            }
            validationSchema={createUserSchema}
            validateOnBlur={true}
            onSubmit={async (values, helpers) => {
                const {
                    marketingSendAgreement,
                    mailSendAgreement,
                    smsSendAgreement,
                    createNewCustomer,
                    customerId,
                } = values;

                if (!customerId && !createNewCustomer) {
                    return helpers.setFieldError('customerId', t('validations:required'));
                }

                if (!marketingSendAgreement && !mailSendAgreement && !smsSendAgreement && createNewCustomer) {
                    return showConfirmModal(values, helpers);
                }

                if (submitForm) {
                    submitForm(values, helpers);
                } else {
                    await InComponentSubmitHandler(values, helpers);
                }
            }}
        >
            {({ handleSubmit, setFieldValue, values, errors }) => (
                <form onSubmit={handleSubmit}>
                    {error && <GeneralError message={t('errors:generalError')} />}
                    {showSwitchForm && (
                        <ToggleContent
                            addNewFormShow={values.createNewCustomer}
                            addNewFormShowToggle={() => setFieldValue('createNewCustomer', !values.createNewCustomer)}
                        />
                    )}
                    {!values.createNewCustomer && showSwitchForm ? (
                        <Row>
                            <Col xs={24}>
                                <SelectUser setFieldValue={setFieldValue} defaultValue={values.customerId} />
                                {errors.customerId && (
                                    <Error style={{ textAlign: 'center' }}>{errors.customerId}</Error>
                                )}
                            </Col>
                        </Row>
                    ) : (
                        <>
                            <Row>
                                <Col xs={24} sm={12} md={6} xxl={3}>
                                    <MyInputField name="firstname" label={t('firstname')} />
                                </Col>
                                <Col xs={24} sm={12} md={6} xxl={3}>
                                    <MyInputField name="lastname" label={t('lastname')} />
                                </Col>
                                <Col xs={24} sm={12} md={6} xxl={3}>
                                    <MyInputField name="companyName" label={t('companyName')} />
                                </Col>
                                <Col xs={24} sm={12} md={6} xxl={3}>
                                    <MyInputField name="vatNumber" label={t('vatNumber')} />
                                </Col>
                                <Col xs={24} sm={12} md={6} xxl={3}>
                                    <MyInputField name="street" label={t('street')} />
                                </Col>
                                <Col xs={24} sm={12} md={6} xxl={3}>
                                    <MyInputField name="postcode" label={t('postcode')} />
                                </Col>
                                <Col xs={24} sm={12} md={6} xxl={3}>
                                    <MyInputField name="adress" label={t('adress')} />
                                </Col>
                                <Col xs={24} sm={12} md={6} xxl={3}>
                                    <MyInputField name="phone" label={t('phone')} />
                                </Col>
                                <Col xs={24} sm={12} md={6} xxl={3}>
                                    <MyInputField name="mail" label={t('mail')} />
                                </Col>
                                <Col xs={24} sm={12} md={6} xxl={3}>
                                    <MyTextArea name="comment" label={t('comment')} />
                                </Col>
                                <Col xs={24} sm={12} md={6} xxl={3}>
                                    <MyNumberInput
                                        label={t('discount')}
                                        name="discount"
                                        min={0}
                                        max={100}
                                        onChange={value => setFieldValue('discount', value)}
                                        formatter={value => `${value}%`}
                                        parser={value => value!.replace('%', '')}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={24}>
                                    <MyCheckbox name="mailSendAgreement" label={t('mailSendAgreement')} />
                                </Col>
                                <Col xs={24}>
                                    <MyCheckbox name="smsSendAgreement" label={t('smsSendAgreement')} />
                                </Col>
                                <Col xs={24}>
                                    <MyCheckbox name="marketingSendAgreement" label={t('marketingSendAgreement')} />
                                </Col>
                            </Row>
                        </>
                    )}
                    {!submitForm && (
                        <ButtonWrapper>
                            <ClassicButton htmlType="submit" text={t('save')} width="100%" />
                        </ButtonWrapper>
                    )}
                </form>
            )}
        </Formik>
    );
};

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    max-width: 400px;
    margin: 0 auto;
    padding-top: 10px;
`;
export default AddCustomerForm;
