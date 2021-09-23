import GhClonerError from './gh_cloner_error'

export default class EexistError extends GhClonerError {
  constructor(message = 'srcDir と同名のファイルが既に存在します。不要なファイルならば削除後に、再度 gh_cloner を実行して下さい。') {
    super(message)
  }
}
