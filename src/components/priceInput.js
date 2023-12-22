import { useState, useEffect } from 'react';
import { addComma } from '../utilFunction';
import { Form, InputGroup } from 'react-bootstrap';
import './priceInput.css';

export function PriceInput({onChange}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (typeof onChange === 'function') {
      onChange(value);
    }
  }, [value]);


  const handleChange = event => {
    setValue(addComma(event.target.value));
  };

  return (
    <div className='price-input'>
      <Form.Label className='price-input__label'>入住費用(每人每晚)</Form.Label>
      <InputGroup hasValidation>
        <InputGroup.Text>TWD</InputGroup.Text>
        <Form.Control
          placeholder='請輸入費用'
          value={value}
          onInput={handleChange}
          required
          isInvalid={value === ''}
        ></Form.Control>
        <Form.Control.Feedback type='invalid'>
          不可以為空白
        </Form.Control.Feedback>
      </InputGroup>
      <Form.Text className='price-input__text'>
        輸入 0 表示免費
      </Form.Text>
    </div>
  )
}