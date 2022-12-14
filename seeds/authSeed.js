var bcrypt = require('bcryptjs')
require('dotenv').config()

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  const data = {
    email: `${process.env.SEED_AUTH_EMAIL}`,
    password: `${process.env.SEED_AUTH_PASSWORD}`
  }
  
  const salt = bcrypt.genSaltSync(10)
  const passwordHash = bcrypt.hashSync(data.password, salt)

  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, email: data.email, password: passwordHash},
  ]);
};
