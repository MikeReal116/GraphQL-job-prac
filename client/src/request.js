import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache
} from 'apollo-boost';
import gql from 'graphql-tag';

import { getAccessToken, isLoggedIn } from './auth';

const url = 'http://localhost:9000/graphql';

const authLink = new ApolloLink((operation, forward) => {
  if (isLoggedIn) {
    operation.setContext({
      headers: {
        authorization: `Bearer ${getAccessToken()}`
      }
    });
  }

  return forward(operation);
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, new HttpLink({ uri: url })]),
  cache: new InMemoryCache()
});

const jobDetailFragment = gql`
  fragment JobDetail on Job {
    id
    description
    title
    company {
      name
      id
    }
  }
`;

export const loadJobs = async () => {
  const query = gql`
    query JobPosts {
      jobs {
        id
        title
        company {
          name
          id
        }
      }
    }
  `;

  const {
    data: { jobs }
  } = await client.query({ query, fetchPolicy: 'no-cache' });
  return jobs;
};

export const loadJob = async (jobId) => {
  const query = gql`
    query JobPost($id: ID!) {
      job(id: $id) {
        ...JobDetail
      }
    }
    ${jobDetailFragment}
  `;
  const variables = {
    id: jobId
  };

  const {
    data: { job }
  } = await client.query({ query, variables });
  return job;
};

export const loadCompany = async (companyId) => {
  const query = gql`
    query Company($id: ID!) {
      company(id: $id) {
        id
        name
        description
        jobs {
          id
          title
          company {
            name
          }
        }
      }
    }
  `;
  const variables = {
    id: companyId
  };

  const {
    data: { company }
  } = await client.query({ query, variables });
  return company;
};

export const addJob = async (input) => {
  const mutation = gql`
    mutation CreateJob($input: CreateJobInput) {
      job: createJob(input: $input) {
        ...JobDetail
      }
    }
    ${jobDetailFragment}
  `;
  const variables = {
    input
  };

  const { data: job } = await client.mutate({ mutation, variables });
  return job;
};
