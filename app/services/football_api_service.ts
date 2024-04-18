import env from '#start/env'
import { ApiStandings, standingsValidator } from '#validators/standing'
import { ApiTeams, teamsValidator } from '#validators/team'
import logger from '@adonisjs/core/services/logger'

type FootballApiResponse = {
  response: any
}

export default class FootballApiService {
  private async fetch(endpoint: string) {
    try {
      const response = await fetch(`${env.get('FOOTBALL_API_ENDPOINT')}/${endpoint}`, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': env.get('FOOTBALL_API_KEY'),
        },
      })
      const jsonResponse = (await response.json()) as FootballApiResponse
      if (jsonResponse) return jsonResponse
      else return null
    } catch (error) {
      throw new Error()
    }
  }

  /**
   * Fetch teams from API for a given league and a given season
   */
  async fetchTeams(): Promise<ApiTeams> {
    const leagueId = env.get('FOOTBALL_API_LEAGUE_ID')
    const season = env.get('FOOTBALL_API_SEASON')
    logger.info(`Fetching teams for league ${leagueId} in season ${season}...`)

    const teamsData = await this.fetch(`/teams?league=${leagueId}&season=${season}`)
    return await teamsValidator.validate(teamsData?.response)
  }

  /**
   * Fetch teams from API for a given league and a given season
   */
  async fetchStandings(): Promise<ApiStandings> {
    const leagueId = env.get('FOOTBALL_API_LEAGUE_ID')
    const season = env.get('FOOTBALL_API_SEASON')
    logger.info(`Fetching standings for league ${leagueId} in season ${season}...`)

    const standingsData = await this.fetch(`/standings?league=${leagueId}&season=${season}`)
    return await standingsValidator.validate(standingsData?.response[0].league.standings[0])
  }
}
