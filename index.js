import fetch from 'node-fetch'

// Let's try just a fetch
function getClosedPullRequests(token) {
  return fetch("https://api.github.com/repos/growombud/outside-transform-api/pulls?state=closed", {
    method: 'GET',
    headers: {
      Aceept: 'application/vnd.github.v3+json',
      Authorization: `Bearer ${token}`,
    }
  }).then(data => data.json());
}

export async function getLastMergedPR(ghToken) {
  const fetchPRList = await getClosedPullRequests(ghToken)
  const prList = fetchPRList.map(pr => {
    return {
      branchName: pr.head.ref,
      prNumber: pr.number,
      merged_at: pr.merged_at
    }
  })

  const lastMerged = prList
    .sort((a, b) => {
      const aDate = a.merged_at ? new Date(a.merged_at).getTime() : 0;
      const bDate = b.merged_at ? new Date(b.merged_at).getTime() : 0;

      return bDate - aDate;
    })
    .find((pull) => pull.merged_at);
}
