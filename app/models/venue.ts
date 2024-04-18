import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Team from './team.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Venue extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string | null

  @column()
  declare address: string | null

  @column()
  declare city: string | null

  @column()
  declare capacity: number | null

  @column()
  declare surface: string | null

  @column()
  declare image: string | null

  @column()
  declare teamId: number

  @belongsTo(() => Team)
  declare team: BelongsTo<typeof Team>
}
