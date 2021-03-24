exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (table) => {
      table.increments('user_id')
      table.string('user_username', 200).notNullable()
      table.string('user_password', 200).notNullable()
      table.string('user_email', 320).notNullable()
      table.timestamps(false, true)
    })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('users')
}
