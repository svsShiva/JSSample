
const { Octokit, App } = require("octokit");

const getMasterRef =  () => {
    return new Promise((res,rej) => {
        octokit.request('GET /repos/{owner}/{repo}/git/matching-refs/{ref}', {
            owner: 'svsShiva',
            repo: 'JSSample',
            ref: 'heads',
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
        .then((d) => res(d.data))
        .catch((e) => rej(e))
    })
};

const createNewBranch =  (branch, sha) => {
    return new Promise((res,rej) => {
        octokit.request('POST /repos/{owner}/{repo}/git/refs', {
            owner: 'svsShiva',
            repo: 'JSSample',
            ref: 'refs/heads/branch',
            sha: sha,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
        .then((d) => res(d.data))
        .catch((e) => rej(e))
    })
};

const getContent =  () => {
    return new Promise((res,rej) => {
        octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
            owner: 'svsShiva',
            repo: 'JSSample',
            path: 'test.json',
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
        .then((d) => res(d.data))
        .catch((e) => rej(e))
    })
};

const createPullRequest =  (branch) => {
    return new Promise((res,rej) => {
        octokit.request('POST /repos/{owner}/{repo}/pulls', {
            owner: 'svsShiva',
            repo: 'JSSample',
            title: 'Test',
            body: 'Test',
            head: 'svsShiva:branch',
            base: 'master',
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
        })
        .then((d) => res(d.data))
        .catch((e) => rej(e))
    })
};


const updateContent =  (content, branch, sha) => {
    return new Promise((res,rej) => {
        octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
            owner: 'svsShiva',
            repo: 'JSSample',
            path: 'test.json',
            message: 'Update',
            sha: sha,
            branch: branch,
            committer: {
                name: 'svsShiva',
                email: 'svsshivaprasad@gmail.com'
            },
            content: btoa(content),
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
        .then((d) => res(d.data))
        .catch((e) => rej(e))
    })
}

const test = async () => {
    const branch = "addTestscript";
    let sha;
    let content;
    let res = await getMasterRef();
    const masterRef = res.find((r) => r.ref === 'refs/heads/master'); 
    let response = await createNewBranch(branch, masterRef.object.sha);
    let data = await getContent();
    content = atob(data.content);
    sha = data.sha;
    const nData = {
        ...(JSON.parse(content)),
        newField: "new"
    }
    let result = await updateContent(JSON.stringify(nData), branch, sha);
    let finalResult = await createPullRequest(branch);

    console.log(finalResult);
}

test().then().catch()
