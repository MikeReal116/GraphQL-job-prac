import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JobList from './JobList';

import { loadCompany } from './request';

export default function CompanyDetail() {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    loadCompany(companyId).then((data) => setCompany(data));
  }, [companyId]);

  if (!company) {
    return null;
  }

  return (
    <div>
      <h1 className='title'>{company.name}</h1>
      <div className='box'>{company.description}</div>
      <h6 className='title is-5'> Current Openings at {company.name}</h6>
      <JobList jobs={company.jobs} />
    </div>
  );
}
