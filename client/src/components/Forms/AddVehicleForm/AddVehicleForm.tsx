import React, { FC } from 'react';
import { Formik, FormikHelpers, FormikValues } from 'formik';
import { Row, Col, Select } from 'antd';
import MyInputField from '@/components/Fields/MyInputField';
import MyTextArea from '@/components/Fields/MyTextArea';
import { useTranslation } from 'react-i18next';
import FormButtons from '@/components/Buttons/FormButtons';
import MySelect from '@/components/Fields/MySelect';
import { vehicleTypes, fuelTypes } from '@/constants/select';
import MyDatePicker from '@/components/Fields/MyDatePicker';
import { addNewCarSchema } from '@/validations';
import { AddVehicle } from './types';

interface OwnProps {
    formRef?: React.RefObject<FormikValues>;
    submitForm?: (values: AddVehicle, formikHelpers: FormikHelpers<AddVehicle>) => void;
    defaultValues?: AddVehicle;
}

type Props = OwnProps;

const { Option } = Select;
const mileageSelectAfter = (
    <Select defaultValue="km" className="select-after">
        <Option value="km">km</Option>
        <Option value="mileage">mil.</Option>
    </Select>
);

const AddVehicleForm: FC<Props> = ({ formRef, submitForm, defaultValues }) => {
    const { t } = useTranslation(['common', 'fields']);

    return (
        <Formik
            innerRef={formRef as any}
            initialValues={
                defaultValues
                    ? defaultValues
                    : {
                          vahicleType: '',
                          brand: '',
                          model: '',
                          vinNumber: '',
                          productionYear: '',
                          engineCapacity: '',
                          registrationNumber: '',
                          enginePower: '',
                          color: '',
                          mileage: '',
                          fuelType: '',
                          insuranceDate: '',
                          nextService: '',
                          warranty: '',
                          comment: '',
                      }
            }
            validationSchema={addNewCarSchema}
            validateOnBlur={true}
            onSubmit={async (values, helpers) => {
                console.log(values);
                if (submitForm) {
                    submitForm(values, helpers);
                }
            }}
        >
            {({ handleSubmit, resetForm, setFieldValue }) => (
                <form onSubmit={handleSubmit}>
                    <Row>
                        <Col xs={24} sm={12} md={6} xxl={3}>
                            <MySelect
                                name="vahicleType"
                                label={t('fields:vahicleType')}
                                onChange={(value: string) => setFieldValue('vahicleType', value)}
                                options={vehicleTypes}
                            />
                        </Col>
                        <Col xs={24} sm={12} md={6} xxl={3}>
                            <MyInputField name="brand" label={t('fields:brand')} />
                        </Col>
                        <Col xs={24} sm={12} md={6} xxl={3}>
                            <MyInputField name="model" label={t('fields:model')} />
                        </Col>
                        <Col xs={24} sm={12} md={6} xxl={3}>
                            <MyInputField name="vinNumber" label={t('fields:vinNumber')} />
                        </Col>
                        <Col xs={24} sm={12} md={6} xxl={3}>
                            <MyInputField name="productionYear" label={t('fields:productionYear')} />
                        </Col>
                        <Col xs={24} sm={12} md={6} xxl={3}>
                            <MyInputField name="engineCapacity" label={t('fields:engineCapacity')} addonAfter="cm3" />
                        </Col>
                        <Col xs={24} sm={12} md={6} xxl={3}>
                            <MyInputField name="enginePower" label={t('fields:enginePower')} addonAfter="KM" />
                        </Col>
                        <Col xs={24} sm={12} md={6} xxl={3}>
                            <MyInputField name="registrationNumber" label={t('fields:registrationNumber')} />
                        </Col>
                        <Col xs={24} sm={12} md={6} xxl={3}>
                            <MyInputField name="color" label={t('fields:color')} />
                        </Col>
                        <Col xs={24} sm={12} md={6} xxl={3}>
                            <MyInputField name="mileage" label={t('fields:mileage')} addonAfter={mileageSelectAfter} />
                        </Col>
                        <Col xs={24} sm={12} md={6} xxl={3}>
                            <MySelect
                                name="fuelType"
                                label={t('fields:fuelType')}
                                onChange={(value: string) => setFieldValue('fuelType', value)}
                                options={fuelTypes}
                            />
                        </Col>
                        <Col xs={24} sm={12} md={6} xxl={3}>
                            <MyDatePicker
                                name="insuranceDate"
                                label={t('fields:insuranceDate')}
                                onChange={date => setFieldValue('insuranceDate', date?.toISOString())}
                            />
                        </Col>
                        <Col xs={24} sm={12} md={6} xxl={3}>
                            <MyDatePicker
                                name="nextService"
                                label={t('fields:nextService')}
                                onChange={date => setFieldValue('nextService', date?.toISOString())}
                            />
                        </Col>
                        <Col xs={24} sm={12} md={6} xxl={3}>
                            <MyDatePicker
                                name="warranty"
                                label={t('fields:warranty')}
                                onChange={date => setFieldValue('warranty', date?.toISOString())}
                            />
                        </Col>
                        <Col xs={24} sm={12} md={6} xxl={3}>
                            <MyTextArea
                                name="comment"
                                label={t('fields:comment')}
                                autoSize={{ minRows: 3, maxRows: 6 }}
                            />
                        </Col>
                    </Row>
                    {!submitForm && <FormButtons resetForm={resetForm} />}
                </form>
            )}
        </Formik>
    );
};

export default AddVehicleForm;
