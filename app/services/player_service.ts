import { inject } from '@adonisjs/core'
import FootballApiService from './football_api_service.js'
import TeamsService from './team_service.js'
import { ApiPlayers } from '#validators/player'
import env from '#start/env'
import Player from '#models/player'

@inject()
export default class PlayersService {
  constructor(
    protected footballApi: FootballApiService,
    protected teamService: TeamsService
  ) {}

  async getPlayers() {
    return await Player.query()
  }

  async fetchAndSeedPlayers() {
    const players = await this.footballApi.fetchTeamPlayers()

    for (let player of players) {
      await this.updatePlayer(player)
    }
  }

  private async updatePlayer(apiPlayer: ApiPlayers[number]) {
    const team = await this.teamService.getTeam(env.get('FOOTBALL_API_TEAM_ID'))
    const player = await Player.updateOrCreate({ id: apiPlayer.id }, apiPlayer)

    await player.related('team').associate(team)
  }
}
