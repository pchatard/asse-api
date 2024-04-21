import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'fixtures'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('id').primary().notNullable()

      table.datetime('date')
      table.string('referee')
      table.integer('venue_id').references('id').inTable('venues').onDelete('SET NULL')
      table.string('status')

      table.integer('home_team_id').references('id').inTable('teams').onDelete('SET NULL')
      table.integer('home_goals_half_time')
      table.integer('home_goals_full_time')
      table.boolean('home_winner').nullable()
      table.integer('away_team_id').references('id').inTable('teams').onDelete('SET NULL')
      table.integer('away_goals_half_time')
      table.integer('away_goals_full_time')
      table.boolean('away_winner').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
