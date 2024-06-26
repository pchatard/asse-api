import TeamsService from '#services/team_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class TeamsController {
  constructor(protected teamService: TeamsService) {}

  async show({ params }: HttpContext) {
    return await this.teamService.getTeam(params.id)
  }
}
