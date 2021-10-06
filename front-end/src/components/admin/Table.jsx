import React from 'react';
import { Table as TableMaterial, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Paper, styled, IconButton } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { cutStr } from './../../functions/str';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses}`]: {
        overflow: 'hidden'
    },
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
    'tr': {
        position: 'relative'
    },
    'button': {
        position: 'absolute',
        right: 0
    },
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
        padding: 0
    },
    'td': {
        border: 0
    },
    'td: last-child': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
}));

const Table = ({ itemsKeys, allItems, deleteItem }) => {
    console.log(itemsKeys, allItems);
    return (
        <TableContainer component={Paper} sx={{overflow: 'hidden'}}>
            <TableMaterial sx={{ minWidth: 720 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {
                            itemsKeys && itemsKeys.map(key => 
                                <StyledTableCell>{key}</StyledTableCell>
                            )
                        }
                        <StyledTableCell></StyledTableCell>
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
                                                {cutStr(String(item[key]['value']), 'value')}
                                            </StyledTableCell> : 
                                            <StyledTableCell>
                                                {
                                                    cutStr(String(item[key]), key)
                                                }
                                            </StyledTableCell>
                                        }
                                    </>
                                )}
                                <IconButton
                                    size="small"
                                    edge="start"
                                    aria-label="home"
                                    onClick={() => deleteItem(item[itemsKeys[0]])}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </StyledTableRow>
                        )
                    }
                </TableBody>
            </TableMaterial>
        </TableContainer>
    );
}

export default Table;