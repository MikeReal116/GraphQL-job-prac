import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { addJob } from './request';

export default function JobForm() {
  const [formDetail, setFormDetail] = useState({ title: '', description: '' });
  const history = useHistory();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormDetail({ ...formDetail, [name]: value });
  };

  const handleClick = (event) => {
    event.preventDefault();
    if (formDetail.input === '' && formDetail.description === '') return;
    const input = { ...formDetail };
    addJob(input).then((data) => {
      history.push(`/jobs/${data.id}`);
    });
  };

  const { title, description } = formDetail;
  return (
    <div>
      <h1 className='title'>New Job</h1>
      <div className='box'>
        <form>
          <div className='field'>
            <label className='label'>Title</label>
            <div className='control'>
              <input
                className='input'
                type='text'
                name='title'
                value={title}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='field'>
            <label className='label'>Description</label>
            <div className='control'>
              <textarea
                className='input'
                style={{ height: '10em' }}
                name='description'
                value={description}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='field'>
            <div className='control'>
              <button className='button is-link' onClick={handleClick}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
