import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { companies } from './fake-data';

export default function CompanyDetail() {
  const { companyId } = useParams();
  const companyDt = companies.find((company) => company.id === companyId);
  const [company, setCompany] = useState(companyDt);

  return (
    <div>
      <h1 className='title'>{company.name}</h1>
      <div className='box'>{company.description}</div>
    </div>
  );
}
