import FixturesService from '#services/fixture_service'
import { inject } from '@adonisjs/core'
import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

export default class FetchFixtures extends BaseCommand {
  static commandName = 'fetch:fixtures'
  static description = 'Fetch fixtures from Football API'

  static options: CommandOptions = {
    startApp: true,
  }

  @inject()
  async run(fixtureService: FixturesService) {
    this.logger.info('Fetching fixtures...')
    await fixtureService.fetchAndSeedFixtures()
  }
}
