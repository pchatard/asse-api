import env from '#start/env'
import { ApiFixtures, fixturesValidator } from '#validators/fixture'
import { ApiPlayers, playersValidator } from '#validators/player'
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

  /**
   * Fetch players from API for a given team, league and a given season
   */
  async fetchTeamPlayers(): Promise<ApiPlayers> {
    const teamId = env.get('FOOTBALL_API_TEAM_ID')
    logger.info(`Fetching players for team ${teamId}...`)

    const playersData = await this.fetch(`/players/squads?team=${teamId}`)
    return await playersValidator.validate(playersData?.response[0].players)
  }

  /**
   * Fetch fixtures from API for a given team, league and a given season
   */
  async fetchFixtures(): Promise<ApiFixtures> {
    const teamId = env.get('FOOTBALL_API_TEAM_ID')
    const leagueId = env.get('FOOTBALL_API_LEAGUE_ID')
    const season = env.get('FOOTBALL_API_SEASON')
    logger.info(`Fetching fixtures for team ${teamId}, league ${leagueId} in season ${season}...`)

    const fixturesData = await this.fetch(
      `/fixtures?league=${leagueId}&season=${season}&team=${teamId}`
    )
    return await fixturesValidator.validate(fixturesData?.response)
  }
}
