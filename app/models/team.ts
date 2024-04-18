import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Venue from './venue.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
// import Venue from './venue.js'
// import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Team extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @hasMany(() => Venue)
  declare venues: HasMany<typeof Venue>

  @column()
  declare name: string | null

  @column()
  declare code: string | null

  @column()
  declare founded: number | null

  @column()
  declare country: string | null

  @column()
  declare logo: string | null
}
