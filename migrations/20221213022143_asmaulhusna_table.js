/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('asmaulhusnas', table => {
        table.increments()
        table.string('asma')
        table.string('meaning')
        table.timestamps(true, true)

    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('asmaulhusnas')
};
