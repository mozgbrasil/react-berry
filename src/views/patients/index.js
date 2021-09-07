import { useRef, useState, useEffect } from 'react';

// material-ui
import { Typography } from '@material-ui/core';

// project imports
import MainCard from '../../ui-component/cards/MainCard';

//
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Table, Space, Input } from 'antd'; // , Tag
import { SettingFilled as IconSettingFilled } from '@ant-design/icons';

import SchemaForm from 'antd-schema-form'; // getValueFromObject // The value of the form obtained from the form, formatted into an object // getObjectFromValue, // Object formatted into the value required by the form // getKeysFromObject, // Get all the keys under schema.json
import 'antd-schema-form/style/antd-schema-form.css'; //

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => (
            <span>
                {/* {record.map((tag) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })} */}
            </span>
        )
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
        render: (text, record) => (
            <a href="https://ant.design/components/table/">
                {text} {record.gender}
            </a>
        )
    },
    {
        title: 'e-mail',
        dataIndex: 'email',
        key: 'email',
        render: (text, record) => <Space size="middle">{record.email}</Space>
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone'
    },
    {
        title: 'cell',
        dataIndex: 'cell',
        key: 'cell'
    },
    {
        title: 'nat',
        dataIndex: 'nat',
        key: 'nat'
    },
    {
        title: 'Tags',
        dataIndex: 'tags',
        key: 'tags',
        render: (tags) => (
            <span>
                {/* {tags.map((tag) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })} */}
            </span>
        )
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <a href="https://ant.design/components/table/">Editar</a>
                <a href="https://ant.design/components/table/">Excluir</a>
            </Space>
        )
    }
];

const data = [
    {
        key: '1',
        name: 'John Brown',
        email: 'email',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer']
    },
    {
        key: '2',
        name: 'Jim Green',
        email: 'email',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser']
    },
    {
        key: '3',
        name: 'Joe Black',
        email: 'email',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher']
    }
]; // Introducing style

// form json schema
const json = {
    id: '$root',
    type: 'object',
    title: 'Form',
    description: 'Form preview.',
    properties: {
        name: {
            id: '$root/name',
            type: 'object',
            title: 'Name',
            enum: ['alpha', 'dda'],
            properties: {
                title: {
                    id: '$root/name/properties/title',
                    type: 'string',
                    title: 'Title',
                    $tableRender: 'custom' // Custom table column render component key
                },
                first: {
                    id: '$root/items/properties/first',
                    type: 'string',
                    title: 'First',
                    $tableRender: 'custom' // Custom table column render component key
                },
                last: {
                    id: '$root/items/properties/last',
                    type: 'string',
                    title: 'Last',
                    $tableRender: 'custom' // Custom table column render component key
                }
            }
            // $options: [
            //     {
            //         label: 'alpha',
            //         value: '3'
            //     },
            //     {
            //         label: 'beta',
            //         value: '4'
            //     }
            // ]
        },
        nat: {
            id: '$root/properties/nat',
            type: 'string',
            title: 'Nat',
            description: '2',
            $required: false
        },
        cel: {
            id: '$root/properties/cel',
            type: 'string',
            title: 'Cel',
            description: 'Please type in your Cel.',
            $required: false
        },
        phone: {
            id: '$root/properties/phone',
            type: 'string',
            title: 'Phone',
            description: 'Please type in your Phone.',
            $required: false
        },
        email: {
            id: '$root/properties/email',
            type: 'string',
            title: 'e-mail',
            description: 'Please type in your e-mail.',
            $required: false
        },
        gender: {
            id: '$root/properties/gender',
            type: 'string',
            title: 'Gender',
            description: 'Please select gender.',
            $componentType: 'radio',
            $options: [
                {
                    label: 'Male',
                    value: 'Male'
                },
                {
                    label: 'Female',
                    value: 'Female'
                }
            ]
        },
        dob: {
            id: '$root/properties/dob',
            type: 'object',
            title: 'DOB',
            description: 'Please select DOB.',
            properties: {
                date: {
                    id: '$root/name/properties/date',
                    type: 'string',
                    title: 'Date',
                    $tableRender: 'custom' // Custom table column render component key
                },
                age: {
                    id: '$root/name/properties/age',
                    type: 'string',
                    title: 'Age',
                    $tableRender: 'custom' // Custom table column render component key
                }
            }
        }
        // schools: {
        //     id: '$root/properties/schools',
        //     type: 'array',
        //     title: 'Educational experience',
        //     description: 'Educational experience.',
        //     items: {
        //         id: '$root/properties/schools/items',
        //         type: 'string',
        //         title: 'Institution',
        //         description: 'Please fill in the school.',
        //         $required: true
        //     }
        // }
    }
};

