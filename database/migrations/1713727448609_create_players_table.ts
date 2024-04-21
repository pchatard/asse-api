import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'players'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('id').primary().notNullable()
      table.integer('team_id').references('id').inTable('teams').onDelete('SET NULL')
      table.string('name')
      table.integer('age')
      table.integer('number')
      table.string('position')
      table.string('photo')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
