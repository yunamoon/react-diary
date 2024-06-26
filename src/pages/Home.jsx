import React, { useState, useContext } from 'react'
import Header from '../components/header/Header';
import Button from '../components/button/Button';
import DiaryList from '../components/diary/DiaryList';
import { StateContext } from '../App';
import { useNavigate } from 'react-router-dom';
import Main from '../components/main/Main';

const getMonthlyData = (pivotDate, data) => {
  const beginTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth(),1,0,0,0).getTime();
  const endTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth()+1,0,23,59,59).getTime();

  return data.filter((item)=> 
  beginTime <= item.createDate && item.createDate <= endTime);
};

const Home = () => {
  const data = useContext(StateContext);
  const [pivotDate , setPivotDate] = useState(new Date());
  const nav = useNavigate();
  const monthlyData = getMonthlyData(pivotDate, data);

  const onLastMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() -1));
  };
  const onNextMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() +1));
  };

  return (
    <>
    <Main/>
    <Header 
    title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() +1}월`}
    leftChild={<Button onClick={onLastMonth} text={'<'}/>}
    rightChild={<Button onClick={onNextMonth} text={'>'}/>}/>
    <DiaryList data={monthlyData}/>
    </>
  )
}

export default Home;