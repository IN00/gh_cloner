import fs from 'fs'
import RepoDirentries from './repo_direntries'

/**
 * @classdesc
 * gh_cloner 実行時の current directory
 */
export default class CurrentDirectory {
  repoDirentriesCollection: Array<RepoDirentries>

  constructor(repoNames: string[]) {
    const childDirectoriesWithRepoName = fs.readdirSync('./', { withFileTypes: true })
      .filter(dirent => dirent.isDirectory() && this.existsDirentNamedRepoName(repoNames, dirent))
      .map(dirent => dirent.name)

    this.repoDirentriesCollection = childDirectoriesWithRepoName.map(name => new RepoDirentries(name))
  }

  private existsDirentNamedRepoName = (repoNames: string[], dirent: fs.Dirent) => repoNames.some(repoName => repoName === dirent.name)
}
