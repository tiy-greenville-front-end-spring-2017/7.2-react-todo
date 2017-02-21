var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var TodoContainer = require('./components/todo.jsx').TodoContainer;

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index'
  },
  index: function(){
    ReactDOM.render(
      React.createElement(TodoContainer),
      document.getElementById('app')
    );
  }
});

var appRouter = new AppRouter();

module.exports = appRouter;
