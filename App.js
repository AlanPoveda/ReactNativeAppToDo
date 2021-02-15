import React from "react";
import { View, Button, Text, ScrollView, StyleSheet, Switch} from 'react-native'
// é necessário ter um Id para poder deletar! 
let id = 0
// Criando a estilização do aplicativo
const styled = StyleSheet.create({
  todoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appContainer: {
    flex: 1,
    paddingTop: 50,
  },
  fill: {
    flex: 1,
  }
})
// Fazendo com ponente para poder renderizar os todos
const Todo = props => (
    <View style={styled.todoContainer}>
      <Switch value={props.todo.checked} onValueChange={ props.onToggle}/>  
      <Button onPress={props.onDelete} title="delete" />
      <Text>{props.todo.text}</Text>
    </View>
)
// Criando a classe para poder ter mais controle
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: []
    };
  }
  // Tenderizando e adicionando o Tdo para a lsita
  addTodo() {
    id++
    const text = `Todo number ${id}`;
    // necessário para colocar o state novo do id e o conteúdo
    this.setState({
      todos: [...this.state.todos, 
        { id: id, text: text , cheked: false},
      ],
    });
  }
  //Necessário ter o agumento ID para modificar somente esse elemento
  // Filter foi usado por que ele cria uma nova array somente com os elementos que passaram noi teste
  removeTodo(id){
    this.setState({
      todos: this.state.todos.filter( todo => todo.id !== id),
    })
  }
  toggleTodo(id){
    this.setState({
      todos: this.state.todos.map(todo => {
        if(todo.id !== id) return todo
        return {
          id: todo.id,
          text: todo.text,
          checked: !todo.checked,
        }
      })
    })
  }
  render() {
    //todo count use length para saber o tamnaho da Array
    //Esta usando o filter para poder apenas apresentar aqueles que não estao cheked
    return (
      <View 
      style={[styled.appContainer, styled.fill]}>
        <Text>Todo count: {this.state.todos.length}</Text>
        <Text>Unchecked todo count: {this.state.todos.filter(todo => !todo.checked).length}</Text>
        <Button onPress={() => this.addTodo()} title="Add TODO"/>
        <ScrollView styled={styled.fill}>
          {this.state.todos.map(todo => (
            <Todo 
              onToggle={() => this.toggleTodo(todo.id)}
              onDelete={() => this.removeTodo(todo.id)} 
              todo={todo} />
          ))}
        </ScrollView>
      </View>
    );
  }
}