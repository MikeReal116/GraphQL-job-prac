const url = 'http://localhost:9000/graphql';

const fetchGraphql = async (query, variables = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query,
      variables
    })
  });

  const responseBody = await response.json();
  if (responseBody.errors) {
    const errMsg = responseBody.errors.map((error) => error.message).join('\n');
    throw new Error(errMsg);
  }
  return responseBody.data;
};

export const loadJobs = async () => {
  const query = ` 
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

  const { jobs } = await fetchGraphql(query);
  return jobs;
};

export const loadJob = async (jobId) => {
  const query = `
                query JobPost($id: ID!){
                    job(id: $id) {
                        id
                        title
                        description
                        company {
                            id
                            name
                        }  
                    }
                }
            `;
  const variables = {
    id: jobId
  };

  const { job } = await fetchGraphql(query, variables);
  return job;
};

export const loadCompany = async (companyId) => {
  const query = `
      query Company ($id: ID!){
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

  const { company } = await fetchGraphql(query, variables);
  return company;
};
