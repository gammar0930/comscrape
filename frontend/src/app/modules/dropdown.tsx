import React from 'react';
import { Select } from 'antd';

interface SelectOptionProps {
    setValue: (value: string) => void
}

const SelectOptionComponent: React.FC<SelectOptionProps> = ({setValue}) => {

    const onChange = (value: string) => {
        console.log(`--------------------selected ${value}`);
        setValue(value)
    };

    const onSearch = (value: string) => {
        console.log('search:', value);
    };

    const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    return (
        <Select
            showSearch
            placeholder="Select your choice"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            className='mr-4 w-[100px] dark:bg-black dark:text-white h-[50px]'
            filterOption={filterOption}
            options={[
                {
                    value: 'video',
                    label: 'Video',
                },
                {
                    value: 'image',
                    label: 'Image',
                },
                {
                    value: 'audio',
                    label: 'Audio',
                },
                {
                    value: 'text',
                    label: 'Text',
                }
            ]}
        />
    )
};

export default SelectOptionComponent;
