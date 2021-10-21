import React from 'react';
import { useSelector } from 'react-redux';
import { Table as TableMaterial, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Paper, styled, IconButton } from '@material-ui/core';
import { Delete as DeleteIcon, Edit as EditIcon, CheckCircle as CheckCircleIcon } from '@material-ui/icons';
import { cutStr, cleanTheDate } from './../../functions/importFunctions';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#444',
        color: theme.palette.common.white,
        padding: '10px 5px'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        padding: 5,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
        padding: 0
    },
    'td': {
        border: 0,
        position: 'relative',
        color: '#444'
    },
    'td button': {
        position: 'absolute', 
        marginLeft: '10px',
        top: '50%', 
        transform: 'translateY(-50%)'
    }
}));

const Table = ({ itemsKeys, allItems, deleteItem, setVisibleFormPost, setPutStatusId, setElemUpdate, putDateTimeItem, path }) => {
    allItems = allItems.length && allItems[0].hasOwnProperty('dateTimeStart') ?
        [...allItems.sort((prev, next) => {
            if(next.dateTimeStart > prev.dateTimeStart) {
                return -1;
            }
        })] : [...allItems];
    
    const { allCook } = useSelector(({ admin }) => ({
        allCook: admin.cook,
    }));
    console.log(path);
    return (
        <>{
            allItems.length ? 
                <TableContainer component={Paper}>
                    <TableMaterial sx={{ minWidth: 720 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                {
                                    itemsKeys && itemsKeys.map(key => 
                                        <StyledTableCell>{key}</StyledTableCell>
                                    )
                                }
                                {
                                    itemsKeys.includes('cookSessionId') || itemsKeys.includes('orderId') || itemsKeys.includes('customerId') ? 
                                        '' :
                                        <StyledTableCell sx={{width: '34px'}}></StyledTableCell>
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                allItems.map(item => 
                                    <StyledTableRow sx={{position: 'relative'}}>
                                        {itemsKeys.map((key, index) => 
                                            <>
                                                {Array.isArray(item[key]) ?
                                                    <StyledTableCell sx={{display: 'flex'}}>
                                                        {item[key].map((pizza, index) => {
                                                            return <div style={{marginRight: '15px'}}>
                                                                <div>{index + 1}. {pizza.name.value}</div>
                                                                <div>{pizza.type.value} тесто</div>
                                                                <div>{pizza.size.value} см.</div>
                                                                <div>{pizza.category.value}</div>
                                                                <div>{pizza.price} р.</div>
                                                            </div>
                                                        })}
                                                    </StyledTableCell> :
                                                typeof item[key] === 'object' ?
                                                    <StyledTableCell>
                                                        {
                                                            key === 'cook' || key === 'customer' ?
                                                                cutStr(String(item[key]['name']), 'name') :
                                                            key === 'dateTimeEnd' || key === 'dateTimeStart' ?
                                                                cutStr(String(item[key]), key) :
                                                            key === 'cookSession' ?
                                                                // cutStr(String(item[key]), key) :
                                                                // console.log(item[key] === null) :
                                                                item[key] === null ?
                                                                    cutStr(String(item[key]), key) :
                                                                    // cutStr(String(item[key]['cookId']), key) :
                                                                    allCook && cutStr(String(allCook && allCook[allCook.findIndex(cook => cook.cookId === item[key]['cookId'])]['name']), key) :
                                                                cutStr(String(item[key]['value']), key)
                                                        }
                                                        {key === 'post' || (key === 'cookSession' && item['cookSession'] === null && path === 'order') ? 
                                                            <IconButton
                                                                size="small"
                                                                edge="start"
                                                                aria-label="edit"
                                                                onClick={() => {
                                                                    setPutStatusId(
                                                                        key === 'post' ? 
                                                                            item.cookId : 
                                                                        key === 'cookSession' ? 
                                                                            item.orderId : ''
                                                                    );
                                                                    setVisibleFormPost(false);
                                                                    setElemUpdate(key);
                                                                }}
                                                            >
                                                                <EditIcon />
                                                            </IconButton> : ''
                                                        }
                                                    </StyledTableCell> :
                                                    <StyledTableCell>
                                                        {
                                                            key === 'dateTimeEnd' || key === 'dateTimeStart' ?
                                                                cleanTheDate(cutStr(String(item[key]), key)) :
                                                                cutStr(String(item[key]), key)
                                                        }
                                                    </StyledTableCell>
                                                }
                                            </>
                                        )}
                                        {
                                            itemsKeys.includes('cookSessionId') || itemsKeys.includes('orderId') || itemsKeys.includes('customerId') ? 
                                                '' :
                                                <IconButton
                                                    size="small"
                                                    edge="start"
                                                    aria-label="delete"
                                                    onClick={() => deleteItem(item[itemsKeys[0]])}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                        }
                                    </StyledTableRow>
                                )
                            }
                        </TableBody>
                    </TableMaterial>
                </TableContainer> :
                'Пустая таблица'
        }</>
    );
}

export default Table;