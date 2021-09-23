import GhClonerRepoList from '../value_object/gh_cloner_repo_list'
import GhClonerError from './gh_cloner_error'

export default class InvalidRepoFormatError extends GhClonerError {
  constructor(message = `${GhClonerRepoList.GH_CLONER_REPO_LIST_FILE_NAME} に書かれた、repo の書式が正しくありません。オーサー名/リポジトリ名 の書式を記述して下さい。`) {
    super(message)
  }
}
