import React from 'react';
import './css/Popular.scss';
export default function Popular() {
  return (
    <div>
      <div className='navigate'>
        <div className='allBest'>
          전체 베스트 100
        </div>
        <div className='categoryBest'>
          카테고리 베스트
        </div>
      </div>
    </div>
  );
}
