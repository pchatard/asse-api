// import type { HttpContext } from '@adonisjs/core/http'

import PlayersService from '#services/player_service'
import { inject } from '@adonisjs/core'

@inject()
export default class PlayersController {
  constructor(protected playerService: PlayersService) {}

  async index() {
    return await this.playerService.getPlayers()
  }
}
