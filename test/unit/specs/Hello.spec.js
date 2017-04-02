// import Vue from 'vue'
import { getRepos } from '@/api'
import 'whatwg-fetch/fetch.js'
import fetchMock from 'fetch-mock'
fetchMock.setImplementations({Promise: require('es6-promise').Promise})

// describe('Hello.vue', () => {
//   it('should render correct contents', () => {
//     const Constructor = Vue.extend(Hello)
//     const vm = new Constructor().$mount()
//     expect(vm.$el.querySelector('.content h1').textContent)
//       .to.equal('License Check')
//   })
// })

describe('API', () => {
  // let sandbox
  // beforeEach(() => {
  //   sandbox = sinon.sandbox.create()
  // })
  // afterEach(() => {
  //   sandbox.restore()
  //   fetchMock.restore()
  // })

  it('getRepos should convert github response', () => {
    const mockResponse = [
      {
        'id': 26601161,
        'name': 'agents',
        'full_name': 'k-nut/agents',
        'owner': {
          'login': 'k-nut',
          'id': 1096357,
          'avatar_url': 'https://avatars2.githubusercontent.com/u/1096357?v=3',
          'gravatar_id': '',
          'url': 'https://api.github.com/users/k-nut',
          'html_url': 'https://github.com/k-nut',
          'followers_url': 'https://api.github.com/users/k-nut/followers',
          'following_url': 'https://api.github.com/users/k-nut/following{/other_user}',
          'gists_url': 'https://api.github.com/users/k-nut/gists{/gist_id}',
          'starred_url': 'https://api.github.com/users/k-nut/starred{/owner}{/repo}',
          'subscriptions_url': 'https://api.github.com/users/k-nut/subscriptions',
          'organizations_url': 'https://api.github.com/users/k-nut/orgs',
          'repos_url': 'https://api.github.com/users/k-nut/repos',
          'events_url': 'https://api.github.com/users/k-nut/events{/privacy}',
          'received_events_url': 'https://api.github.com/users/k-nut/received_events',
          'type': 'User',
          'site_admin': false
        },
        'private': false,
        'html_url': 'https://github.com/k-nut/agents',
        'description': 'Various JADE-based agents written for university',
        'fork': false,
        'url': 'https://api.github.com/repos/k-nut/agents',
        'forks_url': 'https://api.github.com/repos/k-nut/agents/forks',
        'keys_url': 'https://api.github.com/repos/k-nut/agents/keys{/key_id}',
        'collaborators_url': 'https://api.github.com/repos/k-nut/agents/collaborators{/collaborator}',
        'teams_url': 'https://api.github.com/repos/k-nut/agents/teams',
        'hooks_url': 'https://api.github.com/repos/k-nut/agents/hooks',
        'issue_events_url': 'https://api.github.com/repos/k-nut/agents/issues/events{/number}',
        'events_url': 'https://api.github.com/repos/k-nut/agents/events',
        'assignees_url': 'https://api.github.com/repos/k-nut/agents/assignees{/user}',
        'branches_url': 'https://api.github.com/repos/k-nut/agents/branches{/branch}',
        'tags_url': 'https://api.github.com/repos/k-nut/agents/tags',
        'blobs_url': 'https://api.github.com/repos/k-nut/agents/git/blobs{/sha}',
        'git_tags_url': 'https://api.github.com/repos/k-nut/agents/git/tags{/sha}',
        'git_refs_url': 'https://api.github.com/repos/k-nut/agents/git/refs{/sha}',
        'trees_url': 'https://api.github.com/repos/k-nut/agents/git/trees{/sha}',
        'statuses_url': 'https://api.github.com/repos/k-nut/agents/statuses/{sha}',
        'languages_url': 'https://api.github.com/repos/k-nut/agents/languages',
        'stargazers_url': 'https://api.github.com/repos/k-nut/agents/stargazers',
        'contributors_url': 'https://api.github.com/repos/k-nut/agents/contributors',
        'subscribers_url': 'https://api.github.com/repos/k-nut/agents/subscribers',
        'subscription_url': 'https://api.github.com/repos/k-nut/agents/subscription',
        'commits_url': 'https://api.github.com/repos/k-nut/agents/commits{/sha}',
        'git_commits_url': 'https://api.github.com/repos/k-nut/agents/git/commits{/sha}',
        'comments_url': 'https://api.github.com/repos/k-nut/agents/comments{/number}',
        'issue_comment_url': 'https://api.github.com/repos/k-nut/agents/issues/comments{/number}',
        'contents_url': 'https://api.github.com/repos/k-nut/agents/contents/{+path}',
        'compare_url': 'https://api.github.com/repos/k-nut/agents/compare/{base}...{head}',
        'merges_url': 'https://api.github.com/repos/k-nut/agents/merges',
        'archive_url': 'https://api.github.com/repos/k-nut/agents/{archive_format}{/ref}',
        'downloads_url': 'https://api.github.com/repos/k-nut/agents/downloads',
        'issues_url': 'https://api.github.com/repos/k-nut/agents/issues{/number}',
        'pulls_url': 'https://api.github.com/repos/k-nut/agents/pulls{/number}',
        'milestones_url': 'https://api.github.com/repos/k-nut/agents/milestones{/number}',
        'notifications_url': 'https://api.github.com/repos/k-nut/agents/notifications{?since,all,participating}',
        'labels_url': 'https://api.github.com/repos/k-nut/agents/labels{/name}',
        'releases_url': 'https://api.github.com/repos/k-nut/agents/releases{/id}',
        'deployments_url': 'https://api.github.com/repos/k-nut/agents/deployments',
        'created_at': '2014-11-13T18:19:50Z',
        'updated_at': '2014-12-08T17:04:33Z',
        'pushed_at': '2014-12-08T17:04:33Z',
        'git_url': 'git://github.com/k-nut/agents.git',
        'ssh_url': 'git@github.com:k-nut/agents.git',
        'clone_url': 'https://github.com/k-nut/agents.git',
        'svn_url': 'https://github.com/k-nut/agents',
        'homepage': null,
        'size': 11980,
        'stargazers_count': 0,
        'watchers_count': 0,
        'language': 'Java',
        'has_issues': true,
        'has_projects': true,
        'has_downloads': true,
        'has_wiki': true,
        'has_pages': false,
        'forks_count': 0,
        'mirror_url': null,
        'open_issues_count': 0,
        'forks': 0,
        'open_issues': 0,
        'watchers': 0,
        'default_branch': 'master',
        'license': null
      }]

    fetchMock.mock('https://api.github.com/users/testuser/repos?per_page=100&page=1', mockResponse)
    return getRepos('testuser').then(result => {
      console.log(result)
      return result.should.deep.equal([{
        name: 'agents',
        license: null,
        url: 'https://github.com/k-nut/agents',
        fork: false
      }])
    }
    )
  })
})
