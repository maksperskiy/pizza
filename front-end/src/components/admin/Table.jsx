import React from 'react';
import { Table as TableMaterial, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Paper, styled, IconButton } from '@material-ui/core';
import { Delete as DeleteIcon, Edit as EditIcon, CheckCircle as CheckCircleIcon } from '@material-ui/icons';
import { cutStr, cleanTheDate } from './../../functions/importFunctions';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
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
        position: 'relative'
    },
    'td button': {
        position: 'absolute', 
        marginLeft: '10px',
        top: '50%', 
        transform: 'translateY(-50%)'
    }
}));

const Table = ({ itemsKeys, allItems, deleteItem, setVisibleFormPost, setPutStatusId, setElemUpdate, putDateTimeItem }) => {
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
                                    !itemsKeys.includes('cookSessionId') ? 
                                    <StyledTableCell sx={{width: '34px'}}></StyledTableCell> : ''
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                allItems.map(item => 
                                    <StyledTableRow sx={{position: 'relative'}}>
                                        {itemsKeys.map((key, index) => 
                                            <>
                                                {typeof item[key] === 'object' ?
                                                    <StyledTableCell>
                                                        {
                                                            key === 'cook' ?
                                                                cutStr(String(item[key]['name']), 'name') :
                                                            key === 'dateTimeEnd' || key === 'dateTimeStart' ?
                                                                cutStr(String(item[key]), key) :
                                                                cutStr(String(item[key]['value']), 'value')
                                                        }
                                                        {key === 'post' ? 
                                                            <IconButton
                                                                size="small"
                                                                edge="start"
                                                                aria-label="edit"
                                                                onClick={() => {
                                                                    setPutStatusId(item.cookId);
                                                                    setVisibleFormPost(false);
                                                                    setElemUpdate(key);
                                                                }}
                                                            >
                                                                <EditIcon />
                                                            </IconButton> :
                                                        key === 'dateTimeEnd' ?
                                                            <IconButton
                                                                size="small"
                                                                edge="start"
                                                                aria-label="edit"
                                                                onClick={() => {
                                                                    putDateTimeItem(item.cook.cookId)
                                                                }}
                                                            >
                                                                <CheckCircleIcon />
                                                            </IconButton>
                                                            : ''}
                                                    </StyledTableCell> : 
                                                    <StyledTableCell>
                                                        {
                                                            key === 'dateTimeEnd' || key === 'dateTimeStart' ?
                                                                cleanTheDate(cutStr(String(item[key]), key)) :
                                                                cutStr(String(item[key]), key)
                                                        }
                                                        {key === 'cookStatus' ? 
                                                            <IconButton
                                                                size="small"
                                                                edge="start"
                                                                aria-label="edit"
                                                                onClick={() => {
                                                                    setPutStatusId(item.cookId);
                                                                    setVisibleFormPost(false);
                                                                    setElemUpdate(key);
                                                                }}
                                                            >
                                                                <EditIcon />
                                                            </IconButton> : ''}
                                                    </StyledTableCell>
                                                }
                                            </>
                                        )}
                                        {
                                            !itemsKeys.includes('cookSessionId') ? 
                                                <IconButton
                                                    size="small"
                                                    edge="start"
                                                    aria-label="delete"
                                                    onClick={() => deleteItem(item[itemsKeys[0]])}
                                                >
                                                    <DeleteIcon />
                                                </IconButton> : ''
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