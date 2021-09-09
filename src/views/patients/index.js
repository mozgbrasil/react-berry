// #
// #
// #
// #

// We need to wrap component in `forwardRef` in order to gain
// access to the ref object that is assigned using the `ref` prop.
// This ref is passed as the second parameter to the function component.
const About = forwardRef((props, ref) => {
    const [state, setState] = useState(0);

    // The component instance will be extended
    // with whatever you return from the callback passed
    // as the second argument
    useImperativeHandle(ref, () => ({
        Hello
    }));

    const [data, setData] = useState([]);

    useEffect(() => {}, []);

    const Hello = () => {
        console.log('About->Hello');
    };

    const trigger_Parent = () => {
        console.log('About->trigger_Parent');
        // childRef_AntdSchemaTable.current.getPacients();
    };

    return (
        <>
            <Typography variant="body2">
                <a href="https://github.com/mozgbrasil/node-labs/blob/develop/views/tests/findup/scope/README_findup.md#findup">
                    https://github.com/mozgbrasil/node-labs/blob/develop/views/tests/findup/scope/README_findup.md#findup
                </a>
            </Typography>
            <button onClick={() => trigger_Parent()}>trigger "Hello()" from Child 2 Parent</button>
            {/* <SimpleSnackbar /> */}
        </>
    );
});

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
        // window.location.reload(true); // @TODO: parent datagrid request load
        // toast.warning('User deleted successfully!');
    };

    const deleteUser = async (key) => {
        console.log('deleteUser: ', key);
        if (process.env.NODE_ENV == 'development') {
            var API_URL = process.env.REACT_APP_API_URL_LOCAL;
        } else {
            var API_URL = process.env.REACT_APP_API_URL_WEB;
        }
        let url = API_URL + '/users/' + key;
        const results = await fetch(url, { method: 'DELETE' })
            .then((res) => {
                var results = res;
                console.log('deleteUser: ', results);
                return results;
            })
            .then((res) => {
                var results = res.results;
                console.log('deleteUser: ', results);
                return results;
            })
            .catch((e) => {
                console.log('err: ', e.message);
            });

        console.log('deleteUser: ', results);

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

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Table, Space, Tag, Input, Switch } from 'antd';
import { SettingFilled as IconSettingFilled } from '@ant-design/icons';

// export function AntdSchemaTable(props) {
//   const { ...other } = props;

// We need to wrap component in `forwardRef` in order to gain
// access to the ref object that is assigned using the `ref` prop.
// This ref is passed as the second parameter to the function component.
const AntdSchemaTable = forwardRef((props, ref) => {
    const [state, setState] = useState(0);

    // The component instance will be extended
    // with whatever you return from the callback passed
    // as the second argument
    useImperativeHandle(ref, () => ({
        getPacients
    }));

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        getPacients();
    }, []);

    const getPacients = async () => {
        //
        // setIsLoading(false);
        //
        try {
            setIsLoading(true);
            if (process.env.NODE_ENV == 'development') {
                var API_URL = process.env.REACT_APP_API_URL_LOCAL;
            } else {
                var API_URL = process.env.REACT_APP_API_URL_WEB;
            }
            let url = API_URL + '/users?page=1&pageSize=50';
            // const response = await fetch(url);
            // const res = await response.json();
            // const results = res.results;
            const results = await fetch(url)
                .then(async (res) => {
                    var results = await res.json();
                    console.log('getPacients: ', results);
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

                    // console.log('getPacients: ', results);

                    return results;
                })
                .catch((e) => {
                    setIsError(e.message);
                });

            console.log('getPacients: ', results);

            setData(results);
        } catch (e) {
            setIsLoading(false);
            setIsError(e.message);
        } finally {
            setIsLoading(false);
        }
    };

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

    //

    const handleEdit = async (id) => {
        console.log('handleEdit: ', id);
        // @TODO - Dispatch Main
        window.location.href = '#' + id;
        window.location.reload(true);
    };

    return (
        <>
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
            {/* {data && (
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
            )} */}
        </>
    );
});

// #
// #
// #
// #

// https://www.npmjs.com/package/antd-schema-form

import SchemaForm from 'antd-schema-form'; // getValueFromObject // The value of the form obtained from the form, formatted into an object // getObjectFromValue, // Object formatted into the value required by the form // getKeysFromObject, // Get all the keys under schema.json
import 'antd-schema-form/style/antd-schema-form.css'; //

