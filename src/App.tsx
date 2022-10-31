import React,{useEffect} from 'react';
import "./style/App.css";
import {axiosInstance} from './utils/axios';
import {AxiosPromise} from "axios";
import useRequest from './hooks/useRequest';


function App(){
    const {isLoading,error,data,sendRequestHandler} = useRequest();

    useEffect(() => {
        const config = {
            url:'todo/1',
            method:'get',

        }
        sendRequestHandler(config)
    },[])
    console.log(error)
    return(
        <div>{error?.errorMessage}</div>

    )

}

export default App;