
function status (response) {
  if (response.status >= 200 && response.status < 300) {
    console.warn(response)
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

function json (response) {
  return response.json()
}

function extractData (repos) {
  return repos.map(function (r) {
    return { name: r.name, license: r.license, fork: r.fork, url: r.html_url }
  })
}

function getRepos (name, page = 1) {
  const request = new Request(`https://api.github.com/users/${name}/repos?per_page=100&page=${page}`, {
    headers: new Headers({
      'Accept': 'application/vnd.github.drax-preview+json'
    }),
    mode: 'cors'
  })

  return fetch(request)
    .then(status)
    .then(json)
    .then(extractData)
    .catch(function (error) {
      console.log('Request failed', error)
    })
}

function getAllRepos (userName, page = 1, allRepos = []) {
  return getRepos(userName, page).then(repos => {
    allRepos = allRepos.concat(repos)
    if (repos.length === 100) {
      return getAllRepos(userName, page + 1, allRepos)
    } else {
      return allRepos
    }
  })
}

function makeRequest () {
  return fetch('http://httpbin.org/get').then(function (response) {
    return response.json()
  })
}

export {getAllRepos, getRepos, makeRequest}
