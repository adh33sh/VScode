import React, { useEffect, useState} from 'react';
import Todo from './Todo';
import { Button, FormControl, Input, InputLabel} from '@material-ui/core';
import './App.css';
import db from './firebase';
import firebase from 'firebase';


function App() {
  const[todos,setTodos] = useState([]);
  const[input,setInput] = useState('');

  //when the app loads, we need to listen to the database and fetch new todos as they get added/removed
  //useEffect wil take (functions,dependencies)
 useEffect(() => {
    //this code here.. fires when the app.js loads
    //all the listening is done here
    document.title = "adh33shProduction";
    db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc =>  ({id:doc.id,todo: doc.data().todo})))
    })
 }, []);

  const addTodo = (event) =>
  {
    //this will fire off when we click the button
    event.preventDefault();

    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setTodos([...todos,input]);//appending the input into the todos array
    setInput('');//clear the input
  }
  return (
    <div className="App">
      <h1>GREETINGS MY FRIENDS🎃</h1>
      <form>
       <FormControl>
        <InputLabel >Write your To-do</InputLabel>
        <Input  value={input} onChange={event => setInput(event.target.value)}/>
       </FormControl>

       <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">
        ADD KARO
       </Button>
        {/* <button type="submit" onClick={addTodo}>Add Todo</button> */}
      </form>
      <ul>
        {/*break the code into components using react js*/}
        {todos.map(todo => (
          <Todo todo={todo} />
          // <li>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
