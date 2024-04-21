import { inject } from '@adonisjs/core'
import FootballApiService from './football_api_service.js'
import TeamsService from './team_service.js'
import Fixture from '#models/fixture'
import { ApiFixtures } from '#validators/fixture'
import { DateTime } from 'luxon'
import Venue from '#models/venue'

@inject()
export default class FixturesService {
  constructor(
    protected footballApi: FootballApiService,
    protected teamService: TeamsService
  ) {}

  async getFixtures() {
    return await Fixture.query()
      .preload('venue')
      .preload('homeTeam')
      .preload('awayTeam')
      .orderBy('date', 'asc')
  }

  async fetchAndSeedFixtures() {
    const fixtures = await this.footballApi.fetchFixtures()

    for (let fixture of fixtures) {
      await this.updateFixture(fixture)
    }
  }

  private async updateFixture(apiFixture: ApiFixtures[number]) {
    const newFixture = {
      id: apiFixture.fixture.id,
      referee: apiFixture.fixture.referee,
      date: apiFixture.fixture.date ? DateTime.fromISO(apiFixture.fixture.date) : null,
      status: apiFixture.fixture.status.short,
      homeGoalsHalfTime: apiFixture.score.halftime.home,
      homeGoalsFullTime: apiFixture.score.fulltime.home,
      homeWinner: apiFixture.teams.home.winner,
      awayGoalsHalfTime: apiFixture.score.halftime.away,
      awayGoalsFullTime: apiFixture.score.fulltime.away,
      awayWinner: apiFixture.teams.away.winner,
    }

    const fixture = await Fixture.updateOrCreate({ id: apiFixture.fixture.id }, newFixture)

    const venue = await Venue.query().where('id', apiFixture.fixture.venue.id).first()
    if (venue) {
      await fixture.related('venue').associate(venue)
    }
    const homeTeam = await this.teamService.getTeam(apiFixture.teams.home.id)
    if (homeTeam) {
      await fixture.related('homeTeam').associate(homeTeam)
    }
    const awayTeam = await this.teamService.getTeam(apiFixture.teams.away.id)
    if (awayTeam) {
      await fixture.related('awayTeam').associate(awayTeam)
    }
  }
}