export function AntdSchemaForm(props) {
    const { ...other } = props;

    const formRef = useRef();

    // form json schema
    const json = {
        id: '$root',
        type: 'object',
        title: 'Form',
        description: 'Form preview.',
        properties: {
            name: {
                id: '$root/properties/name',
                type: 'object',
                title: 'Name',
                description: '👾️',
                properties: {
                    title: {
                        id: '$root/properties/name/properties/title',
                        type: 'string',
                        title: 'Title',
                        $tableRender: 'custom',
                        $required: true
                    },
                    first: {
                        id: '$root/properties/name/properties/first',
                        type: 'string',
                        title: 'First',
                        $tableRender: 'custom'
                    },
                    last: {
                        id: '$root/properties/name/properties/last',
                        type: 'string',
                        title: 'Last',
                        $tableRender: 'custom'
                    }
                }
            },
            nat: {
                id: '$root/properties/nat',
                type: 'string',
                title: 'Nat',
                description: '2',
                $required: true
            },
            phone: {
                id: '$root/properties/phone',
                type: 'string',
                title: 'Phone',
                description: 'Please type in your Phone.',
                $required: true
            },
            cell: {
                id: '$root/properties/cell',
                type: 'string',
                title: 'Cell',
                description: 'Please type in your Cell.',
                $required: true
            },
            email: {
                id: '$root/properties/email',
                type: 'string',
                title: 'e-mail',
                description: 'Please type in your e-mail.',
                $required: true
            },
            gender: {
                id: '$root/properties/gender',
                type: 'string',
                title: 'Gender',
                description: '🐵️',
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
                description: '🎉️',
                properties: {
                    date: {
                        id: '$root/properties/dob/properties/date',
                        type: 'string',
                        title: 'Date',
                        $tableRender: 'custom',
                        $required: true
                    },
                    age: {
                        id: '$root/properties/dob/properties/age',
                        type: 'string',
                        title: 'Age',
                        $tableRender: 'custom',
                        $required: true
                    }
                }
            },
            registered: {
                id: '$root/properties/registered',
                type: 'object',
                title: 'Registered',
                description: '🎉️',
                properties: {
                    date: {
                        id: '$root/properties/registered/properties/date',
                        type: 'string',
                        title: 'Date',
                        $tableRender: 'custom',
                        $required: true
                    },
                    age: {
                        id: '$root/properties/registered/properties/age',
                        type: 'string',
                        title: 'Age',
                        $tableRender: 'custom',
                        $required: true
                    }
                }
            },
            location: {
                id: '$root/properties/location',
                type: 'object',
                title: 'Location',
                description: '🏡️',
                properties: {
                    street: {
                        id: '$root/properties/location/properties/street'
                    },
                    name: {
                        id: '$root/properties/location/properties/street/properties/name',
                        type: 'string',
                        title: 'Name',
                        $tableRender: 'custom'
                    },
                    number: {
                        id: '$root/properties/location/properties/street/properties/number',
                        type: 'string',
                        title: 'Number',
                        $tableRender: 'custom'
                    },
                    city: {
                        id: '$root/properties/location/properties/city',
                        type: 'string',
                        title: 'City',
                        $tableRender: 'custom'
                    },
                    state: {
                        id: '$root/properties/location/properties/state',
                        type: 'string',
                        title: 'State',
                        $tableRender: 'custom'
                    },
                    country: {
                        id: '$root/properties/location/properties/country',
                        type: 'string',
                        title: 'Country',
                        $tableRender: 'custom'
                    },
                    postcode: {
                        id: '$root/properties/location/properties/postcode',
                        type: 'string',
                        title: 'Postcode',
                        $tableRender: 'custom'
                    },
                    coordinates: {
                        id: '$root/properties/location/properties/coordinates'
                    },
                    latitude: {
                        id: '$root/properties/location/properties/coordinates/properties/latitude',
                        type: 'string',
                        title: 'Latitude',
                        $tableRender: 'custom',
                        $required: true
                    },
                    longitude: {
                        id: '$root/properties/location/properties/coordinates/properties/longitude',
                        type: 'string',
                        title: 'Longitude',
                        $tableRender: 'custom',
                        $required: true
                    },
                    timezone: {
                        id: '$root/properties/location/properties/timezone'
                    },
                    offset: {
                        id: '$root/properties/location/properties/timezone/properties/offset',
                        type: 'string',
                        title: 'Offset',
                        $tableRender: 'custom',
                        $required: true
                    },
                    description: {
                        id: '$root/properties/location/properties/timezone/properties/description',
                        type: 'string',
                        title: 'Description',
                        $tableRender: 'custom',
                        $required: true
                    }
                }
            },
            login: {
                id: '$root/properties/login',
                type: 'object',
                title: 'Login',
                description: '🛡️',
                properties: {
                    uuid: {
                        id: '$root/properties/login/properties/uuid',
                        type: 'string',
                        title: 'UUID',
                        $tableRender: 'custom'
                    },
                    username: {
                        id: '$root/properties/login/properties/username',
                        type: 'string',
                        title: 'Username',
                        $tableRender: 'custom'
                    },
                    password: {
                        id: '$root/properties/login/properties/password',
                        type: 'string',
                        title: 'Password',
                        $tableRender: 'custom'
                    },
                    salt: {
                        id: '$root/properties/login/properties/salt',
                        type: 'string',
                        title: 'Salt',
                        $tableRender: 'custom'
                    },
                    md5: {
                        id: '$root/properties/login/properties/md5',
                        type: 'string',
                        title: 'MD5',
                        $tableRender: 'custom'
                    },
                    sha1: {
                        id: '$root/properties/login/properties/sha1',
                        type: 'string',
                        title: 'Sha1',
                        $tableRender: 'custom'
                    },
                    sha256: {
                        id: '$root/properties/login/properties/sha256',
                        type: 'string',
                        title: 'Sha256',
                        $tableRender: 'custom'
                    }
                }
            },
            picture: {
                id: '$root/properties/picture',
                type: 'object',
                title: 'Picture',
                description: '🛡️',
                properties: {
                    large: {
                        id: '$root/properties/picture/properties/large',
                        type: 'string',
                        title: 'Large',
                        $tableRender: 'custom'
                    },
                    medium: {
                        id: '$root/properties/picture/properties/medium',
                        type: 'string',
                        title: 'Medium',
                        $tableRender: 'custom'
                    },
                    thumbnail: {
                        id: '$root/properties/picture/properties/thumbnail',
                        type: 'string',
                        title: 'Thumbnail',
                        $tableRender: 'custom'
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
        $root: props.value
    };

    const handleOkSubmit = async (form, val, keys) => {
        console.log('handleOkSubmit');
        // console.log('form: ', form);
        // console.log('val: ', val);
        // console.log('keys: ', keys);
        var collection = val.$root;
        console.log('collection: ', collection);
        if (process.env.NODE_ENV == 'development') {
            var API_URL = process.env.REACT_APP_API_URL_LOCAL;
        } else {
            var API_URL = process.env.REACT_APP_API_URL_WEB;
        }
        var url = API_URL + '/users/';

        if (window.location.hash != '') {
            var method = 'PUT';
            var url = url + window.location.hash.substring(1);
        } else {
            var method = 'POST';
        }

        console.log(`url: ${url}`);

        const results = await fetch(url, {
            method: method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(collection)
        })
            .then((res) => {
                var results = res;
                console.log('handleOkSubmit: ', results);
                return results;
            })
            .then((res) => {
                var results = res;
                console.log('handleOkSubmit: ', results);
                return results;
            })
            .catch((e) => {
                console.log('err: ', e.message);
            });

        console.log('handleOkSubmit: ', results);
    };

    const handleCancelClick = () => {
        console.log('handleCancelClick');
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

    return (
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
    );
}

// #
// #
// #
// #

import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';

// material-ui
import { Typography } from '@material-ui/core';

// project imports
import MainCard from '../../ui-component/cards/MainCard';

//==============================|| App PAGE ||==============================//

const App = () => {
    // console.log('process.env: ', process.env);

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const getPacient = async () => {
            try {
                setIsLoading(true);
                if (process.env.NODE_ENV == 'development') {
                    var API_URL = process.env.REACT_APP_API_URL_LOCAL;
                } else {
                    var API_URL = process.env.REACT_APP_API_URL_WEB;
                }
                let url = API_URL + '/users/' + window.location.hash.substring(1);
                const results = await fetch(url)
                    .then(async (res) => {
                        var results = await res.json();
                        console.log('getPacient: ', results);
                        return results;
                    })
                    .then((res) => {
                        var results = res;
                        return results;
                    })
                    .catch((e) => {
                        setIsError(e.message);
                    });
                console.log('getPacient: ', results);
                setData(results);
            } catch (e) {
                setIsLoading(false);
                setIsError(e.message);
            } finally {
                setIsLoading(false);
            }
        };
        if (window.location.hash != '') {
            getPacient();
        }
    }, []);

    const Hello = () => {
        console.log('App->Hello');
    };

    // In order to gain access to the child component instance,
    // you need to assign it to a `ref`, so we call `useRef()` to get one
    const childRef_About = useRef();
    const childRef_AntdSchemaTable = useRef();

    const trigger_About = () => {
        console.log('App->trigger_About');
        childRef_About.current.Hello();
    };

    const trigger_AntdSchemaTable = () => {
        console.log('App->useRef->trigger_AntdSchemaTable');
        childRef_AntdSchemaTable.current.getPacients();
    };

    return (
        <>
            <MainCard title="Escopo">
                <About ref={childRef_About} />
                <button onClick={() => trigger_About()}>trigger "Hello()" from Parent 2 Child</button>
            </MainCard>
            <MainCard title="Grade de Dados">
                <AntdSchemaTable ref={childRef_AntdSchemaTable} />
                <button onClick={() => trigger_AntdSchemaTable()}>Atualizar</button>
            </MainCard>
            <MainCard title="Formulário">{data && <AntdSchemaForm value={data} />}</MainCard>
        </>
    );
};

export default App;
