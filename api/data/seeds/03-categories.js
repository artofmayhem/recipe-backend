exports.seed = function(knex) {
    return knex('categories').insert([
      { category_name: 'side'},
      { category_name: 'dinner'}
    ]);
  };
  