// #
// #
// #
// #

const component_relations = false;

// #
// #
// #
// #

// We need to wrap component in `forwardRef` in order to gain
// access to the ref object that is assigned using the `ref` prop.
// This ref is passed as the second parameter to the function component.
/* In the functional component, a second argument is passed called ref, which will have access to the refs being forwarded from the parent */
const CompoentAbout = forwardRef((props, ref) => {
    const [state, setState] = useState(0);

    // The component instance will be extended
    // with whatever you return from the callback passed
    // as the second argument
    useImperativeHandle(ref, () => ({
        HelloChild,
        my_event_hello_parent
    }));

    const [data, setData] = useState([]);

    useEffect(() => {
        // getPacients();
    }, []);

    const HelloChild = (props) => {
        console.log('About->HelloChild', props);
    };

    const my_event_hello_parent = (props, ref) => {
        console.log('About->my_event_hello_parent', props);
        console.log('About->my_event_hello_parent', ref);
        props.my_event_hello_parent();
    };

    const useRef_button = useRef();

    return (
        <div ref={ref}>
            <span>{props.children}</span>
            {component_relations && (
                <button ref={useRef_button} onClick={() => my_event_hello_parent(props, ref)}>
                    trigger "Hello()" from Child 2 Parent
                </button>
            )}
            <Typography variant="body2">
                <a href="https://github.com/mozgbrasil/node-labs/blob/develop/views/tests/findup/scope/README_findup.md#findup">
                    https://github.com/mozgbrasil/node-labs/blob/develop/views/tests/findup/scope/README_findup.md#findup
                </a>
            </Typography>
        </div>
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
    // console.log('AlertDialog: ', props);
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

    const handleOk = async (props) => {
        setOpen(false);
        console.log('handleOk: ', props);
        console.log('handleOk key: ', key);
        await deleteUser(key);
        handleClose();
        props.my_event_antd_schema_table();
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
                var results = res;
                // console.log('deleteUser: ', results);
                return results;
            })
            .catch((e) => {
                console.log('err: ', e.message);
            });
        // console.log('deleteUser: ', results);
        //  setData(results);
    };

    return (
        <div>
            {/* {...other} */}
            {/* Warning: Invalid value for prop `my_event_antd_schema_table` on <button> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. */}
            <Button
                variant="outlined"
                color="primary"
                className={className}
                onClick={() => {
                    handleClickOpen(props);
                }}
            >
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
                    <Button onClick={() => handleOk(props)} color="primary" autoFocus>
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

// We need to wrap component in `forwardRef` in order to gain
// access to the ref object that is assigned using the `ref` prop.
// This ref is passed as the second parameter to the function component.
const CompoentAntdSchemaTable = forwardRef((props, ref) => {
    const [state, setState] = useState(0);

    // The component instance will be extended
    // with whatever you return from the callback passed
    // as the second argument
    useImperativeHandle(ref, () => ({
        getPacients,
        HelloChild,
        my_event_hello_parent,
        my_event_antd_schema_table,
        my_event_antd_schema_form
    }));

    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        getPacients();
    }, []);

    const HelloChild = (props) => {
        console.log('AntdSchemaTable->HelloChild', props);
    };

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
            var url = API_URL + '/users?page=1&pageSize=50';

            // var url = 'https://randomuser.me/api';

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

            // console.log('getPacients: ', results);

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
            title: 'ID',
            dataIndex: 'key',
            key: 'key'
        },
        {
            title: 'Picture',
            dataIndex: 'picture',
            key: 'picture',
            render: (text, record) => {
                if (record.picture.thumbnail) {
                    return (
                        <span>
                            <img src={record.picture.thumbnail} />
                            {/* <Tag color={color} key={record.key}>
                    {text.toUpperCase()}
                </Tag> */}
                        </span>
                    );
                }
            }
        },
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
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            render: (text, record) => <Tag size="middle">{record.gender}</Tag>
        },
        {
            title: 'e-mail',
            dataIndex: 'email',
            key: 'email',
            width: '20%',
            render: (text, record) => <Tag size="middle">{record.email}</Tag>
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
        // {
        //     title: 'Login',
        //     dataIndex: 'login',
        //     key: 'login',
        //     render: (text, record) => {
        //         if (typeof text != 'string') {
        //             const arr = Object.values(record.login);
        //             return (
        //                 <span>
        //                     {(() => {
        //                         // console.log('IIFE - render');
        //                         let color = 'green';
        //                         return (
        //                             <Tag color={color} key="1">
        //                                 {record.login.username}
        //                             </Tag>
        //                         );
        //                     })()}
        //                 </span>
        //             );
        //         }
        //     }
        // },
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
        // {
        //     title: 'Registered',
        //     dataIndex: 'registered',
        //     key: 'registered',
        //     render: (text, record) => {
        //         if (typeof text != 'string') {
        //             const arr = Object.values(record.registered);
        //             return (
        //                 <span>
        //                     {arr.map((tag) => {
        //                         let color = tag.length > 5 ? 'geekblue' : 'green';
        //                         if (tag === 'loser') {
        //                             color = 'volcano';
        //                         }
        //                         return (
        //                             <Tag color={color} key={tag}>
        //                                 {tag}
        //                             </Tag>
        //                         );
        //                     })}
        //                 </span>
        //             );
        //         }
        //     }
        // },
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
                        onClick={() => handleEdit(props, record.key)}
                    >
                        Editar
                    </Button>
                    {/* @TODO - FIX */}
                    {/* {...props} */}
                    {/* Warning: React does not recognize the `my_event_hello_parent` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `hello_parent` instead. If you accidentally passed it from a parent component, remove it from the DOM element. */}
                    <AlertDialog kind="primary" record={record} {...props}>
                        Delete
                    </AlertDialog>
                </Space>
            )
        }
    ];

    //

    const handleEdit = async (props, id) => {
        console.log('handleEdit: ', props);
        console.log('handleEdit id: ', id);
        window.location.href = '#' + id;
        props.my_event_antd_schema_form();
    };

    const handleTableChange = (pagination, filters, sorter) => {
        console.log('pagination: ', pagination);
        console.log('filters: ', filters);
        console.log('sorter: ', sorter);
        // props.my_event_antd_schema_table();
    };

    const my_event_hello_parent = (props, ref) => {
        console.log('AntdSchemaTable->my_event_hello_parent', props);
        console.log('AntdSchemaTable->my_event_hello_parent', ref);
        props.my_event_hello_parent();
    };

    const my_event_antd_schema_table = (props, ref) => {
        console.log('AntdSchemaTable->my_event_antd_schema_table', props);
        console.log('AntdSchemaTable->my_event_antd_schema_table', ref);
        props.my_event_antd_schema_table();
    };

    const my_event_antd_schema_form = (props, ref) => {
        console.log('AntdSchemaTable->my_event_antd_schema_form', props);
        console.log('AntdSchemaTable->my_event_antd_schema_form', ref);
        props.my_event_antd_schema_form();
    };

    const useRef_button = useRef();

    return (
        <>
            <span>{props.children}</span>
            {component_relations && (
                <button ref={useRef_button} onClick={() => my_event_hello_parent(props, ref)}>
                    trigger "Hello()" from Child 2 Parent
                </button>
            )}
            {/* loop over the books */}
            {/* {pacients.map((item, index) => (
                            <div key={index}>
                                <h2>{item.name}</h2>
                            </div>
                        ))} */}
            <div className="books">
                <Table
                    bordered="true"
                    columns={columns}
                    dataSource={data}
                    loading={isLoading}
                    pagination={pagination}
                    rowKey={(record) => {
                        // console.log('record: ', record.key);
                        return record.key;
                    }}
                    scroll={{ y: 240 }}
                    pagination={{
                        pageSize: 50,
                        defaultPageSize: 50,
                        // showSizeChanger: true,
                        // pageSizeOptions: ['50', '100', '150'],
                        position: ['topRight', 'bottomRight']
                    }}
                    onChange={(pagination, filters, sorter, extra) => {
                        handleTableChange(pagination, filters, sorter, extra);
                    }}
                />
            </div>
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

// We need to wrap component in `forwardRef` in order to gain
// access to the ref object that is assigned using the `ref` prop.
// This ref is passed as the second parameter to the function component.
/* In the functional component, a second argument is passed called ref, which will have access to the refs being forwarded from the parent */
const CompoentAntdSchemaForm = forwardRef((props, ref) => {
    const [state, setState] = useState(0);

    // The component instance will be extended
    // with whatever you return from the callback passed
    // as the second argument
    useImperativeHandle(ref, () => ({
        HelloChild,
        my_event_hello_parent
    }));

    const [data, setData] = useState([]);
    const [nprops, setNprops] = useState([]);

    useEffect(() => {
        // getPacients();

        setNprops(props);
    }, []);

    const HelloChild = (props) => {
        console.log('AntdSchemaForm->HelloChild', props);
    };

    const my_event_hello_parent = (props, ref) => {
        console.log('AntdSchemaForm->my_event_hello_parent->nprops', nprops);
        console.log('AntdSchemaForm->my_event_hello_parent->props', props);
        console.log('AntdSchemaForm->my_event_hello_parent->ref', ref);
        props.my_event_hello_parent();
    };

    const useRef_button = useRef();
    const formRef = useRef();

    // form json schema
    const json = {
        id: '$root',
        type: 'object',
        title: 'Form',
        description: 'Form preview.',
        properties: {
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
            },
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
                        $tableRender: 'custom',
                        $required: true
                    },
                    last: {
                        id: '$root/properties/name/properties/last',
                        type: 'string',
                        title: 'Last',
                        $tableRender: 'custom',
                        $required: true
                    }
                }
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
                $required: true
                // $componentType: 'radio',
                // $options: [
                //     {
                //         label: 'Male',
                //         value: 'Male'
                //     },
                //     {
                //         label: 'Female',
                //         value: 'Female'
                //     }
                // ]
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
                        type: 'number',
                        title: 'Age',
                        $tableRender: 'custom',
                        $required: true
                    }
                }
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
            nat: {
                id: '$root/properties/nat',
                type: 'string',
                title: 'Nat',
                description: '2',
                $required: true
            },
            // registered: {
            //     id: '$root/properties/registered',
            //     type: 'object',
            //     title: 'Registered',
            //     description: '🎉️',
            //     properties: {
            //         date: {
            //             id: '$root/properties/registered/properties/date',
            //             type: 'string',
            //             title: 'Date',
            //             $tableRender: 'custom',
            //             $required: false
            //         },
            //         age: {
            //             id: '$root/properties/registered/properties/age',
            //             type: 'number',
            //             title: 'Age',
            //             $tableRender: 'custom',
            //             $required: false
            //         }
            //     }
            // },
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
                        $tableRender: 'custom',
                        $required: true
                    },
                    number: {
                        id: '$root/properties/location/properties/street/properties/number',
                        type: 'number',
                        title: 'Number',
                        $tableRender: 'custom',
                        $required: true
                    },
                    city: {
                        id: '$root/properties/location/properties/city',
                        type: 'string',
                        title: 'City',
                        $tableRender: 'custom',
                        $required: true
                    },
                    state: {
                        id: '$root/properties/location/properties/state',
                        type: 'string',
                        title: 'State',
                        $tableRender: 'custom',
                        $required: true
                    },
                    postcode: {
                        id: '$root/properties/location/properties/postcode',
                        type: 'string',
                        title: 'Postcode',
                        $tableRender: 'custom',
                        $required: true
                    }
                    // coordinates: {
                    //     id: '$root/properties/location/properties/coordinates'
                    // },
                    // latitude: {
                    //     id: '$root/properties/location/properties/coordinates/properties/latitude',
                    //     type: 'string',
                    //     title: 'Latitude',
                    //     $tableRender: 'custom',
                    //     $required: false
                    // },
                    // longitude: {
                    //     id: '$root/properties/location/properties/coordinates/properties/longitude',
                    //     type: 'string',
                    //     title: 'Longitude',
                    //     $tableRender: 'custom',
                    //     $required: false
                    // },
                    // timezone: {
                    //     id: '$root/properties/location/properties/timezone'
                    // },
                    // offset: {
                    //     id: '$root/properties/location/properties/timezone/properties/offset',
                    //     type: 'string',
                    //     title: 'Offset',
                    //     $tableRender: 'custom',
                    //     $required: false
                    // },
                    // description: {
                    //     id: '$root/properties/location/properties/timezone/properties/description',
                    //     type: 'string',
                    //     title: 'Description',
                    //     $tableRender: 'custom',
                    //     $required: false
                    // }
                }
            }
            // login: {
            //     id: '$root/properties/login',
            //     type: 'object',
            //     title: 'Login',
            //     description: '🛡️',
            //     properties: {
            //         uuid: {
            //             id: '$root/properties/login/properties/uuid',
            //             type: 'string',
            //             title: 'UUID',
            //             $tableRender: 'custom'
            //         },
            //         username: {
            //             id: '$root/properties/login/properties/username',
            //             type: 'string',
            //             title: 'Username',
            //             $tableRender: 'custom'
            //         },
            //         password: {
            //             id: '$root/properties/login/properties/password',
            //             type: 'string',
            //             title: 'Password',
            //             $tableRender: 'custom'
            //         },
            //         salt: {
            //             id: '$root/properties/login/properties/salt',
            //             type: 'string',
            //             title: 'Salt',
            //             $tableRender: 'custom'
            //         },
            //         md5: {
            //             id: '$root/properties/login/properties/md5',
            //             type: 'string',
            //             title: 'MD5',
            //             $tableRender: 'custom'
            //         },
            //         sha1: {
            //             id: '$root/properties/login/properties/sha1',
            //             type: 'string',
            //             title: 'Sha1',
            //             $tableRender: 'custom'
            //         },
            //         sha256: {
            //             id: '$root/properties/login/properties/sha256',
            //             type: 'string',
            //             title: 'Sha256',
            //             $tableRender: 'custom'
            //         }
            //     }
            // },
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
        console.log('AntdSchemaForm->handleOkSubmit->nprops', nprops);
        console.log('handleOkSubmit->form: ', form);
        console.log('handleOkSubmit->val: ', val);
        console.log('handleOkSubmit->keys: ', keys);
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
                // console.log('handleOkSubmit: ', results);
                return results;
            })
            .catch((e) => {
                console.log('err: ', e.message);
            });

        // console.log('handleOkSubmit: ', results);
        window.location.hash = '';
        nprops.my_event_antd_schema_table();

        handleCancelClick(form);
    };

    const handleCancelClick = (form, keys) => {
        console.log('handleCancelClick');
        console.log('handleCancelClick->form: ', form);
        console.log('handleCancelClick->keys: ', keys);
        window.location.hash = '';
        form.resetFields();
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
        <>
            <span>{props.children}</span>
            {component_relations && (
                <button ref={useRef_button} onClick={() => my_event_hello_parent(props, ref)}>
                    trigger "Hello()" from Child 2 Parent
                </button>
            )}
            <SchemaForm
                ref={formRef}
                json={json}
                value={value}
                customComponent={customComponent}
                customTableRender={customTableRender}
                okText="Enviar"
                onOk={handleOkSubmit}
                onCancel={handleCancelClick}
                formOptions={{ layout: 'horizontal' }}
            />
        </>
    );
});

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

