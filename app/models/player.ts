import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Team from './team.js'

export default class Player extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string | null

  @column()
  declare photo: string | null

  @column()
  declare position: string | null

  @column()
  declare age: number | null

  @column()
  declare number: number | null

  @column()
  declare teamId: number

  @belongsTo(() => Team)
  declare team: BelongsTo<typeof Team>
}
