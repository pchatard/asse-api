import PlayersService from '#services/player_service'
import { inject } from '@adonisjs/core'
import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

export default class FetchPlayers extends BaseCommand {
  static commandName = 'fetch:players'
  static description = 'Fetch team players from Football API'

  static options: CommandOptions = {
    startApp: true,
  }

  @inject()
  async run(playerService: PlayersService) {
    this.logger.info('Fetching team players...')
    await playerService.fetchAndSeedPlayers()
  }
}
