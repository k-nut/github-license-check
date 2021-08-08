function status (response) {
  if (response.status >= 200 && response.status < 300) {
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
    return {name: r.name, license: r.license, fork: r.fork, url: r.html_url}
  })
}

function getRepos (name, page = 1) {
  const url = `https://api.github.com/users/${name}/repos?per_page=100&page=${page}`
  const options = {
    headers: {
      'Accept': 'application/vnd.github.drax-preview+json'
    },
    mode: 'cors'
  }

  return fetch(url, options)
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

export {getAllRepos, getRepos}
