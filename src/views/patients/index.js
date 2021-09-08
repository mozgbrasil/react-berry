// #
// #
// #
// #
// https://material-ui.com/pt/components/dialogs/
// import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SaveIcon from '@material-ui/icons/Save';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

export function AlertDialog(props) {
    const { kind, ...other } = props;
    const className = kind === 'primary' ? 'PrimaryButton' : 'SecondaryButton';

    const [open, setOpen] = React.useState(false);
    const [key, setKey] = React.useState(false);

    useEffect(() => {
        setKey(props.record.key);
    }, []);

    const handleClickOpen = (event) => {
        setOpen(true);
        console.log('handleClickOpen: ', event);
    };

    const handleClose = (event) => {
        setOpen(false);
        console.log('handleClose: ', key);
    };

    const handleOk = async (event) => {
        setOpen(false);
        console.log('handleOk: ', key);
        await deleteUser(key);
        handleClose();
        // toast.warning('User deleted successfully!');
    };

    const deleteUser = async (key) => {
        console.log('deleteUser: ', key);
        let url = process.env.REACT_APP_API_URL + '/users/' + key;
        const results = await fetch(url, { method: 'DELETE' })
            .then((res) => {
                var results = res;
                console.log('results: ', results);
                return results;
            })
            .then((res) => {
                var results = res.results;
                console.log('results: ', results);
                return results;
            })
            .catch((e) => {
                console.log('err: ', e.message);
            });

        //  setData(results);
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={() => handleClickOpen(props.record.key)} className={className} {...other}>
                {props.children}
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{'Tem certeza de que quer excluir este registro ?'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">Essa ação não é reversivel</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Não
                    </Button>
                    <Button onClick={handleOk} color="primary" autoFocus>
                        Sim
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
// #
// #
// #
// #

// https://material-ui.com/pt/components/snackbars/
// import React from 'react';
// import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export function SimpleSnackbar(props) {
    const { ...other } = props;

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div>
            <Button onClick={handleClick}>Open simple snackbar {props.children}</Button>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Note archived"
                action={
                    <React.Fragment>
                        <Button color="secondary" size="small" onClick={handleClose}>
                            UNDO
                        </Button>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </div>
    );
}

// #
// #
// #
// #

import React, { useRef, useState, useEffect } from 'react';

// material-ui
import { Typography } from '@material-ui/core';

// project imports
import MainCard from '../../ui-component/cards/MainCard';

//
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Table, Space, Tag, Input, Switch } from 'antd';
import { SettingFilled as IconSettingFilled } from '@ant-design/icons';

import SchemaForm from 'antd-schema-form'; // getValueFromObject // The value of the form obtained from the form, formatted into an object // getObjectFromValue, // Object formatted into the value required by the form // getKeysFromObject, // Get all the keys under schema.json
import 'antd-schema-form/style/antd-schema-form.css'; //

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        // fixed: 'left',
        render: (text, record) => {
            if (typeof text != 'string') {
                const arr = Object.values(record.name);
                return (
                    <span>
                        {arr.map((tag) => {
                            let color = tag.length > 5 ? 'geekblue' : 'green';
                            if (tag === 'loser') {
                                color = 'volcano';
                            }
                            return (
                                <Tag color={color} key={tag}>
                                    {tag.toUpperCase()}
                                </Tag>
                            );
                        })}
                    </span>
                );
            }
        }
    },
    {
        title: 'Picture',
        dataIndex: 'picture',
        key: 'picture',
        render: (text, record) => (
            <span>
                <img src={record.picture.thumbnail} />
                {/* <Tag color={color} key={record.key}>
                    {text.toUpperCase()}
                </Tag> */}
            </span>
        )
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
        render: (text, record) => <Tag size="middle">{record.gender}</Tag>
    },
    // {
    //     title: 'e-mail',
    //     dataIndex: 'email',
    //     key: 'email',
    //     render: (text, record) => <Tag size="middle">{record.email}</Tag>
    // },
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
    // {
    //     title: 'Location',
    //     dataIndex: 'location',
    //     key: 'location',
    //     render: (text, record) => (
    //         <span>
    //             <Space size="middle">???</Space>
    //             {/* <Tag color={color} key={record.key}>
    //                 {text.toUpperCase()}
    //             </Tag> */}
    //         </span>
    //     )
    // },
    {
        title: 'Login',
        dataIndex: 'login',
        key: 'login',
        render: (text, record) => {
            if (typeof text != 'string') {
                const arr = Object.values(record.login);
                return (
                    <span>
                        {(() => {
                            // console.log('IIFE - render');
                            let color = 'green';
                            return (
                                <Tag color={color} key="1">
                                    {record.login.username}
                                </Tag>
                            );
                        })()}
                    </span>
                );
            }
        }
    },
    {
        title: 'Dob',
        dataIndex: 'dob',
        key: 'dob',
        render: (text, record) => {
            if (typeof text != 'string') {
                const arr = Object.values(record.dob);
                return (
                    <span>
                        {arr.map((tag) => {
                            let color = tag.length > 5 ? 'geekblue' : 'green';
                            if (tag === 'loser') {
                                color = 'volcano';
                            }
                            return (
                                <Tag color={color} key={tag}>
                                    {tag}
                                </Tag>
                            );
                        })}
                    </span>
                );
            }
        }
    },
    {
        title: 'Registered',
        dataIndex: 'registered',
        key: 'registered',
        render: (text, record) => {
            if (typeof text != 'string') {
                const arr = Object.values(record.registered);
                return (
                    <span>
                        {arr.map((tag) => {
                            let color = tag.length > 5 ? 'geekblue' : 'green';
                            if (tag === 'loser') {
                                color = 'volcano';
                            }
                            return (
                                <Tag color={color} key={tag}>
                                    {tag}
                                </Tag>
                            );
                        })}
                    </span>
                );
            }
        }
    },
    {
        title: 'Action',
        key: 'action',
        fixed: 'right',
        render: (text, record) => (
            <Space size="middle">
                <Button
                    variant="contained"
                    color={'primary'}
                    disableElevation
                    style={{ width: 'auto', padding: '1vh', marginLeft: '3vh', color: '#7ffff9', background: '#21086d' }}
                    endIcon={<SaveIcon />}
                    onClick={() => handleEdit(record.key)}
                >
                    Editar
                </Button>
                <AlertDialog kind="primary" record={record}>
                    Delete
                </AlertDialog>
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

//

const handleEdit = async (id) => {
    console.log('handleEdit: ', id);
    window.location.href = '#' + id;
    window.location.reload(true);
};

//==============================|| App PAGE ||==============================//

//

const App = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const [fixedTop, setFixedTop] = React.useState(false);

    console.log('window.location.hash: ', window.location.hash);

    useEffect(() => {
        const getPacients = async () => {
            //
            // setIsLoading(false);
            //
            try {
                setIsLoading(true);
                let url = process.env.REACT_APP_API_URL + '/users?page=1&pageSize=50';
                // const response = await fetch(url);
                // const res = await response.json();
                // const results = res.results;
                const results = await fetch(url)
                    .then(async (res) => {
                        var results = await res.json();
                        console.log('results: ', results);
                        return results;
                    })
                    .then((res) => {
                        var results = res.results;

                        // Fix: Warning: Each child in a list should have a unique "key" prop.
                        var results = results.map((obj) => {
                            obj.key = obj._id; // on object create new key name. Assign old value to this
                            delete obj._id; //delete object with old key name
                            return obj;
                        });

                        // Fix: obj to arr
                        var results = results.map((obj) => {
                            // console.log(obj);
                            return obj;
                        });

                        // console.log(results);

                        return results;
                    })
                    .catch((e) => {
                        setIsError(e.message);
                    });

                setData(results);
            } catch (e) {
                setIsLoading(false);
                setIsError(e.message);
            } finally {
                setIsLoading(false);
            }
        };
        getPacients();
    }, []);

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
        console.log('handleCancelClick');
    }

    if (isLoading) {
        return <>isLoading: {isLoading}</>;
    }

    if (isError) {
        return <>isError: {isError}</>;
    }

    return (
        <>
            <MainCard title="Escopo">
                <Typography variant="body2">
                    <a href="https://github.com/mozgbrasil/node-labs/blob/develop/README_findup.md#findup">
                        https://github.com/mozgbrasil/node-labs/blob/develop/README_findup.md#findup
                    </a>
                </Typography>
                <SimpleSnackbar />
            </MainCard>
            <MainCard title="Grade de Dados">
                {data && (
                    <div className="books">
                        <Table
                            columns={columns}
                            dataSource={data}
                            pagination={{
                                pageSize: 50,
                                defaultPageSize: 50,
                                showSizeChanger: false,
                                pageSizeOptions: ['10', '20', '30'],
                                position: ['topRight', 'bottomRight']
                            }}
                            scroll={{ y: 240 }}
                        />
                        {/* loop over the books */}
                        {/* {pacients.map((item, index) => (
                            <div key={index}>
                                <h2>{item.name}</h2>
                            </div>
                        ))} */}
                    </div>
                )}
            </MainCard>
            {/* <MainCard title="DataGrid">
                {data && (
                    <div className="books">
                        <Table
                            columns={columns}
                            dataSource={data}
                            scroll={{ x: 1500 }}
                            summary={(pageData) => (
                                <Table.Summary fixed={fixedTop ? 'top' : 'bottom'}>
                                    <Table.Summary.Row>
                                        <Table.Summary.Cell index={0} colSpan={2}>
                                            <Switch
                                                checkedChildren="Fixed Top"
                                                unCheckedChildren="Fixed Top"
                                                checked={fixedTop}
                                                onChange={() => {
                                                    setFixedTop(!fixedTop);
                                                }}
                                            />
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={2} colSpan={8}>
                                            Scroll Context
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={10}>Fix Right</Table.Summary.Cell>
                                    </Table.Summary.Row>
                                </Table.Summary>
                            )}
                            sticky
                        />
                    </div>
                )}
            </MainCard> */}
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
