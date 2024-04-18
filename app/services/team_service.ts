import { inject } from '@adonisjs/core'
import FootballApiService from './football_api_service.js'
import { ApiTeams } from '#validators/team'
import Venue from '#models/venue'
import Team from '#models/team'

@inject()
export default class TeamsService {
  constructor(protected footballApi: FootballApiService) {}

  /**
   * Fetch teams from API and seed the database with information
   */
  async fetchAndSeedTeams() {
    const teamsAndVenues = await this.footballApi.fetchTeams()

    for (let teamAndVenue of teamsAndVenues) {
      await this.seedTeamAndVenue(teamAndVenue)
    }
  }

  async getTeam(id: number) {
    return Team.query().preload('venues').where('id', id).firstOrFail()
  }

  private async seedTeamAndVenue(teamAndVenue: ApiTeams[number]) {
    const team = await Team.updateOrCreate({ id: teamAndVenue.team.id }, teamAndVenue.team)
    const venue = await Venue.updateOrCreate({ id: teamAndVenue.venue.id }, teamAndVenue.venue)

    await venue.related('team').associate(team)
  }
}
