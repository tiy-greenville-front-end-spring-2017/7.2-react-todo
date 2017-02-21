var Backbone = require('backbone');

var Todo = Backbone.Model.extend({
  idAttribute: '_id',
  defaults: {
    title: ''
  }
});

var TodoCollection = Backbone.Collection.extend({
  model: Todo,
  url: 'https://tiny-lasagna-server.herokuapp.com/collections/todo'
});

module.exports = {
  Todo,
  TodoCollection
};
