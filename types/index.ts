export interface PackageType {
  name: string
  full_name: string
  homepage: string
  desc: string
  version: string
  github_repo_url: string
  github_repo_api_url: string
  slug: string
  is_bountea_registered: boolean
  bountea: number
}

export interface RepoDetailsType {
  id: number
  name: string
  description: string // description
  owner_name: string
  owner_picture_url: string
  open_issues_count: number // open_issues_count
  stargazers_count: number // stargazers_count
  watch_count: number // subscribers_count
  tags: string[] // topics[], language
  pushed_at: string
}
// {
//   id: 6238422,
//   node_id: 'MDEwOlJlcG9zaXRvcnk2MjM4NDIy',
//   name: 'abcm2ps',
//   full_name: 'lewdlime/abcm2ps',
//   private: false,
//   owner: {
//     login: 'lewdlime',
//     id: 1916661,
//     node_id: 'MDQ6VXNlcjE5MTY2NjE=',
//     avatar_url: 'https://avatars.githubusercontent.com/u/1916661?v=4',
//   },
//   html_url: 'https://github.com/lewdlime/abcm2ps',
//   description: 'abcm2ps is a command line program which converts ABC to music sheet in PostScript or SVG format. It is an extension of abc2ps which may handle many voices per staff. abcm2ps is Copyright © 2014-2016 Jean-Francois Moine.',
//   fork: false,
//   homepage: 'http://moinejf.free.fr/',
//   size: 3013,
//   stargazers_count: 62,
//   language: 'C',

//   forks_count: 27,
//   mirror_url: null,
//   archived: false,
//   disabled: false,
//   open_issues_count: 32,
//   topics: [],
//   visibility: 'public',
//   forks: 27,
//   open_issues: 32,
//   watchers: 62,
//   default_branch: 'master',
//   permissions: {
//     admin: false,
//     maintain: false,
//     push: false,
//     triage: false,
//     pull: true
//   },
//   temp_clone_token: '',
//   network_count: 27,
//   subscribers_count: 10
// }
