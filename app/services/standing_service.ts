import { inject } from '@adonisjs/core'
import FootballApiService from './football_api_service.js'
import { ApiStandings } from '#validators/standing'
import TeamsService from './team_service.js'
import Standing from '#models/standing'

@inject()
export default class StandingsService {
  constructor(
    protected footballApi: FootballApiService,
    protected teamService: TeamsService
  ) {}

  async getStandings() {
    return await Standing.query().preload('team', (builder) => builder.preload('venues'))
  }

  async fetchAndSeedStandings() {
    const standings = await this.footballApi.fetchStandings()

    for (let standing of standings) {
      await this.updateStanding(standing)
    }
  }

  private async updateStanding(apiStanding: ApiStandings[number]) {
    const team = await this.teamService.getTeam(apiStanding.team.id)
    const standing = await Standing.updateOrCreate({ rank: apiStanding.rank }, apiStanding)

    await standing.related('team').associate(team)
  }
}