const CompoentApp = (props) => {
    // console.log('process.env: ', process.env);

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (window.location.hash != '') {
            getPacient();
        }
    }, []);

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

    // In order to gain access to the child component instance,
    // you need to assign it to a `ref`, so we call `useRef()` to get one
    const useRef_About = useRef();
    const useRef_AntdSchemaTable = useRef();
    const useRef_AntdSchemaForm = useRef();

    const my_event_hello_parent = () => {
        console.log('App->my_event_hello_parent');
    };

    const my_event_hello_about = () => {
        console.log('App->my_event_hello_about', useRef_About);
        useRef_About.current.HelloChild();
    };

    const my_event_hello_antd_schema_table = () => {
        console.log('App->my_event_hello_antd_schema_table', useRef_AntdSchemaTable);
        useRef_AntdSchemaTable.current.HelloChild();
    };

    const my_event_hello_antd_schema_form = () => {
        console.log('App->my_event_hello_antd_schema_form', useRef_AntdSchemaForm);
        useRef_AntdSchemaForm.current.HelloChild();
    };

    const my_event_antd_schema_table = () => {
        console.log('App->useRef->my_event_antd_schema_table', useRef_AntdSchemaTable);
        useRef_AntdSchemaTable.current.getPacients();
    };

    const my_event_antd_schema_form = () => {
        console.log('App->useRef->my_event_antd_schema_form', useRef_AntdSchemaForm);
        // useRef_AntdSchemaForm.current.getPacient();
        getPacient();
    };

    return (
        <>
            <MainCard title="Escopo">
                {/* {component_relations && <button onClick={() => MyEventHelloAbout(props)}>trigger "Hello()" from Parent 2 Child</button>} */}
                <CompoentAbout ref={useRef_About} my_event_hello_parent={my_event_hello_parent}></CompoentAbout>
            </MainCard>
            <MainCard title="Grade de Dados">
                {/* <button onClick={() => my_event_antd_schema_table()}>Atualizar</button> */}
                {/* {component_relations && (
                    <button onClick={() => my_event_hello_antd_schema_table(props)}>trigger "Hello()" from Parent 2 Child</button>
                )} */}
                <CompoentAntdSchemaTable
                    ref={useRef_AntdSchemaTable}
                    my_event_hello_parent={my_event_hello_parent}
                    my_event_antd_schema_table={my_event_antd_schema_table}
                    my_event_antd_schema_form={my_event_antd_schema_form}
                ></CompoentAntdSchemaTable>
            </MainCard>
            <MainCard title="Formulário">
                {/* {component_relations && (
                    <button onClick={() => my_event_hello_antd_schema_form(props)}>trigger "Hello()" from Parent 2 Child</button>
                )} */}
                {data && (
                    <CompoentAntdSchemaForm
                        value={data}
                        ref={useRef_AntdSchemaForm}
                        my_event_hello_parent={my_event_hello_parent}
                        my_event_antd_schema_table={my_event_antd_schema_table}
                    ></CompoentAntdSchemaForm>
                )}
                {/* <SimpleSnackbar /> */}
            </MainCard>
        </>
    );
};

export default CompoentApp;
