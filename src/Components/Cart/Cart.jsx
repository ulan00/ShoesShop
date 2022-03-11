import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { productContext } from '../../Contexts/ProductsContext';
import { Button, Typography } from '@mui/material';
import { calcTotalPrice } from '../../Helpers/CalcPrice';
import { Link } from '@mui/material';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function Cart() {
    
    const { cart, getCart, changeProductCount } = React.useContext(productContext)
    React.useEffect(() => {
        getCart()
    }, [])
    
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Image</StyledTableCell>
            <StyledTableCell align="right">Title</StyledTableCell>
            <StyledTableCell align="right">Price(g)</StyledTableCell>
            <StyledTableCell align="right">Count(g)</StyledTableCell>
            <StyledTableCell align="right">SubPrice(g)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
              {cart.products ? (
                  <>
                    {cart.products.map((elem) => (
                        <StyledTableRow key={elem.item.id}>
                            <StyledTableCell component="th" scope="row">
                                <img width="60" src={elem.item.image}/>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {elem.item.title}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {elem.item.price}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <input 
                                    type="number"
                                    value={elem.count}
                                    onChange={(e) => changeProductCount(e.target.value, elem.item.id)}
                                />
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {elem.item.subPrice}
                            </StyledTableCell>
                            
                        </StyledTableRow>
                    ))}
                  </>
              ) : (null) }
              <TableRow>
                        <TableCell rowSpan={3}/>
                        <TableCell colSpan={2}>
                            <Typography variant="h4">Total: </Typography>
                        </TableCell>
                        {
                            cart.products ? (
                                <TableCell align='right'>
                                    <Typography variant='h5'>{calcTotalPrice(cart.products) }</Typography>
                                </TableCell>
                            ) : (null)
                        }
                </TableRow> 
                <TableRow>
                  <Link>
                  <TableCell colSpan={3} align="right">
                        <Button href='/pay' variant='contained' color="success">Buy</Button>
                    </TableCell>
                  </Link>             
                </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}


/**
 * {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
              <StyledTableCell align="right">{row.fat}</StyledTableCell>
              <StyledTableCell align="right">{row.carbs}</StyledTableCell>
              <StyledTableCell align="right">{row.protein}</StyledTableCell>
            </StyledTableRow>
          ))}
 * 
 */