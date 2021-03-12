import fetch from 'node-fetch'

// Let's try just a fetch
function getClosedPullRequests(ghUrl, ghToken) {
  return fetch(ghUrl + "/pulls?state=closed", {
    method: 'GET',
    headers: {
      Aceept: 'application/vnd.github.v3+json',
      Authorization: `Bearer ${ghToken}`,
    }
  }).then(data => data.json());
}

// TODO: expose this in the cli tool
export async function getLastMergedPR(ghOwner, ghRepo) {
  const ghToken = process.env.GH_TOKEN;
  if (!ghToken) {
    // TODO: this error doesn't really help explain how to get the token in the env. Or provide a way to set the token.
    throw new Error("Must provide a GitHub token in the process.env")
  }

  const ghUrl = `https://api.github.com/repos/${ghOwner}/${ghRepo}`
  const fetchPRList = await getClosedPullRequests(ghUrl, ghToken)
  const prList = fetchPRList.map(pr => {
    return {
      branchName: pr.head.ref,
      prNumber: pr.number,
      merged_at: pr.merged_at
    }
  })

  // inspried by https://github.com/intuit/auto/blob/7427c3937186b456a803c26c923aaa905efb8d56/packages/core/src/auto.ts#L859
  const lastMerged = prList
    .sort((a, b) => {
      const aDate = a.merged_at ? new Date(a.merged_at).getTime() : 0;
      const bDate = b.merged_at ? new Date(b.merged_at).getTime() : 0;

      return bDate - aDate;
    })
    .find((pull) => pull.merged_at);

  return lastMerged;
}

export async function getLastMergedPrNumber(ghOwner, ghRepo) {
  const lastMerged = await getLastMergedPR(ghOwner, ghRepo)
  return lastMerged.prNumber;
}
