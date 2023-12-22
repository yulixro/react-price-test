import { AgeGroupSelect } from "./ageGroupSelect";
import { PriceInput } from "./priceInput";
import './ageGroupPriceList.css';
import { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import { getNumberIntervals } from '../utilFunction';

export function AgeGroupPriceList({onChange}) {
  const defaultAge = [0, 20];
  const defaultPrice = 0;
  const defaultConfig = {
    ageGroup: defaultAge,
    price: defaultPrice
  }

  let [groupArray, setGroupArray] = useState([defaultConfig]);
  let [overlap, setOverlap] = useState([]);
  let [notInclude, setNotInclude] = useState([]);

  useEffect(() => {
    if (typeof onChange === 'function') {
      onChange(groupArray);

      // 任意年齡設定變更時確認重複及不包含的區間
      let rangeArray = groupArray.map(group => group.ageGroup);
      const value = getNumberIntervals(rangeArray);
      setOverlap(value.overlap);
      setNotInclude(value.notInclude);
    }
  }, [groupArray]);

  // 新增價格設定區塊的處理
  let handleAdd = () => {
    setGroupArray([
      ...groupArray,
      {
        ageGroup: defaultAge,
        price: defaultPrice
      }
    ]);
  };

  // 刪除價格設定區塊的處理
  let handleRemove = (index) => {
    let arr = [...groupArray];
    arr.splice(index, 1);
    setGroupArray(arr);
  }

  // 更新年齡設定的處理
  let handleUpdateAge = (index, result) => {
    let arr = [...groupArray];
    arr[index] = {
      ...arr[index],
      ageGroup: result
    };
    setGroupArray(arr);
  }

  // 更新價格設定的處理
  let handleUpdatePrice = (index, result) => {
    let arr = [...groupArray];
    arr[index] = {
      ...arr[index],
      price: result
    };
    setGroupArray(arr);
  }
  
  return (
    <div className='group-list'>
      {groupArray.map((item, index) => {
        return (
          <div key={index}>
            { index > 0 && <hr></hr> }
            <div className='age-group-price'>
              <div className='age-group-price__header'>
                <label>價格設定 - {index + 1}</label>
                { index > 0 &&
                  <Button variant='secondary' onClick={() => handleRemove(index)}>X 移除</Button>
                }
              </div>
              <div className="age-group-price__item">
                <AgeGroupSelect
                  value={item.ageGroup}
                  isInvalid={overlap.length > 0}
                  onChange={(result) => handleUpdateAge(index, result)}
                />
                <PriceInput onChange={(result) => handleUpdatePrice(index, result)} />
              </div>
            </div>
          </div>
        )
      })}
      <Button
        className='group-list__add'
        disabled={notInclude.length === 0 && groupArray.length > 1}
        onClick={() => handleAdd()}
      >
        + 新增價格設定
      </Button>
    </div>
  )
}