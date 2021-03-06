import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    jobs: [Job]
    job(id: ID!): Job
    company(id: ID!): Company
  }
  type Mutation {
    createJob(input: CreateJobInput): Job
  }
  type Job {
    id: ID!
    title: String
    description: String
    company: Company
  }
  type Company {
    id: ID!
    name: String
    description: String
    jobs: [Job]
  }

  input CreateJobInput {
    title: String
    description: String
  }
`;
