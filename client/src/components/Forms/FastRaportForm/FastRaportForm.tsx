import React, { FC } from 'react';
import { Formik } from 'formik';
import { Row, Col } from 'antd';
import GeneralError from '@/components/Errors/GeneralError';
import MyInputField from '@/components/Fields/MyInputField';
import MyNumberInput from '@/components/Fields/MyNumberInput';
import MyCheckbox from '@/components/Fields/MyCheckbox';
import ClassicButton from '@/components/Buttons/ClassicButton';
import { styled } from '@/utils';
import { useTranslation } from 'react-i18next';
import MyTextArea from '@/components/Fields/MyTextArea';

interface OwnProps {}

type Props = OwnProps;

const FastRaportForm: FC<Props> = () => {
    const { t } = useTranslation(['fields']);
    return (
        <Formik
            initialValues={{
                brand: '',
                model: '',
                vinNumber: '',
                productionYear: '',
                mileage: '',
                color: '',
                description: '',
                diagnosis: '',
                comment: '',
                currency: '',
            }}
            // validationSchema={createUserSchema}
            validateOnBlur={true}
            onSubmit={async (values, { resetForm }) => {
                console.log(values);
            }}
        >
            {({ handleSubmit, setFieldValue }) => (
                <form onSubmit={handleSubmit}>
                    {/* {error && <GeneralError message={t('errors:generalError')} />} */}
                    <Row>
                        <Col xs={24} sm={12} md={6} xxl={3}>
                            <MyInputField name="brand" label={t('brand')} />
                        </Col>
                        <Col xs={24} sm={12} md={6} xxl={3}>
                            <MyInputField name="model" label={t('model')} />
                        </Col>
                        <Col xs={24} sm={12} md={6} xxl={3}>
                            <MyInputField name="vinNumber" label={t('vinNumber')} />
                        </Col>
                        <Col xs={24} sm={12} md={6} xxl={3}>
                            <MyInputField name="productionYear" label={t('productionYear')} />
                        </Col>
                        <Col xs={24} sm={12} md={6} xxl={3}>
                            <MyInputField name="mileage" label={t('mileage')} />
                        </Col>
                        <Col xs={24} sm={12} md={6} xxl={3}>
                            <MyInputField name="color" label={t('color')} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={12} md={6} xxl={3}>
                            <MyTextArea name="description" label={t('description')} />
                        </Col>
                        <Col xs={24} sm={12} md={6} xxl={3}>
                            <MyTextArea name="diagnosis" label={t('diagnosis')} />
                        </Col>
                        <Col xs={24} sm={12} md={6} xxl={3}>
                            <MyTextArea name="comment" label={t('comment')} />
                        </Col>
                    </Row>
                    <ButtonWrapper>
                        <ClassicButton htmlType="submit" text={t('save')} width="100%" />
                    </ButtonWrapper>
                </form>
            )}
        </Formik>
    );
};

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    padding: 10px 0;
    max-width: 500px;
    margin: 0 auto;
`;

export default FastRaportForm;
