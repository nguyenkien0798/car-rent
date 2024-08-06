'use client'

import React, { useEffect, useState } from "react";
import {
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import { getListOrders } from "@/redux/slice/payment";
import { RootState } from "@/redux/store";
import { getDictionary } from "@/get-dictionary";
import { ListOrders } from "@/types/payment";
import StatusOrder from "../StatusOrder";
import { useRouter } from "next/navigation";
import { Locale } from "@/i18n-config";
import NoData from '/public/images/no-data.png'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#3563E9',
    color: theme.palette.common.white,
    fontWeight: 700,
    fontSize: {xs: 14, sm: 18}
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: {xs: 12, sm: 16},
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Orders({ dictionary, params }: {params: Locale; dictionary: Awaited<ReturnType<typeof getDictionary>>;}) {
  const dispatch = useDispatch()
  const router = useRouter()
  const { listOrder } = useSelector((state: RootState) => state.payment);
  const [page, setPage] = useState<number>(1)
  const [listDataOrders, setListDataOrders] = useState<ListOrders[]>([])

  useEffect(() => {
    setListDataOrders(listOrder.items)
  }, [listOrder])

  useEffect(() => {
    setListDataOrders([])
    dispatch(getListOrders({ limit: 10, offset: page }))
  }, [page])

  const totalPage = listOrder.pagination.total ? Math.ceil(listOrder.pagination.total / 10) : 0

  return (
    <div className="2xl:px-0 xs:px-6 py-8 max-w-[1312px] mx-auto">
      {listDataOrders ? (
        <>
          <div className="mb-8 flex justify-center">
            <p className="xs:text-[24px] sm:text-[32px] font-bold">{dictionary.orders.ordersList}</p>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell sx={{ maxWidth: '200px' }}>{dictionary.orders.code}</StyledTableCell>
                  <StyledTableCell sx={{ maxWidth: '250px' }} align="center">{dictionary.orders.paymentMethod}</StyledTableCell>
                  <StyledTableCell align="center">{dictionary.orders.totalPrice}</StyledTableCell>
                  <StyledTableCell align="center">{dictionary.orders.status}</StyledTableCell>
                  <StyledTableCell align="center">{dictionary.orders.action}</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listDataOrders.map((row, index) => (
                  <StyledTableRow key={row.id + index} hover>
                    <StyledTableCell component="th" scope="row">
                      {row.code}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.payment_method_name}</StyledTableCell>
                    <StyledTableCell align="center">{row.total}</StyledTableCell>
                    <StyledTableCell align="center">
                      <StatusOrder status={row.status} dictionary={dictionary}/>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <p onClick={() => router.push(`/${params}/orders/${row.id}`)} className="text-[16px] underline cursor-pointer">{dictionary.orders.detail}</p>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="mt-6 flex justify-end">
            <Pagination count={totalPage} onChange={(e, value) => setPage(value)}/>
          </div>
        </>
      ) : (
        <div className="my-[64px] max-w-[375px] mx-auto">
          <div className="flex justify-center">
            <img src={NoData.src} alt="no-data" />
          </div>
          <p className="mt-8 text-center text-[18px] font-semibold">{dictionary.common.noData}</p>
        </div>
      )}
    </div>
  );
}
