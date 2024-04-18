import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'standings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('rank').primary().notNullable()
      table.integer('team_id').references('id').inTable('teams').onDelete('SET NULL')
      table.integer('points')
      table.integer('goals_diff')
      table.string('group')
      table.string('form')
      table.string('status')
      table.string('description')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
