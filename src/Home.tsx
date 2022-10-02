import {useEffect} from 'react';
import { Table, Pagination } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {useDispatch, useSelector} from "react-redux";
import {getDriversData, DriverType, addToFavorites} from "./redux";
import { RootState, AppDispatch } from "./main";
import './Home.css';

function Home() {
    const dispatch = useDispatch<AppDispatch>();
    const {list, favorites, totalCount} = useSelector((state: RootState) => state.drivers);

    useEffect(() => {
        dispatch(getDriversData(1));
    }, [])

    function handleAddToFavorites(data: DriverType){
        if(!favorites.includes(data)){
            dispatch(addToFavorites(data));
        }
        console.log(favorites);
    }

    function onPageChange(page: number){
        dispatch(getDriversData(page));
    }

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
            title: 'Add to Favorites',
            dataIndex: 'favorites',
            render: (text, record) => (
                <button onClick={()=> handleAddToFavorites(record)}>
                    {"add"}
                </button>
            ),
        },
    ];

    return (
        <>
            <Table
                rowClassName={(record) => record.permanentNumber ? 'normal-row' :  'yellow-row' }
                dataSource={list}
                columns={columns}
                pagination={{
                    pageSize: 13,
                    total: totalCount,
                    onChange: onPageChange
                }}
            />
        </>
    )
}

export default Home;
