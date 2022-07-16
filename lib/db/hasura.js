/*
This is an example snippet - you should consider tailoring it
to your service.
*/

async function fetchGraphQL(operationsDoc, operationName, variables) {
  const result = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });

  return await result.json();
}

const operationsDoc = `
    query MyQuery {
      users {
        id
        email
        issuer
        publicAddress
      }
      stats {
        favourited
        userId
        videoId
        watched
        id
      }
    }
    mutation MyMutation {
        insert_stats(objects: {favourited: 10, id: 112230, userId: "kimo", videoId: "32", watched: true}) {
          affected_rows
        }
      }
  `;

function fetchMyQuery() {
  return fetchGraphQL(operationsDoc, "MyQuery", {});
}

function executeMyMutation() {
  return fetchGraphQL(operationsDoc, "MyMutation", {});
}

async function startFetchMyQuery() {
  const { errors, data } = await fetchMyQuery();

  if (errors) {
    // handle those errors like a pro
    console.error(errors);
  }

  // do something great with this precious data
  console.log(data);
}