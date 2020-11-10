import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('cart_user', table => {
        table.increments('id').primary()

        table
            .integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')

        table
            .integer('burger_id')
            .notNullable()
            .references('id')
            .inTable('burgers')

        table.integer('amount').notNullable()
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('cart_user')
}