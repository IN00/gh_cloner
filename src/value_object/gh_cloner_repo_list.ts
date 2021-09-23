import fs from 'fs'
import InvalidRepoFormatError from '../error/invalid_repo_format_error'

export default class GhClonerRepoList {
  srcDirPrefix: 'gem' | 'lib'
  repos: string[] // ['in00/value_todo', 'typescript/typescript', ...]

  constructor() {
    const fileText: string = fs.readFileSync(`${GhClonerRepoList.GH_CLONER_REPO_LIST_FILE_NAME}`, 'utf8')
    const ghClonerRepoList = JSON.parse(fileText) as GhClonerRepoList

    this.checkRepoFormat(ghClonerRepoList.repos)
    this.repos = ghClonerRepoList.repos
    this.srcDirPrefix = ghClonerRepoList.srcDirPrefix
  }

  static readonly GH_CLONER_REPO_LIST_FILE_NAME = 'gh_cloner_repo_list.json'
  static readonly REPO_AUTHOR_AND_SLASH_REG_EXP = /^[^/]*\//

  getRepoNames(): string[] { return this.repos.map(repo => this.getRepoName(repo)) }

  getRepoName(repo: string): string { return repo.replace(GhClonerRepoList.REPO_AUTHOR_AND_SLASH_REG_EXP, '') }

  private checkRepoFormat(repos: GhClonerRepoList['repos']): void | never {
    if (repos.every(repo => repo.match(GhClonerRepoList.REPO_AUTHOR_AND_SLASH_REG_EXP))) {
      return
    }

    throw new InvalidRepoFormatError
  }
}
