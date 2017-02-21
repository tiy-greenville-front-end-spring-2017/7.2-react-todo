var React = require('react');

var models = require('../models/todo');

class Layout extends React.Component {
  render() {
    console.log(this.props.children)

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>A-Team Todos</h1>

            {this.props.children}

          </div>
        </div>
      </div>
    );
  }
}


// var Layout = React.createClass({
//   render: function(){
//     console.log(this.props.children)
//
//     return (
//       <div className="container">
//         <div className="row">
//           <div className="col-md-12">
//             <h1>A-Team Todos</h1>
//
//             {this.props.children}
//
//           </div>
//         </div>
//       </div>
//     );
//   }
// });


var TodoContainer = React.createClass({
  // componentWillMount: function(){
  //   $.ajax().then(() => {
  //     this.setState({todoCollection: todoCollection});
  //   });
  // },
  getInitialState: function(){
    var todoCollection = new models.TodoCollection();
    var self = this;
    todoCollection.fetch().done(function(){
      //this.forceUpdate();
      self.setState({todoCollection: todoCollection});
    });
    //.bind(this)

    return {
      todoList: todoCollection,
      todoToEdit: null
    };
  },
  addTodo: function(todoItem){
    var todoList = this.state.todoList;
    todoList.create(todoItem);
    this.setState({todoList: todoList});
  },
  render: function(){
    var label = 'Your BA Todo';

    console.log(this.state.todoList);

    return (
      <Layout>
        <TodoForm todoToEdit={this.state.todoToEdit} addTodo={this.addTodo} inputLabel={label} />
        <TodoList todoItems={this.state.todoList}/>
      </Layout>
    );
  }
});

var TodoForm = React.createClass({
  getInitialState: function(){
    var todo = this.props.todoToEdit || {title: ''};

    return todo;
  },
  handleTitleChange: function(event){
    //this.state.title
    this.setState({title: event.target.value});
  },
  addTodo: function(event){
    event.preventDefault();

    this.props.addTodo(this.state);

    this.setState({title: ''});
  },
  render: function(){
    return (
      <form onSubmit={this.addTodo}>
        <div className="form-group">
          <label htmlFor="title">{this.props.inputLabel}</label>
          <input onChange={this.handleTitleChange} value={this.state.title} type="text" className="form-control" id="title" placeholder="Your Todo" />
        </div>

        <input type="submit" className="btn btn-success" value="Add"/>
      </form>
    )
  }
});

var EditButton = React.createClass({
  handleEditTodo: function(event){
    event.preventDefault();

  },
  render: function(){
    return (
      <a onClick={this.handleEditTodo} href="#" className="btn btn-primary">Edit</a>
    );
  }
})

var TodoList = React.createClass({
    render: function(){
      var items = this.props.todoItems.map(function(todo){
        return (
          <li key={todo.cid} className="list-group-item">
            {todo.get('title')} | <EditButton todo={todo}/>
          </li>
        );
      });

      return (
        <div>
          <h2>Team Todos</h2>
          <ul className="list-group">
            {items}
          </ul>
        </div>
      );
    }
});


module.exports = {
  TodoContainer
};
