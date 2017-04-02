<template>
  <div class="content">
    <h1>License Check</h1>
    <p> 👋 Hello, we're so glad you stopped by! <br />
      You know that your github repos should have a license so that other people can reuse your code but
        you want to know where licenses are currently missing? Just enter your name and check!
    </p>
    <p>
      Why is this important? <a href="https://blog.codinghorror.com/pick-a-license-any-license/">Jeff Atwood wrote it down once</a>
    </p>
    <p>
      Don't know which license is the right one for you? Head over to <a href="https://choosealicense.com/">choosealicense.com</a>
    </p>
    <p>
      But for now, just enter your name below and find out how good you are doing!
    </p>
    <form v-on:submit="query" action="">
      <input v-model="userName" placeholder="Your github username" />
      <button type="submit">Check</button>
    </form>
    <div v-if="repos.length">
      <div class="statistics">
        You have {{ repos.length }} repositories on github. <br>
        Out of those {{ licensedCount }} have a license. That is {{ licensedPercentage }} %.
      </div>
      <table>
        <thead>
          <tr>
            <th v-on:click="changeSort('name')">Name</th>
            <th v-on:click="changeSort('fork')">Fork?</th>
            <th v-on:click="changeSort('license')">Licensed?</th>
            <th v-on:click="changeSort('license.name')">License</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="repo in sortedRepos">
            <td><a v-bind:href="repo.url">{{ repo.name }}</a> </td>
            <td>{{ repo.fork ? "🍴" : ""}}</td>
            <td>{{ repo.license ? "✅" : "❌" }}</td>
            <td>{{ repo.license? repo.license.name : "no license" }} </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import _ from 'lodash'

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

export default {
  data () {
    return {
      repos: [],
      userName: '',
      sortBy: { key: name, reverse: false }
    }
  },
  methods: {
    query (event) {
      event.preventDefault()
      getAllRepos(this.userName).then(repos => {
        this.repos = repos
      })
    },
    changeSort (name) {
      let reverse = false
      if (this.sortBy.key === name) {
        reverse = !this.sortBy.reverse
      }
      this.sortBy = { key: name, reverse }
    }
  },
  computed: {
    licensedCount () { return this.repos.filter(r => r.license).length },
    licensedPercentage () {
      const licensedCount = this.repos.filter(r => r.license).length
      const totalCount = this.repos.length
      const ratio = licensedCount / totalCount
      return Math.round(ratio * 100)
    },
    sortedRepos () {
      let sorted = _.sortBy(this.repos, this.sortBy.key)
      if (this.sortBy.reverse) {
        sorted = sorted.reverse()
      }

      return sorted
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@media (min-width: 700px)
  .content
    width: 700px
    margin: 0 auto

p
  text-align: left

h1, h2
  font-weight: normal;

table
  width: 100%
  margin: 0 auto;

  td:first-child, th:first-child
    text-align: left;
    a
      text-decoration: none
      color: #2c3e50

  td:last-child, th:last-child
    text-align: right

  tr:nth-child(even)
    background: rgba(228, 228, 228, 0.54)

table, tr, td
  border-collapse: collapse

button, input
  font-size: 1.6em
</style>
