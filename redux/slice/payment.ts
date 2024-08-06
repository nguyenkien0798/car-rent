import { BodyParamsSummary, Params } from "@/types/common";
import { DataListOrders, DataOrderDetail, ErrorRentalSummary, OrdersSummary, RootStatePayment } from "@/types/payment";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: RootStatePayment = {
  ordersSummary: {
    coupons: {
      amount: 0,
      code: '',
      Quantity: 0,
      type: ''
    },
    items: [
      {
        avg_rating: 0,
        id: 0,
        name: '',
        price: 0,
        sale_price: 0,
        thumbnail_url: ''
      }
    ],
    subtotal: 0,
    tax: 0,
    total: 0
  },
  listOrder: {
    items: [],
    pagination: {
      limit: 0,
      offset: 0,
      total: 0
    }
  }
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getOrdersSummary(state, action: PayloadAction<BodyParamsSummary>) {},
    getOrdersSummarySuccess: (state, action: PayloadAction<OrdersSummary>) => {
      state.ordersSummary = action.payload
    },
    getOrderSummaryError: (state, action: PayloadAction<ErrorRentalSummary>) => {
      state.errorRentalSummary = action.payload
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getListOrders(state, action: PayloadAction<Params>) {},
    getListOrdersSuccess: (state, action: PayloadAction<DataListOrders>) => {
      state.listOrder = action.payload
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getOrderDetail(state, action: PayloadAction<string>) {},
    getOrderDetailSuccess: (state, action: PayloadAction<DataOrderDetail>) => {
      state.orderDetail = action.payload
    }
  },
});

export const {
  getOrdersSummary,
  getOrdersSummarySuccess,
  getOrderSummaryError,
  getListOrders,
  getListOrdersSuccess,
  getOrderDetail,
  getOrderDetailSuccess,
} = paymentSlice.actions;

export default paymentSlice.reducer;
