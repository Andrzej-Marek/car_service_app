import React, { useState } from 'react';
import { Input, Space, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { FilterDropdownProps } from 'antd/lib/table/interface';
import { useTranslation } from 'react-i18next';

export const getColumnSearchPropsHook = (dataIndex: string, findInTranslate: false | string = false) => {
    const [search, setSearch] = useState({
        searchText: '',
        searchedColumn: '',
    });

    const { t } = useTranslation(['common', 'fields', findInTranslate + '']);
    let searchInput: Input | null;
    console.log(search);
    const getColumnSearchProps = {
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: FilterDropdownProps) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        searchInput = node;
                    }}
                    placeholder={t('common:search.searchIn') + t(`fields:${dataIndex}`)}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        {t('common:search.search')}
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        {t('common:reset')}
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value: string | number | boolean, record: any) => {
            if (findInTranslate) {
                return !!RegExp(value + '', 'gi').exec(t(`${findInTranslate}:${record[dataIndex]}`) || '');
            } else {
                return !!RegExp(value + '', 'gi').exec(record[dataIndex] || '');
            }
        },
        onFilterDropdownVisibleChange: (visible: boolean) => {
            if (visible) {
                setTimeout(() => (searchInput as any).select());
            }
        },
        render: (text: string) =>
            search.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[search.searchText]}
                    autoEscape
                    textToHighlight={text ? (findInTranslate ? t(`${findInTranslate}:${text}`) : text.toString()) : ''}
                />
            ) : (
                text
            ),
    };

    const handleSearch = (selectedKeys: React.Key[], confirm: () => void, dataIndex: string) => {
        confirm();
        setSearch({
            searchText: selectedKeys[0] + '',
            searchedColumn: dataIndex,
        });
    };

    const handleReset = (clearFilters: (() => void) | undefined) => {
        if (clearFilters) {
            clearFilters();
            setSearch(prevState => ({ ...prevState, searchText: '' }));
        }
    };

    return getColumnSearchProps;
};
