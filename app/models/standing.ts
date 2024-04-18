import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Team from './team.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Standing extends BaseModel {
  @column({ isPrimary: true })
  declare rank: number

  @column()
  declare teamId: number | null

  @belongsTo(() => Team)
  declare team: BelongsTo<typeof Team>

  @column()
  declare points: number | null

  @column()
  declare goalsDiff: number | null

  @column()
  declare group: string | null

  @column()
  declare form: string | null

  @column()
  declare status: string | null

  @column()
  declare description: string | null
}
