import React from 'react';
import { Table } from 'antd';
import {ColumnsType} from "antd/es/table";
import {useDispatch, useSelector} from "react-redux";
import {DriverType, deleteFavorite} from "./redux";
import { RootState, AppDispatch } from "./main";
import './Home.css';

function Favorites() {
    const dispatch = useDispatch<AppDispatch>();
    const {favorites} = useSelector((state: RootState) => state.drivers);

    const columns: ColumnsType<DriverType> = [
        {
            title: 'Driver Id',
            dataIndex: 'driverId',
        },
        {
            title: 'Given Name',
            dataIndex: 'givenName',
        },
        {
            title: 'Permanent Number',
            dataIndex: 'permanentNumber',
        },
        {
            title: 'Date of Birth',
            dataIndex: 'dateOfBirth',
        },
        {
            title: 'Nationality',
            dataIndex: 'nationality',
        },
        {
            title: 'Information',
            dataIndex: 'url',
            render: (text: string) => <a href={text}>{text}</a>,
        },
        {
            title: 'Delete from Favorites',
            dataIndex: 'favorites',
            render: (text, record) => (
                <button onClick={()=> handleDelete(record)}>
                    {"delete"}
                </button>
            ),
        },
    ];

    function handleDelete(data: DriverType){
        const newArr = favorites.filter((item) => item !== data);
        dispatch(deleteFavorite(newArr));
    }

    return (
        <>
            <h1>Favorites</h1>
            <button onClick={() => dispatch(deleteFavorite([]))}>Clear</button>
            <Table
                rowClassName={(record) => record.permanentNumber ? 'normal-row' :  'yellow-row' }
                columns={columns}
                dataSource={favorites}
            />
        </>
    );
}

export default Favorites;