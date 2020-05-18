import React, { FC, useState, useContext } from 'react';
import { styled } from '@/utils';
import MyInputField from '@/components/Fields/MyInputField';
import { Tooltip, notification } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { SerivceEstimate } from '@/pages/NewServicePage';
import { UserContext } from '@/context/UserContext';
import { maxListPositions } from '@/config/plansConfig';

interface OwnProps {
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
    estimate: SerivceEstimate[];
}

type Props = OwnProps;

const ServisEstimate: FC<Props> = ({ setFieldValue, estimate }) => {
    const { user } = useContext(UserContext);
    const { t } = useTranslation(['info', 'fields']);
    const [itemsAmount, setItemsAmount] = useState(1);

    const mapAllFields = () => {
        return estimate.map((_, index: number) => (
            <tr key={index}>
                <td>
                    <MyInputField name={`estimate[${index}].name`} placeholder={t('fields:product/service')} />{' '}
                </td>
                <td>
                    <MyInputField
                        name={`estimate[${index}].price`}
                        type="number"
                        onChange={event => handleChange(event, 'price', index)}
                        placeholder={t('fields:price')}
                    />{' '}
                </td>
                <td>
                    <MyInputField
                        name={`estimate[${index}].amount`}
                        type="number"
                        min={1}
                        onChange={event => handleChange(event, 'amount', index)}
                        placeholder={t('fields:amount')}
                    />{' '}
                </td>
                <td>
                    <MyInputField
                        name={`estimate[${index}].summary`}
                        type="number"
                        readOnly
                        placeholder={t('fields:summary')}
                    />{' '}
                </td>
                <td>
                    {itemsAmount > 1 && (
                        <RemoveIconWrapper>
                            <DeleteOutlined onClick={() => removeEstimate(index)} />
                        </RemoveIconWrapper>
                    )}
                </td>
            </tr>
        ));
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, inputName: string, index: number) => {
        const { value } = event.target;

        setFieldValue(`estimate[${index}].${inputName}`, value);

        const { amount, price } = estimate[index];
        let calculateValue: number;
        switch (inputName) {
            case 'price':
                calculateValue = +value * +amount;
                setFieldValue(`estimate[${index}].summary`, +value * calculateValue + '');
                break;
            case 'amount':
                calculateValue = +value * +price;
                setFieldValue(`estimate[${index}].summary`, +value * calculateValue + '');
                break;
            default:
                break;
        }
    };

    const addNewPosition = () => {
        const limit = maxListPositions(user!.plan);
        if (estimate.length > limit) {
            notification.error({
                message: t('errors:block'),
                description: t('errors:limits.positionsLimit', { limit: limit }),
            });
            return;
        }
        estimate.push({ name: '', price: '', amount: '', summary: '' });
        setItemsAmount(prevState => prevState + 1);
    };

    const removeEstimate = (index: number) => {
        estimate.splice(index, 1);
        setItemsAmount(prevState => prevState - 1);
    };

    const summaryRowCalculate = () => {
        const copySummaryCalculate = {
            price: 0,
            amount: 0,
            summary: 0,
        };
        estimate.map(({ price, amount, summary }) => {
            (copySummaryCalculate.amount = copySummaryCalculate.amount + +amount),
                (copySummaryCalculate.price = copySummaryCalculate.price + +price),
                (copySummaryCalculate.summary = copySummaryCalculate.summary + +summary);
        });

        return (
            <tr>
                <td>
                    <SummaryText>{t('fields:summary')}</SummaryText>
                </td>
                <td>
                    <MyInputField
                        name={`lastRowSummaryPrice`}
                        type="number"
                        value={copySummaryCalculate.price}
                        readOnly
                    />{' '}
                </td>
                <td>
                    <MyInputField
                        name={`lastRowSummaryAmount`}
                        type="number"
                        value={copySummaryCalculate.amount}
                        readOnly
                    />{' '}
                </td>
                <td>
                    <MyInputField
                        name={`lastRowSummarySummary`}
                        type="number"
                        value={copySummaryCalculate.summary}
                        readOnly
                    />{' '}
                </td>
                <td></td>
            </tr>
        );
    };

    return (
        <Wrapper>
            <table>
                <thead>
                    <tr>
                        <th style={{ width: '38%' }}>
                            <p>{t('fields:product/service')}</p>
                        </th>
                        <th style={{ width: '10%' }}>
                            <p>{t('fields:price')}</p>
                        </th>
                        <th style={{ width: '8%' }}>
                            <p>{t('fields:amount')}</p>
                        </th>
                        <th style={{ width: '10%' }}>
                            <p>{t('fields:summary')}</p>
                        </th>
                        <th style={{ width: '2%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {mapAllFields()}
                    <tr>
                        <td>
                            <AddIconWrapper>
                                <Tooltip title={t('info:addNextPosition')}>
                                    <PlusOutlined onClick={addNewPosition} />
                                </Tooltip>
                            </AddIconWrapper>
                        </td>
                    </tr>
                    {summaryRowCalculate()}
                </tbody>
            </table>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    overflow-x: auto;

    table {
        width: 768px;

        th {
            p {
                margin: 0 0 0 5px;
                display: inline-block;
            }
        }
    }
`;

const SummaryText = styled.div`
    font-weight: 700;
    text-align: right;
`;

const AddIconWrapper = styled.div`
    margin-left: 20px;

    svg {
        font-size: ${({ theme }) => theme.fontSize.icon};
        color: ${({ theme }) => theme.color.primaryDark};
        cursor: pointer;
        transition: 0.5s;

        :hover {
            transform: scale(1.1);
        }
    }
`;
const RemoveIconWrapper = styled.div`
    margin-left: 10px;

    svg {
        font-size: ${({ theme }) => theme.fontSize.icon};
        color: ${({ theme }) => theme.color.red};
        cursor: pointer;
        transition: 0.5s;
        font-weight: 700;

        :hover {
            transform: scale(1.1);
        }
    }
`;
export default ServisEstimate;
