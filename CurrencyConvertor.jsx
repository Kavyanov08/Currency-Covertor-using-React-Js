import React, { useEffect, useState } from 'react'
import axios from 'axios'

export const CurrencyConvertor = () => {
    const[amount,setAmount]=useState(1)
    const[fromcurrency,setFromcurrency]=useState('USD')
    const[tocurrency,setTocurrency]=useState('INR')
    const[convertedamount,setConvertedamount]=useState(null)
    const[exchangerate,setExchangerate]=useState(null)

useEffect(()=>{
    const getexchangerate=async()=>{
        try{
            let url=`https://api.exchangerate-api.com/v4/latest/${fromcurrency}`
            const response=await axios.get(url)
            setExchangerate(response.data.rates[tocurrency])
        }catch(error){
            console.error('Error fetching exxhange rate',error)
        }
    };getexchangerate()
},[fromcurrency,tocurrency])
    useEffect(()=>{
        if(exchangerate!==null){
            setConvertedamount((amount*exchangerate).toFixed(2))
        }
    },[amount,exchangerate])

    const handleamountchange=(e)=>{
        const value=parseFloat(e.target.value)
        setAmount(isNaN(value) ? 0  : value)
    }
    const handleFromcurrencychange=(e)=>{
        setFromcurrency(e.target.value)
    }
     const handleTocurrencychange=(e)=>{
        setTocurrency(e.target.value)
    }
    
  return (
    <>
    <div className="currency-convertor">
        <div className="box"></div>
        <div className="data">
            {/* <h1>Currency Convertor</h1> */}
            <div className="input-container">
                <label htmlFor="amt">Amount:</label>
                <input type="text" id='amt' value={amount} onChange={handleamountchange}/>
            </div>
            <div className="input-container">
                <label htmlFor="fromcurrency">From Currency:</label>
                <select id="fromcurrency" value={fromcurrency}  onChange={handleFromcurrencychange}>
                    <option value="USD">USD-United States Dollar</option>
                    <option value="EUR">EUR-EURO</option>
                    <option value="GBP">GBP-British Pound Sterling</option>
                    <option value="JPY">JPY-Japanese Yen</option>
                    <option value="AUD">AUD-Australian Dollar</option>
                    <option value="CAD">CAD-Canadian Dollar</option>
                    <option value="CNY">CNY-Chinese Yuan</option>
                    <option value="INR">INR-Indian Rupee</option>
                    <option value="BRL">BRL-Brazilian Real</option>
                    <option value="ZAR">ZAR-South African Rand</option>
                </select>
            </div>
            <div className="input-container">
                <label htmlFor="tocurrency">To Currency:</label>
                <select id="tocurrency" value={tocurrency} onChange={handleTocurrencychange}>
                    <option value="USD">USD-United States Dollar</option>
                    <option value="EUR">EUR-EURO</option>
                    <option value="GBP">GBP-British Pound Sterling</option>
                    <option value="JPY">JPY-Japanese Yen</option>
                    <option value="AUD">AUD-Australian Dollar</option>
                    <option value="CAD">CAD-Canadian Dollar</option>
                    <option value="CNY">CNY-Chinese Yuan</option>
                    <option value="INR">INR-Indian Rupee</option>
                    <option value="BRL">BRL-Brazilian Real</option>
                    <option value="ZAR">ZAR-South African Rand</option>
                </select>
            </div>
            <div className="result"><p>{amount} {fromcurrency} is qual to {convertedamount} {tocurrency}</p></div>
        </div>
    </div>
    </>
  )
}
