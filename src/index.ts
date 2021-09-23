import childProcess from 'child_process'
import GhClonerRepoList from './value_object/gh_cloner_repo_list'
import CurrentDirectory from './value_object/current_direntries'

/**
 * @description
 * repoNames を取得し、
 * それぞれの repoName に対応する、directory が無ければ、clone
 * それぞれの repoName に対応する、directory が既にあれば、その直下に srcDir がある事を確認し、あれば clone。無ければ何もしない。
 */ 
const execute = (): void => {
  const ghClonerRepoList = new GhClonerRepoList
  const srcDirPrefix = ghClonerRepoList.srcDirPrefix
  const repos = ghClonerRepoList.repos
  const repoNames = ghClonerRepoList.getRepoNames()
  const currentDirectory = new CurrentDirectory(repoNames)

  repos.forEach(repo => {
    const repoName = ghClonerRepoList.getRepoName(repo)
    const repoDirentries = currentDirectory
      .repoDirentriesCollection
      .find(repoDirentries => repoDirentries.repoName === repoName)

    if (repoDirentries === undefined) {
      childProcess.execSync(`mkdir ${repoName}`)
      childProcess.execSync(`git clone https://github.com/${repo} ./${repoName}/${srcDirPrefix}_src`)

      return
    }

    if (repoDirentries.existsDirWithPrefix(srcDirPrefix)) {
      return
    }

    childProcess.execSync(`git clone https://github.com/${repo} ./${repoName}/${srcDirPrefix}_src`)
  })
}

export default execute
