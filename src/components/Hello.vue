<template>
  <div class="content">
    <h1>License Check </h1>
    <p> 👋 Hello, we're so glad you stopped by! </p>
    <p>
      You know that your github repos should have a license so that other people can reuse your code but
        you're not sure if you actually added one for all of your repositories? Just enter your name and check!
    </p>

    <form v-on:submit="query" action="">
      <input v-model="userName" placeholder="Your github username" />
      <button type="submit">Check</button>
    </form>
    <div v-if="repos.length">
      <div class="statistics">
        You have <b>{{ repos.length }}</b> repositories on GitHub. <br>
        Out of those <b>{{ licensedCount }}</b> have a license. That is <b>{{ licensedPercentage }}</b>%.
      </div>
      <table>
        <thead>
          <tr>
            <th v-on:click="changeSort('name')" title="Click to sort by name">Name</th>
            <th v-on:click="changeSort('fork')" title="Click to sort by fork or not">Fork?<sup>*</sup></th>
            <th v-on:click="changeSort('license')" title="Click to sort by license">Licensed?</th>
            <th v-on:click="changeSort('license.name')" title="Click to sort by license name">License</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="repo in sortedRepos">
            <td><a v-bind:href="repo.url">{{ repo.name }}</a> </td>
            <td>{{ repo.fork ? "🍴" : ""}}</td>
            <td>{{ repo.license ? "✅" : "❌" }}</td>
            <td>
              <span v-if="repo.license">{{repo.license.name}}</span>
              <a v-else
                 v-bind:href="'https://github.com/' + userName + '/' + repo.name  + '/new/master/?filename=LICENSE.txt&value=Copyright%20%3CYEAR%3E%20%3CCOPYRIGHT%20HOLDER%3E%0A%0APermission%20is%20hereby%20granted%2C%20free%20of%20charge%2C%20to%20any%20person%20obtaining%20a%20copy%20of%20this%20software%20and%20associated%20documentation%20files%20(the%20%22Software%22)%2C%20to%20deal%20in%20the%20Software%20without%20restriction%2C%20including%20without%20limitation%20the%20rights%20to%20use%2C%20copy%2C%20modify%2C%20merge%2C%20publish%2C%20distribute%2C%20sublicense%2C%20and%2For%20sell%20copies%20of%20the%20Software%2C%20and%20to%20permit%20persons%20to%20whom%20the%20Software%20is%20furnished%20to%20do%20so%2C%20subject%20to%20the%20following%20conditions%3A%0A%0AThe%20above%20copyright%20notice%20and%20this%20permission%20notice%20shall%20be%20included%20in%20all%20copies%20or%20substantial%20portions%20of%20the%20Software.%0A%0ATHE%20SOFTWARE%20IS%20PROVIDED%20%22AS%20IS%22%2C%20WITHOUT%20WARRANTY%20OF%20ANY%20KIND%2C%20EXPRESS%20OR%20IMPLIED%2C%20INCLUDING%20BUT%20NOT%20LIMITED%20TO%20THE%20WARRANTIES%20OF%20MERCHANTABILITY%2C%20FITNESS%20FOR%20A%20PARTICULAR%20PURPOSE%20AND%20NONINFRINGEMENT.%20IN%20NO%20EVENT%20SHALL%20THE%20AUTHORS%20OR%20COPYRIGHT%20HOLDERS%20BE%20LIABLE%20FOR%20ANY%20CLAIM%2C%20DAMAGES%20OR%20OTHER%20LIABILITY%2C%20WHETHER%20IN%20AN%20ACTION%20OF%20CONTRACT%2C%20TORT%20OR%20OTHERWISE%2C%20ARISING%20FROM%2C%20OUT%20OF%20OR%20IN%20CONNECTION%20WITH%20THE%20SOFTWARE%20OR%20THE%20USE%20OR%20OTHER%20DEALINGS%20IN%20THE%20SOFTWARE.&message=add%20MIT%20License'"
                 >click to add</a>
            </td>
          </tr>
        </tbody>
      </table>
      <div style="text-align: left; margin-top: 1em">
        <b>*</b> note that GitHub currently has some problems classifying the license for forks so this might not be accurate.
      </div>
    </div>

    <div class="disclaimer">
      <hr/>

      <p>
        Why is this important? <a href="https://blog.codinghorror.com/pick-a-license-any-license/">Jeff Atwood wrote it down once.</a>
      </p>

      <p>
        Don't know which license is the right one for you? Head over to <a href="https://choosealicense.com/">choosealicense.com</a>
      </p>

      <p>
      We use unauthenticated requests against the GitHub API. This means that you are only allowed to make 60 requests
      per hour and IP address.
      </p>

      <p> The actual license checking is done with GitHub's <a href="https://developer.github.com/v3/licenses/">license api</a>
      so we are only able to tell you about licenses that GitHub understands.</p>

      <p> The source code for this page can be found on <a href="https://github.com/k-nut/github-license-check">GitHub</a>.
        And yes, it has a <a href="https://github.com/k-nut/github-license-check/blob/master/LICENSE.txt">license</a> 😉
      </p>
    </div>

  </div>
</template>

<script>
import _ from 'lodash'
import { getAllRepos } from '../api'

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

@media (max-width: 700px)
  td:first-child
    max-width: 100px
    word-wrap: break-word

p
  text-align: left

h1, h2
  font-weight: normal;

th
  cursor: pointer

.statistics
  margin: 1rem 0
  text-align: left

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

.disclaimer
  margin-top: 5rem
</style>
