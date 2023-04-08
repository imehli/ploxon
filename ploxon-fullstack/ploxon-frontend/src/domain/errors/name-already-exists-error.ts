export class NameExistError extends Error {
  constructor () {
    super('This name already exists')
    this.name = 'NameExistError'
  }
}
