import React, { FC, useState } from 'react';
import { Formik, FormikHelpers, FormikValues } from 'formik';
import { Row, Col, Select } from 'antd';
import MyInputField from '@/components/Fields/MyInputField';
import MyTextArea from '@/components/Fields/MyTextArea';
import { useTranslation } from 'react-i18next';
import FormButtons from '@/components/Buttons/FormButtons';
import MySelect from '@/components/Fields/MySelect';
import { vehicleTypes, fuelTypes } from '@/constants/select';
import MyDatePicker from '@/components/Fields/MyDatePicker';
import { addNewVehicleSchema } from '@/validations';
import { AddVehicle } from './types';
import { Vehicle, UpdateVehicleInfoMutation, UpdateVehicleInfoMutationVariables } from '@/generated/graphql';
import { ModalActionType } from '@/types';
import { UPDATE_VEHICLE_INFO } from '@/graphql/vehicle/mutations';
import { useMutation } from '@apollo/react-hooks';
import SingleImageUploader from '@/components/Uploaders/SingleImageUploader';
import { UploadFile } from 'antd/lib/upload/interface';

interface OwnProps {
    formRef?: React.RefObject<FormikValues>;
    submitForm?: (values: AddVehicle, formikHelpers: FormikHelpers<AddVehicle>) => void;
    defaultValues?: Vehicle;
    setVehicleImage?: (vehicleImage: UploadFile) => void;
    type: ModalActionType;
    vehicleImage?: UploadFile;
    toggle: () => void;
}

type Props = OwnProps;

const { Option } = Select;

const mileageSelectAfter = (
    defaultValue: string,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void,
) => (
    <Select defaultValue={defaultValue} className="select-after" onChange={value => setFieldValue('lengthUnit', value)}>
        <Option value="kilometre">km</Option>
        <Option value="mile">mile</Option>
    </Select>
);

const { CREATE, UPDATE } = ModalActionType;
const AddVehicleForm: FC<Props> = ({
    formRef,
    submitForm,
    setVehicleImage,
    defaultValues,
    type = ModalActionType.CREATE,
    toggle,
    vehicleImage,
}) => {
    const [image, setImage] = useState<UploadFile | null>(null);
    const { t } = useTranslation(['common', 'fields']);

    const [updateVehicleInfo] = useMutation<UpdateVehicleInfoMutation, UpdateVehicleInfoMutationVariables>(
        UPDATE_VEHICLE_INFO,
    );

    const uploadImageHandler = (file: UploadFile) => {
        switch (type) {
            case CREATE:
                if (setVehicleImage) {
                    setVehicleImage(file);
                }
                break;
            case UPDATE:
                setImage(file);
                break;
            default:
                break;
        }
    };

    const submitFormHandler = async (values: Vehicle, helpers: FormikHelpers<Vehicle>) => {
        switch (type) {
            case CREATE:
                if (submitForm) {
                    submitForm(values as any, helpers as any);
                }
                break;
            case UPDATE:
                updateVehicleInfo({ variables: { image: image?.originFileObj, updateVehicle: values } });
                if (toggle) {
                    toggle();
                }
                break;
            default:
                break;
        }
    };

    return (
        <Formik
            innerRef={formRef as any}
            initialValues={
                defaultValues
                    ? defaultValues
                    : ({
                          vehicleType: '',
                          brand: '',
                          model: '',
                          vinNumber: '',
                          productionYear: '',
                          engineCapacity: '',
                          registrationNumber: '',
                          lengthUnit: 'kilometre',
                          enginePower: '',
                          color: '',
                          mileage: '',
                          fuelType: '',
                          insuranceDate: '',
                          nextService: '',
                          warranty: '',
                          comment: '',
                      } as Vehicle)
            }
            validationSchema={addNewVehicleSchema}
            validateOnBlur={true}
            onSubmit={submitFormHandler}
        >
            {({ handleSubmit, resetForm, setFieldValue, values }) => (
                <form onSubmit={handleSubmit}>
                    <Row>
                        <Col xs={24} sm={12} md={6} xxl={3}>
                            <MySelect
                                name="vehicleType"
                                label={t('fields:vehicleType')}
                                onChange={(value: string) => setFieldValue('vehicleType', value)}
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
                            <MyInputField
                                name="mileage"
                                label={t('fields:mileage')}
                                addonAfter={mileageSelectAfter(values.lengthUnit, setFieldValue)}
                            />
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
                            <SingleImageUploader
                                uploadImage={uploadImageHandler}
                                defaultValue={vehicleImage && vehicleImage}
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
