import FixturesService from '#services/fixture_service'
import { inject } from '@adonisjs/core'

@inject()
export default class FixturesController {
  constructor(protected fixturesService: FixturesService) {}

  async index() {
    return await this.fixturesService.getFixtures()
  }
}
