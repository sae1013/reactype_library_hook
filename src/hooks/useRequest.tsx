import React,{useState,useEffect,useCallback} from 'react';
import {axiosInstance} from '../utils/axios';
import {AxiosRequestConfig} from 'axios'

interface HttpError {
    errorCode?:string,
    errorMessage:string
}

interface Config {
    url:string,
    method:string,

}

enum HTTP_ERROR_TYPE {
    ERR_NETWORK = 'ERR_NETWORK',   // 서버 에러
    ERR_BAD_REQUEST = 'ERR_BAD_REQUEST' // 클라이언트 오류
}

function UseRequest() {
    const [isLoading,setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data,setData] = useState();
    const sendRequestHandler = useCallback(async (config:AxiosRequestConfig) => {
        try{
            const response = await axiosInstance(config)
            console.log(response)
            setData(response.data)

        }
        catch(err){
            if(err.code === HTTP_ERROR_TYPE.ERR_NETWORK) {
                setError({
                    errorMessage: 'please check Network or Address'
                })

            }else if(err.code === HTTP_ERROR_TYPE.ERR_BAD_REQUEST){
                let errorMessage = err.response.data?.message
                console.log(err.code)
                setError({
                    errorCode:err.response.status,
                    errorMessage: errorMessage || err.message
                })
            }
        }


    },[]);

    return {isLoading,error,data,sendRequestHandler}
}

export default UseRequest;
