import StandingsService from '#services/standing_service'
import { inject } from '@adonisjs/core'
import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

export default class FetchStandings extends BaseCommand {
  static commandName = 'fetch:standings'
  static description = 'Fetch standings from Football API'

  static options: CommandOptions = {
    startApp: true,
  }

  @inject()
  async run(standingsService: StandingsService) {
    this.logger.info('Fetching standings...')
    await standingsService.fetchAndSeedStandings()
  }
}
