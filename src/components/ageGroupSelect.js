import { useEffect, useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';

export function AgeGroupSelect({value, isInvalid, onChange}) {
  let [startValue, setStartValue] = useState(value[0] || 0);
  let [endValue, setEndValue] = useState(value[1] || 0);
  let [invalid, setInvalid] = useState(isInvalid || false);


  useEffect(() => {
    if (typeof onChange === 'function') {
      onChange([startValue, endValue]);
    }
  }, [startValue, endValue]);

  useEffect(() => {
    setInvalid(isInvalid);
  }, [isInvalid]);

  // 更新範圍起始值
  let updateStartValue = (event) => {
    setStartValue(parseInt(event.target.value, 10));
  };

  // 更新範圍結束值
  let updateEndValue = (event) => {
    setEndValue(parseInt(event.target.value, 10));
  };

  return (
    <div className='age-group'>
      <Form.Label className='price-input__label'>年齡</Form.Label>
      <InputGroup hasValidation>
        <Form.Select
          value={startValue}
          onChange={updateStartValue}
          isInvalid={invalid}
        >
          {Array.from(Array(21), (e, i) => {
            return (
              <option key={i} value={i} disabled={i >= endValue}>
                {i}
              </option>
            )
          })}
        </Form.Select>
        <InputGroup.Text>~</InputGroup.Text>
        <Form.Select
          value={endValue}
          onChange={updateEndValue}
          isInvalid={invalid}
        >
          {Array.from(Array(21), (e, i) => {
            return (
              <option key={i} value={i} disabled={i <= startValue}>
                {i}
              </option>
            )
          })}
        </Form.Select>
        <Form.Control.Feedback type='invalid'>
          年齡區間不可重疊
        </Form.Control.Feedback>
      </InputGroup>
    </div>
  );
}