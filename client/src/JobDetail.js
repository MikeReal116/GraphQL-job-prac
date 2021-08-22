import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { loadJob } from './request';

export default function JobDetail() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    loadJob(jobId).then((data) => setJob(data));
  }, [jobId]);

  if (!job) {
    return null;
  }

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
