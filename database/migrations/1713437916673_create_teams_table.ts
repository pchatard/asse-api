import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'teams'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('id').primary().notNullable()
      table.string('name')
      table.string('code')
      table.string('country')
      table.integer('founded')
      table.string('logo')
    })

    this.schema.createTable('venues', (table) => {
      table.integer('id').primary().notNullable()
      table.integer('team_id').references('id').inTable('teams').onDelete('CASCADE')
      table.string('name')
      table.string('address')
      table.string('city')
      table.integer('capacity')
      table.string('surface')
      table.string('image')
    })
  }

  async down() {
    this.schema.dropTable('venues')
    this.schema.dropTable(this.tableName)
  }
}
