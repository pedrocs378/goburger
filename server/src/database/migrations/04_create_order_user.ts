import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('order_user', table => {
        table.increments('id').primary()

        table
            .integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
            
        table.double('discount')
        table.double('delivery_fee').notNullable()
        table.double('subtotal').notNullable()
        table.double('total').notNullable()
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('order_user')
}