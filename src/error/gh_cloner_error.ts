export default class GhClonerError extends Error {
  constructor(message = 'gh_cloner error.') {
    super(message)
  }
}
