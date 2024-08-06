import { Params } from "@/types/common";
import { RootProduct, FilterTag, CarDetail, ListCar, LocalPickUpAndDropOff } from "@/types/product";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: RootProduct = {
  filterTag: {
    types: [],
    capacities: [],
    price_range: {
      min: 0,
      max: 0
    }
  },
  recommendCar: {
    items: [],
    pagination: {
      limit: 0,
      offset: 0,
      total: 0
    }
  },
  listCar: {
    items: [],
    pagination: {
      total: 0,
      limit: 0,
      offset: 0
    }
  }
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getFilterTag() {},
    getFilterTagSuccess: (state, action: PayloadAction<FilterTag>) => {
      state.filterTag = action.payload
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getRecommendationCar(state, action: PayloadAction<Params>) {},
    getRecommendationCarSuccess: (state, action: PayloadAction<ListCar>) => {
      state.recommendCar.pagination = action.payload.pagination
      state.recommendCar.items = [...state.recommendCar.items, ...action.payload.items]
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getRecommendationCarDetail(state, action: PayloadAction<Params>) {},
    getRecommendationCarDetailSuccess: (state, action: PayloadAction<ListCar>) => {
      state.recommendCarDetail = action.payload
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getCarDetail(state, action: PayloadAction<string>) {},
    getCarDetailSuccess: (state, action: PayloadAction<CarDetail>) => {
      state.carDetail = action.payload
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getListCar(state, action: PayloadAction<Params>) {},
    getListCarSuccess: (state, action: PayloadAction<ListCar>) => {
      state.listCar.pagination = action.payload.pagination
      if (state.listCar.pagination.offset >= 2) {
        state.listCar.items = [...state.listCar.items, ...action.payload.items]
      } else {
        state.listCar.items = action.payload.items
      }
    },

    saveDataPickUpAndDropOff(state, action: PayloadAction<LocalPickUpAndDropOff>) {
      state.dataPickUpAndDropOff = action.payload
    }
  },
});

export const {
  getFilterTag,
  getFilterTagSuccess,
  getRecommendationCar,
  getRecommendationCarSuccess,
  getCarDetail,
  getCarDetailSuccess,
  getListCar,
  getListCarSuccess,
  getRecommendationCarDetail,
  getRecommendationCarDetailSuccess,
  saveDataPickUpAndDropOff
} = productSlice.actions;

export default productSlice.reducer;
