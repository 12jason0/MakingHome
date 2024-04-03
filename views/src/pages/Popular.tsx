import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/Popular.scss';

interface Item {
  id: number,
  body: string,
  img : string,
  titl: string,
  sale: string,
  price: string,
  delivery: string,
  chart: number
}

export default function Popular() {
  const [navigate1State,setNavigate1State] = useState<string>('activeAllBest');
  const [navigate2State,setNavigate2State] = useState<string>('viewAll');
  const [items,setItems] = useState<Item []>([]);
  const allBestActive = () => {
    setNavigate1State('activeAllBest');
  }
  const categoryBestActive = () => {
    setNavigate1State('activeCategoryBest');
  }
  const all = ()=>{
    setNavigate2State('viewAll');
  }
  const viewWeekChart = ()=>{
    setNavigate2State('viewWeekChart');
  }
  const viewMonthChart = ()=>{
    setNavigate2State('viewMonthChart');
  }
  const good = ()=>{
    setNavigate2State('viewGood');
  }
  // 페이지 처음 들어왔을때 전체 베스트 20 / 전체 보기 띄우기
  useEffect(()=>{
        const chart_ALL = async () => {
          setItems([]);
          const best_items = await axios.get('http://localhost:5000/api/item/chart');
          const {best_item} = best_items.data;
          console.log(best_item);
           setItems(best_item);
          console.log('items',items);
        }
      if(navigate1State === 'activeAllBest' && navigate2State === 'viewAll'){
        chart_ALL();
      }
      // 전체 베스트 20 누른 상태에서 전체보기 / 주간 차트.. 누를 시 메뉴에 맞는 메뉴 띄우기
  },[navigate1State,navigate2State]);

  return (

    <div className='top'>
      <div className='navigate1'>
        <div className={navigate1State === 'activeAllBest' ? navigate1State : 'allBest'} onClick={allBestActive}>
          전체 베스트 20
        </div>
        <div className={navigate1State === 'activeCategoryBest' ? navigate1State : 'categoryBest'} onClick={categoryBestActive}>
          카테고리 베스트
        </div>
      </div>
      <div className='navigate2'>
        <div className={navigate2State ==='viewAll' ? navigate2State : ''} onClick={all}><p>전체보기</p></div>
        <div className={navigate2State ==='viewWeekChart' ? navigate2State : ''} onClick={viewWeekChart}><p>주간 차트</p></div>
        <div className={navigate2State ==='viewMonthChart' ? navigate2State : ''} onClick={viewMonthChart}><p>월간 차트</p></div>
        <div className={navigate2State ==='viewGood' ? navigate2State : ''} onClick={good}><p>명예의 전당</p></div>
      </div>
      <hr />
      {items.length > 0 && items.map((item)=>{
        return <div key={item.id}>{item.body}</div>
      })}
    </div>
  );
}
