import React, { FC, Fragment, useState } from 'react';
import { Formik } from 'formik';
import { Row, Col, Tooltip, Button, Select, Alert } from 'antd';
import MyInputField from '@/components/Fields/MyInputField';
import ClassicButton from '@/components/Buttons/ClassicButton';
import { styled } from '@/utils';
import { useTranslation } from 'react-i18next';
import MyTextArea from '@/components/Fields/MyTextArea';
import { PlusOutlined } from '@ant-design/icons';
import MyNumberInput from '@/components/Fields/MyNumberInput';
import { Estimate } from './types';
import { useLazyQuery } from '@apollo/react-hooks';
import { FAST_RAPORT_QUERY } from '@/graphql/raports/querys/fastRaport';
import { FastRaportQuery, FastRaportQueryVariables } from '@/generated/graphql';
import { SMALL_BUTTON_WIDTH } from '@/constants';
import GeneralError from '@/components/Errors/GeneralError';

const { Option } = Select;

interface OwnProps {}

type Props = OwnProps;

const estimateObjectShape: Estimate = {
    item: '',
    cost: 0,
    amount: 1,
    totalCost: 0,
};

const mileageSelectAfter = (
    <Select defaultValue="km" className="select-after">
        <Option value="km">km</Option>
        <Option value="mileage">mil.</Option>
    </Select>
);

const FastRaportForm: FC<Props> = () => {
    const [generateLinkLoading, setGenerateLinkLoading] = useState(false);
    const [generateFastRaport, { loading, data, error }] = useLazyQuery<FastRaportQuery, FastRaportQueryVariables>(
        FAST_RAPORT_QUERY,
    );

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
                currency: 'zł',
                estimate: [] as Estimate[],
            }}
            validateOnBlur={true}
            onSubmit={values => {
                setGenerateLinkLoading(true);
                generateFastRaport({ variables: values });
                setTimeout(() => {
                    setGenerateLinkLoading(false);
                }, 2000);
            }}
        >
            {({ handleSubmit, setFieldValue, values, resetForm }) => (
                <form onSubmit={handleSubmit}>
                    {error && <GeneralError message={t('errors:generalError')} />}
                    {data && !generateLinkLoading && (
                        <Alert
                            showIcon
                            message={
                                <div>
                                    {t('raportGenerated')}{' '}
                                    <a href={data.fastRaport} target="_blank">
                                        {t('raportLink')}
                                    </a>
                                </div>
                            }
                            type="success"
                        />
                    )}
                    <Row>
                        <Col xs={24} sm={12} md={6}>
                            <MyInputField name="brand" label={t('brand')} />
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <MyInputField name="model" label={t('model')} />
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <MyInputField name="vinNumber" label={t('vinNumber')} />
                        </Col>
                        <Col xs={24} sm={12} md={3}>
                            <MyInputField name="productionYear" label={t('productionYear')} />
                        </Col>
                        <Col xs={24} sm={12} md={3}>
                            <MyInputField name="color" label={t('color')} />
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <MyInputField name="mileage" label={t('mileage')} addonAfter={mileageSelectAfter} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} sm={12} md={8}>
                            <MyTextArea
                                name="description"
                                label={t('description')}
                                autoSize={{ minRows: 3, maxRows: 6 }}
                            />
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <MyTextArea name="diagnosis" label={t('diagnosis')} autoSize={{ minRows: 3, maxRows: 6 }} />
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <MyTextArea name="comment" label={t('comment')} autoSize={{ minRows: 3, maxRows: 6 }} />
                        </Col>
                    </Row>
                    <EstimateContent>
                        <>
                            <EstimateTile>
                                <div>{t('estimate')}</div>
                                <Tooltip title={t('addNextRaport')}>
                                    <Button
                                        size="small"
                                        type="primary"
                                        shape="circle"
                                        icon={<PlusOutlined />}
                                        onClick={() =>
                                            setFieldValue('estimate', [...values.estimate, estimateObjectShape])
                                        }
                                    />
                                </Tooltip>
                            </EstimateTile>
                            <Row>
                                {values.estimate.map((_, index) => (
                                    <Fragment key={index}>
                                        <Col xs={24} sm={12} md={15}>
                                            <MyInputField
                                                name={`estimate[${index}].item`}
                                                label={t('product / service')}
                                                crossIconOnClick={() => {
                                                    values.estimate.splice(index, 1);
                                                    setFieldValue(`estimate`, values.estimate);
                                                }}
                                            />
                                        </Col>
                                        <Col xs={10} sm={5} md={3}>
                                            <MyNumberInput
                                                name={`estimate[${index}].cost`}
                                                label={t('cost')}
                                                type="number"
                                                onChange={value => {
                                                    setFieldValue(`estimate[${index}].cost`, value!);
                                                    setFieldValue(
                                                        `estimate[${index}].totalCost`,
                                                        +values.estimate[index].amount * value!,
                                                    );
                                                }}
                                            />
                                        </Col>
                                        <Col xs={6} sm={3} md={2}>
                                            <MyNumberInput
                                                name={`estimate[${index}].amount`}
                                                label={t('amount')}
                                                type="number"
                                                onChange={value => {
                                                    setFieldValue(`estimate[${index}].amount`, value!);
                                                    setFieldValue(
                                                        `estimate[${index}].totalCost`,
                                                        +values.estimate[index].cost * value!,
                                                    );
                                                }}
                                            />
                                        </Col>
                                        <Col xs={8} sm={4} md={4}>
                                            <MyInputField
                                                name={`estimate[${index}].totalCost`}
                                                label={t('totalCost')}
                                                disabled={true}
                                                value={values.estimate[index].cost * values.estimate[index].amount}
                                            />
                                        </Col>
                                    </Fragment>
                                ))}
                            </Row>
                        </>
                    </EstimateContent>
                    <ButtonWrapper>
                        <ClassicButton
                            text={t('clear')}
                            width={SMALL_BUTTON_WIDTH}
                            type="danger"
                            onClick={() => resetForm()}
                        />
                        <ClassicButton
                            htmlType="submit"
                            text={t('save')}
                            width={SMALL_BUTTON_WIDTH}
                            loading={loading || generateLinkLoading}
                        />
                    </ButtonWrapper>
                </form>
            )}
        </Formik>
    );
};

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;

    button {
        margin: 0 5px;
    }
`;
const EstimateContent = styled.div``;

const EstimateTile = styled.div`
    display: flex;
    align-items: center;
    div {
        font-size: ${({ theme }) => theme.fontSize.info};
    }

    button {
        margin-left: 8px;
    }
`;
export default FastRaportForm;