const value = {
    $root: {
        string: {
            default: 'abcdefg',
            cel: '12345',
            phone: '12345'
        },
        number: {
            default: 12345,
            cel: 12345,
            phone: 12345
        },
        array: {
            default: [
                {
                    col1: '数据1',
                    col2: 1,
                    col3: true
                },
                {
                    col1: '数据2',
                    col2: 2,
                    col3: false
                },
                {
                    cel: '数据1',
                    phone: 1,
                    col3: true
                }
            ]
        }
    }
};

// 自定义组件
const customComponent = {
    custom(item, form, required) {
        return <Input placeholder="自定义组件" required={required} addonAfter={<IconSettingFilled />} />;
    }
};

// 自定义表格渲染
const customTableRender = {
    red(text, record, index, item, form) {
        return <span style={{ color: '#f00' }}>{text}</span>;
    },
    green(text, record, index, item, form) {
        return <span style={{ color: '#0f0' }}>{text}</span>;
    }
};

//==============================|| App PAGE ||==============================//

const App = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const getPacients = async () => {
            //
            // setIsLoading(false);
            //
            try {
                setIsLoading(true);
                let url = process.env.REACT_APP_API + '/users?page=1&pageSize=3';
                const response = await fetch(url);
                const results = await response.json();
                console.log('results: ', results);
                setData(results);
            } catch (e) {
                setIsLoading(false);
                setIsError(false);
            } finally {
                setIsLoading(false);
            }
        };
        getPacients();
    }, []);

    //

    const formRef = useRef();

    // 提交
    function handleOkSubmit(form, val, keys) {
        console.log(form);
        console.log(val);
        console.log(keys);
        console.log(formRef);
    }

    // cancel
    function handleCancelClick() {
        /* ===== */
    }

    if (isLoading) {
        return <>isLoading</>;
    }

    if (isError) {
        return <>isError</>;
    }

    return (
        <>
            <MainCard title="Escopo">
                <Typography variant="body2">
                    <a href="https://github.com/mozgbrasil/node-labs/blob/develop/README_findup.md#findup">
                        https://github.com/mozgbrasil/node-labs/blob/develop/README_findup.md#findup
                    </a>
                </Typography>
            </MainCard>
            <MainCard title="DataGrid">
                {/* display books from the API */}
                {data && (
                    <div className="books">
                        <Table columns={columns} dataSource={data} pagination={{ position: ['topRight', 'bottomRight'] }} />
                        {/* loop over the books */}
                        {/* {pacients.map((item, index) => (
                            <div key={index}>
                                <h2>{item.name}</h2>
                            </div>
                        ))} */}
                    </div>
                )}
            </MainCard>
            <MainCard title="Formulário">
                <SchemaForm
                    ref={formRef}
                    json={json}
                    value={value}
                    customComponent={customComponent}
                    customTableRender={customTableRender}
                    okText="Enviar"
                    onOk={handleOkSubmit}
                    onCancel={handleCancelClick}
                />
            </MainCard>
        </>
    );
};

export default App;
