import Knex from 'knex'

export async function up(knex: Knex) {
    return knex.schema.createTable('burgers', table => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.string('url_image').notNullable()
        table.string('price').notNullable()
        table.boolean('offer').notNullable()
        table.string('ingredients').notNullable()
        table.boolean('available').notNullable()
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('burgers')
}