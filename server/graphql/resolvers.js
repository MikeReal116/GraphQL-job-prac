import db from '../db.js';

export const resolvers = {
  Query: {
    jobs: () => db.jobs.list(),
    job: (root, { id }) => db.jobs.get(id),
    company: (root, { id }) => db.companies.get(id)
  },
  Mutation: {
    createJob: (root, { input }, context) => {
      if (!context.user) {
        throw new Error('Unauthorized');
      }
      const id = db.jobs.create({
        ...input,
        companyId: context.user.companyId
      });
      return db.jobs.get(id);
    }
  },
  Job: {
    company: (job) => db.companies.get(job.companyId)
  },
  Company: {
    jobs: (company) =>
      db.jobs.list().filter((job) => job.companyId === company.id)
  }
};
