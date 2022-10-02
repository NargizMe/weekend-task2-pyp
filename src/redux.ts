import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios, {AxiosResponse} from "axios";
import type { PayloadAction } from '@reduxjs/toolkit';
import { message } from 'antd';

export interface DriverType{
    dateOfBirth: string
    driverId: string
    permanentNumber: string
    givenName: string
    nationality: string
    url: string
}

interface DriversResponseData{
    MRData: {
        DriverTable: {Drivers: DriverType[]}
        limit: string
        offset: string
        series: string
        total: string
        url: string
        xmlns: string
    }
}

interface IState {
    list: Array<DriverType>,
    error: string | null,
    favorites: Array<DriverType>,
    totalCount: number
}

const initialState: IState = {
    list: [],
    error: null,
    favorites: [],
    totalCount: 0
}

export const getDriversData = createAsyncThunk(
    'drivers/fetchData',
    async (page: number) => {
        try{
            const result: AxiosResponse<DriversResponseData> =
                await axios(`https://ergast.com/api/f1/drivers.json?limit=${13}&offset=${page}`);
            return {
                data: result.data.MRData.DriverTable.Drivers.map((d: DriverType, i: number) => ({...d, key: i})),
                totalCount: +result.data.MRData.total,
                type: 'data'
            }
        }
        catch(error: any) {
            message.error(error.message);
            return {
                data: error.message,
                totalCount: 0,
                type: 'error'
            }
        }
    }
)

export const sliceDriver = createSlice({
    name: 'getDrivers',
    initialState,
    reducers: {
        addToFavorites: (state, action: PayloadAction<DriverType>) => {
            state.favorites.push(action.payload);
        },
        deleteFavorite: (state, action: PayloadAction<Array<DriverType>>) => {
            state.favorites = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getDriversData.fulfilled, (state, action) => {
            if(action.payload.type === 'data'){
                state.list = action.payload.data;
            }
            if(action.payload.type === 'error'){
                state.error = action.payload.data
            }
            state.totalCount = action.payload.totalCount;
        })
    }
})

export const {addToFavorites, deleteFavorite} = sliceDriver.actions;
export default sliceDriver.reducer;