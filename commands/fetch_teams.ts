import TeamsService from '#services/team_service'
import { inject } from '@adonisjs/core'
import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

export default class FetchTeams extends BaseCommand {
  static commandName = 'fetch:teams'
  static description = 'Fetch teams from Football API'

  static options: CommandOptions = {
    startApp: true,
  }

  @inject()
  async run(teamsService: TeamsService) {
    this.logger.info('Fetching teams...')
    await teamsService.fetchAndSeedTeams()
  }
}
