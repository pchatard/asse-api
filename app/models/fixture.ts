import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Venue from './venue.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Team from './team.js'

export default class Fixture extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime()
  declare date: DateTime | null

  @column()
  declare referee: string | null

  @column()
  declare status: string | null

  @column()
  declare venueId: string

  @belongsTo(() => Venue)
  declare venue: BelongsTo<typeof Venue>

  @column()
  declare homeTeamId: string

  @belongsTo(() => Team, { foreignKey: 'homeTeamId' })
  declare homeTeam: BelongsTo<typeof Team>

  @column()
  declare homeGoalsHalfTime: number | null

  @column()
  declare homeGoalsFullTime: number | null

  @column()
  declare homeWinner: boolean | null

  @column()
  declare awayTeamId: string

  @belongsTo(() => Team, { foreignKey: 'awayTeamId' })
  declare awayTeam: BelongsTo<typeof Team>

  @column()
  declare awayGoalsHalfTime: number | null

  @column()
  declare awayGoalsFullTime: number | null

  @column()
  declare awayWinner: boolean | null
}
