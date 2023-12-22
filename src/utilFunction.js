/**
 * 將數字加上千分位
 * @param {*} num 要處理的數字
 * @returns 加上千分位的數字字串
 */
export function addComma(num) {
  if (typeof num !== 'number' && typeof num !== 'string') {
    console.log('請輸入數字');
    return;
  }

  // 如果大於個位數則去掉開頭為 0 的字
  if (num.toString().length > 1) {
    num = num.replace(/^0+/, '');
  }

  const removeComma = n => n.toString().replace(/,/g, '');
  return removeComma(num).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * 找出數字重疊與未包含的區間
 * @param {*} arr 區間陣列
 * @returns 重疊區間與未包含區間
 */
export function getNumberIntervals(arr) {
  if (typeof arr !== 'object') {
    console.log('請給予正確格式的資料');
    return;
  }

  let intervalObj = {};

  for (let i = 0; i <= 20; i++) {
    intervalObj[i] = 0;
  }

  arr.forEach(item => {
    for (let i = item[0]; i <= item[1]; i++) {
      intervalObj[i] ++;
    }
  });

  const overlapItems = Object.keys(intervalObj).filter(key => intervalObj[key] > 1);
  const notIncludeItems = Object.keys(intervalObj).filter(key => intervalObj[key] === 0);

  let findRange = (numArray) => {
    let length = 1;
    let list = [];
    if (numArray.length === 0) {
      return list;
    }

    for (let i = 1; i<= numArray.length; i++) {
      if (i === numArray.length || numArray[i] - numArray[i - 1] !== 1) {
        if (length === 1) {
          list.push([numArray[i - length], numArray[i - length]]);
        } else {
          list.push([numArray[i - length], numArray[i - 1]]);
        }

        length = 1;
      } else {
        length ++;
      }
    }

    return list;
  };

  return {
    overlap: findRange(overlapItems),
    notInclude: findRange(notIncludeItems)
  }
}