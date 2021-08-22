import db from '../db.js';

export const resolvers = {
  Query: {
    jobs: () => db.jobs.list(),
    job: (root, { id }) => db.jobs.get(id),
    company: (root, { id }) => db.companies.get(id)
  },
  Job: {
    company: (job) => db.companies.get(job.companyId)
  },
  Company: {
    jobs: (company) =>
      db.jobs.list().filter((job) => job.companyId === company.id)
  }
};
