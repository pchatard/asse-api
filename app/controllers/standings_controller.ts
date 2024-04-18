import StandingsService from '#services/standing_service'
import { inject } from '@adonisjs/core'

@inject()
export default class StandingsController {
  constructor(protected service: StandingsService) {}

  async index() {
    return await this.service.getStandings()
  }
}
