import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { jobs } from './fake-data';

export default function JobDetail() {
  const { jobId } = useParams();
  const jobDt = jobs.find((job) => job.id === jobId);
  const [job, setJob] = useState(jobDt);

  return (
    <div>
      <h1 className='title'>{job.title}</h1>
      <h2 className='subtitle'>
        <Link to={`/companies/${job.company.id}`}>{job.company.name}</Link>
      </h2>
      <div className='box'>{job.description}</div>
    </div>
  );
}
