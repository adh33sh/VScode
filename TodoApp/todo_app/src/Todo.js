import React, { useState } from 'react'
import './Todo.css';
import {  Button, List, ListItem, ListItemAvatar, ListItemText, Modal } from '@material-ui/core'
import db from './firebase';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {makeStyles} from '@material-ui/core/styles';

//Component is something that we write once and we can re use it
/*When we r using multiple component props(properties) helps 
us to differentiate one component form another*/

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

function Todo(props) {

    const classes = useStyles();
    const[open,setOpen] =useState(false);
    const[input, setInput] = useState();

    const handleOpen = () => {
        setOpen(true);
    };
    // const handleClose = () => {
    //     setOpen(false);
    // };
    const updateTodo =() => {
        //update the todo with the new input text
        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, {merge: true});
        setOpen(false);
    }

    return (
    <>
    <Modal
      open={open}
      onClose={e => setOpen(false)}//function to handle when we open the module 
      >
          <div className={classes.paper}>
              <h1>Try sticking with ur plans</h1>
              <input placeholder={props.todo.todo} value={input} onChange={event => setInput(event.target.value)}/>
              <Button onClick={updateTodo}>Update</Button>
          </div>
    </Modal>
        <List className="todo_list">
            <ListItem>
                <ListItemAvatar>
                </ListItemAvatar>
               
                <ListItemText primary={props.todo.todo} secondary="Good Luck! 🚀🔥🌈" />
            </ListItem>
            <button onClick={e=>setOpen(true)}>Edit</button>
            
            {/* <li>{props.text}</li> */}
            {/* <Button onClick={event => db.collection('todos').doc(props.todo.id).delete()}>🗑DELETE ME</Button> */}
            <DeleteForeverIcon  onClick={event => db.collection('todos').doc(props.todo.id).delete()}/>
        </List>
        </>
    )
}

export default Todo
