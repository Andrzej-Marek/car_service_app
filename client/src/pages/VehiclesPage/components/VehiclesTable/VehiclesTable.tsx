import React, { FC } from 'react';
import { Vehicle } from '@/generated/graphql';
import Table, { ColumnProps } from 'antd/lib/table';
import { useTranslation } from 'react-i18next';
import { getColumnSearchPropsHook } from '@/hooks/getColumnSearchPropsHook';
import Actions from './components/Actions';
import { vehicleTypes, fuelTypes } from '@/constants/select';
import OwnerCell from './components/OwnerCell';
import moment from 'moment';
import { FULL_DATE_FORMAT } from '@/constants/dateFormat';
import ExpiresDate from '@/components/TableElements/ExpiresDate';
import ImagePreview from '@/components/TableElements/ImagePreview';
import { DiffOutlined } from '@ant-design/icons';

interface OwnProps {
    vehicles: Vehicle[];
}

type Props = OwnProps;

const VehiclesTable: FC<Props> = ({ vehicles }) => {
    const { t } = useTranslation(['fields', 'vehicleTypes', 'fuelType']);

    const columns: ColumnProps<Vehicle>[] = [
        {
            render: () => <DiffOutlined onClick={() => console.log('Go to info page')} />,
        },
        {
            title: t('fields:vehicleType'),
            dataIndex: 'vehicleType',
            key: 'vehicleType',
            filters: vehicleTypes,
            onFilter: (value, record) => record.vehicleType.indexOf(value + '') === 0,
            render: (text: string) => t(`vehicleTypes:${text}`),
        },
        {
            title: t('fields:brand'),
            dataIndex: 'brand',
            key: 'brand',
            ...getColumnSearchPropsHook('brand'),
            width: '150px',
        },
        {
            title: t('fields:model'),
            dataIndex: 'model',
            key: 'model',
            ...getColumnSearchPropsHook('model'),
            width: '150px',
        },
        {
            title: t('fields:owner'),
            key: 'owner',
            render: (_: string, { customer }) => <OwnerCell customer={customer} />,
            width: '250px',
        },
        {
            title: t('fields:vinNumber'),
            dataIndex: 'vinNumber',
            key: 'vinNumber',
            ...getColumnSearchPropsHook('vinNumber'),
            align: 'center',
        },
        {
            title: t('fields:productionYear'),
            dataIndex: 'productionYear',
            key: 'productionYear',
            ...getColumnSearchPropsHook('productionYear'),
            align: 'center',
            width: 80,
        },
        {
            title: t('fields:mileage'),
            dataIndex: 'mileage',
            key: 'mileage',
            width: '150px',
            render: (value: string, record) => (
                <div>
                    {value} {value && t(`fields:${record.lengthUnit}`)}
                </div>
            ),
        },
        {
            title: t('fields:fuelType'),
            dataIndex: 'fuelType',
            key: 'fuelType',
            render: (value: string) => t(`fuelTypes:${value}`),
            filters: fuelTypes,
            onFilter: (value, record) => (record.fuelType ? record.fuelType.indexOf(value + '') === 0 : false),
            width: 100,
            align: 'center',
        },
        {
            title: t('fields:enginePower'),
            dataIndex: 'enginePower',
            key: 'enginePower',
            ...getColumnSearchPropsHook('enginePower'),
            align: 'center',
            width: 100,
        },
        {
            title: t('fields:registrationNumber'),
            dataIndex: 'registrationNumber',
            key: 'registrationNumber',
            ...getColumnSearchPropsHook('registrationNumber'),
            align: 'center',
            width: 120,
        },
        {
            title: t('fields:insuranceDate'),
            dataIndex: 'insuranceDate',
            key: 'insuranceDate',
            render: (value: string) => <ExpiresDate date={value} />,
            align: 'center',
        },
        {
            title: t('fields:nextService'),
            dataIndex: 'nextService',
            key: 'nextService',
            render: (value: string) => <ExpiresDate date={value} />,
            align: 'center',
        },
        {
            title: t('fields:warranty'),
            dataIndex: 'warranty',
            key: 'warranty',
            render: (value: string) => value && moment(value).format(FULL_DATE_FORMAT),
            align: 'center',
        },
        {
            title: t('fields:color'),
            dataIndex: 'color',
            key: 'color',
            ...getColumnSearchPropsHook('color'),
            align: 'center',
        },
        {
            title: t('fields:image'),
            dataIndex: 'imageUrl',
            key: 'imageUrl',
            render: url => url && <ImagePreview url={url} />,
            align: 'center',
        },
        {
            title: t('fields:createdAt'),
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (value: string) => moment(value).format(FULL_DATE_FORMAT),
            width: '120px',
        },
        {
            title: t('fields:actions'),
            key: 'actions',
            render: (_, record) => <Actions record={record} />,
        },
    ];
    return (
        <>
            <Table
                dataSource={vehicles}
                columns={columns}
                rowKey={record => record.id}
                size="small"
                bordered
                scroll={{ x: 2200 }}
                pagination={{ defaultPageSize: 20 }}
                expandable={{
                    expandedRowRender: record => <p style={{ margin: 0 }}>{record.comment}</p>,
                    rowExpandable: record => !!record.comment,
                }}
            />
        </>
    );
};

export default VehiclesTable;
