import React from 'react';
import { useSelector } from 'react-redux';
import { Table as TableMaterial, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Paper, styled, IconButton } from '@material-ui/core';
import { Delete as DeleteIcon, Edit as EditIcon, Block as BlockIcon, CheckCircleOutline as CheckCircleOutlineIcon, PauseCircleOutline as PauseCircleOutlineIcon, VisibilityOff as VisibilityOffIcon } from '@material-ui/icons';

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
    },
    // 'button': {
    //     position: 'absolute', 
    //     top: '50%', 
    //     transform: 'translateY(-50%)'
    // }
}));

const Table = ({ itemsKeys, allItems, deleteItem, setVisibleFormPost, setPutStatusId, setElemUpdate, putDateTimeItem, path, putItemStatus, hideItem }) => {
    allItems = allItems.length && allItems[0].hasOwnProperty('dateTimeStart') ?
        [...allItems.sort((prev, next) => {
            if(next.dateTimeStart > prev.dateTimeStart) {
                return -1;
            }
        })] : [...allItems];
    
    const { allCook, allPizzas } = useSelector(({ admin }) => ({
        allCook: admin.cook,
        allPizzas: admin.pizzas
    }));
    console.log(allPizzas);
    return (
        <>{
            allItems.length ? 
                <TableContainer component={Paper} sx={{overflow: 'hidden'}}>
                    <TableMaterial sx={{ minWidth: 720 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                {
                                    itemsKeys && itemsKeys.map(key => 
                                        <StyledTableCell>{key}</StyledTableCell>
                                    )
                                }
                                {
                                    itemsKeys.includes('cookSessionId') || itemsKeys.includes('customerId') ? 
                                        '' :
                                        <StyledTableCell sx={{width: '34px'}}></StyledTableCell>
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                allItems.map(item => 
                                    <StyledTableRow 
                                        sx={{
                                            position: 'relative',
                                            '&:nth-of-type(odd)': {
                                                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                                padding: 0
                                            },
                                            backgroundColor: item['cookStatus'] === 'Closed' ? 
                                                '#CCC !important' :
                                            item['status'] === 'Closed' ? 
                                                '#CCC !important' :
                                            item['status'] === 'Pending' ?
                                                '#49cc90 !important' :
                                                ''
                                        }}
                                    >
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
                                                            key === 'promo' ?
                                                                item[key] === null ?
                                                                    cutStr(String(item[key]), key) :
                                                                cutStr(String(item[key]['value']), key) :
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
                                                    <StyledTableCell sx={{
                                                        color: key === 'status' && item['status'] === 'InProgress' ? 
                                                            '#fca130 !important' :
                                                        key === 'status' && item['status'] === 'Paused' ?
                                                            '#f93e3e !important' :
                                                            ''
                                                    }}>
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
                                            itemsKeys.includes('cookSessionId') || itemsKeys.includes('customerId') ? 
                                                '' :
                                            path === 'order' && itemsKeys.includes('orderId') ?
                                                item['status'] === 'Paused' ?
                                                    <IconButton
                                                        size="small"
                                                        edge="start"
                                                        aria-label="closed"
                                                        onClick={() => putItemStatus(item[itemsKeys[0]], 'Closed')}
                                                        // onClick={() => deleteItem(item[itemsKeys[0]])}
                                                    >
                                                        <CheckCircleOutlineIcon />
                                                    </IconButton> :
                                                item['status'] === 'Closed' ?
                                                    <IconButton
                                                        size="small"
                                                        edge="start"
                                                        aria-label="paused"
                                                        onClick={() => putItemStatus(item[itemsKeys[0]], 'Paused')}
                                                    >
                                                        <PauseCircleOutlineIcon />
                                                    </IconButton> :
                                                    <div style={{display: 'flex'}}>
                                                        <IconButton
                                                            size="small"
                                                            edge="start"
                                                            aria-label="closed"
                                                            onClick={() => putItemStatus(item[itemsKeys[0]], 'Closed')}
                                                            // onClick={() => deleteItem(item[itemsKeys[0]])}
                                                        >
                                                            <CheckCircleOutlineIcon />
                                                        </IconButton>
                                                        <IconButton
                                                            size="small"
                                                            edge="start"
                                                            aria-label="paused"
                                                            onClick={() => putItemStatus(item[itemsKeys[0]], 'Paused')}
                                                        >
                                                            <PauseCircleOutlineIcon />
                                                        </IconButton>
                                                    </div> :
                                                itemsKeys.includes('cookStatus') ?
                                                    <IconButton
                                                        size="small"
                                                        edge="start"
                                                        aria-label="delete"
                                                        onClick={() => deleteItem(item[itemsKeys[0]])}
                                                    >
                                                        {
                                                            <BlockIcon />
                                                        } 
                                                    </IconButton> :
                                                itemsKeys.includes('categoryId') || itemsKeys.includes('nameId') || itemsKeys.includes('sizeId') || itemsKeys.includes('typeId') ?
                                                    <div style={{display: 'flex'}}>
                                                        {/* {allPizzas.filter(pizza => pizza.categoryId === item.categoryId).length === 0 ? */}
                                                            <IconButton
                                                                size="small"
                                                                edge="start"
                                                                aria-label="hide"
                                                                onClick={() => hideItem(item[itemsKeys[0]])}
                                                            >
                                                                {
                                                                    <VisibilityOffIcon />
                                                                } 
                                                            </IconButton> 
                                                            {/* : */}
                                                            <IconButton
                                                                size="small"
                                                                edge="start"
                                                                aria-label="delete"
                                                                onClick={() => deleteItem(item[itemsKeys[0]])}
                                                            >
                                                                {
                                                                    <DeleteIcon />
                                                                } 
                                                            </IconButton>
                                                    </div> :
                                                    <IconButton
                                                        size="small"
                                                        edge="start"
                                                        aria-label="delete"
                                                        onClick={() => deleteItem(item[itemsKeys[0]])}
                                                    >
                                                        {
                                                            <DeleteIcon />
                                                        } 
                                                    </IconButton>
                                                    // <IconButton
                                                    //     size="small"
                                                    //     edge="start"
                                                    //     aria-label="delete"
                                                    //     onClick={() => deleteItem(item[itemsKeys[0]])}
                                                    // >
                                                    //     {
                                                    //         itemsKeys.includes('cookStatus') ? 
                                                    //             <BlockIcon /> : 
                                                    //             <DeleteIcon />
                                                    //     } 
                                                    // </IconButton>
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



{/* 
{
                                            itemsKeys.includes('cookSessionId') || itemsKeys.includes('customerId') ? 
                                                '' :
                                            path === 'order' && itemsKeys.includes('orderId') ?
                                                item['status'] === 'Paused' ?
                                                    <IconButton
                                                        size="small"
                                                        edge="start"
                                                        aria-label="closed"
                                                        onClick={() => putItemStatus(item[itemsKeys[0]], 'Closed')}
                                                        // onClick={() => deleteItem(item[itemsKeys[0]])}
                                                    >
                                                        <CheckCircleOutlineIcon />
                                                    </IconButton> :
                                                item['status'] === 'Closed' ?
                                                    <IconButton
                                                        size="small"
                                                        edge="start"
                                                        aria-label="paused"
                                                        onClick={() => putItemStatus(item[itemsKeys[0]], 'Paused')}
                                                    >
                                                        <PauseCircleOutlineIcon />
                                                    </IconButton> :
                                                    <div style={{display: 'flex'}}>
                                                        <IconButton
                                                            size="small"
                                                            edge="start"
                                                            aria-label="closed"
                                                            onClick={() => putItemStatus(item[itemsKeys[0]], 'Closed')}
                                                            // onClick={() => deleteItem(item[itemsKeys[0]])}
                                                        >
                                                            <CheckCircleOutlineIcon />
                                                        </IconButton>
                                                        <IconButton
                                                            size="small"
                                                            edge="start"
                                                            aria-label="paused"
                                                            onClick={() => putItemStatus(item[itemsKeys[0]], 'Paused')}
                                                        >
                                                            <PauseCircleOutlineIcon />
                                                        </IconButton>
                                                    </div> :
                                                <IconButton
                                                    size="small"
                                                    edge="start"
                                                    aria-label="delete"
                                                    onClick={() => deleteItem(item[itemsKeys[0]])}
                                                >
                                                    {
                                                        itemsKeys.includes('cookStatus') ? 
                                                            <BlockIcon /> : 
                                                        itemsKeys.includes('categoryId') && path === 'categories' ?
                                                            <div>categories</div> :
                                                            <DeleteIcon />
                                                    } 
                                                </IconButton>
                                        } */}