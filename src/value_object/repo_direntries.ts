import fs from 'fs'
import EexistError from '../error/eexist_error'

/**
 * @classdesc
 * repository directory 直下の direntries
 */
export default class RepoDirentries {
  repoName: string
  repoDirentries: Array<fs.Dirent>;

  constructor(repoName: string) {
    this.repoName = repoName
    this.repoDirentries = fs.readdirSync(`./${repoName}`, { withFileTypes: true })
  }

  // existsPrefixWithName? の命名にしたかったが、そのメソッドを使用すると TS1005 のエラーが出るパターンに遭遇したため断念。
  existsDirWithPrefix(prefix: string): boolean | never {
    const direntWithPrefix = this.repoDirentries.filter(dirent => dirent.name === `${prefix}_src`)

    if (direntWithPrefix.length === 0) { return false }

    // mac os の場合、file と directory に対して同じ名前が同時に存在する事は無いので、[0] で取得しても構わない。
    if (direntWithPrefix[0].isFile()) {
      throw new EexistError
    }

    return true
  }
}
