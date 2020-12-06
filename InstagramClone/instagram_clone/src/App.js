import React,{useState, useEffect} from 'react';
import './App.css';
import Post from './Post';
import {db, auth} from './firebase';
import { Button, Input, makeStyles, Modal } from '@material-ui/core';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed';


function getModalStyle() {
  const top = 50 
  const left = 50 

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

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


function App() {

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open,setOpen] = useState(false);
  const[posts,setPosts] = useState([]);//hook
  const[username,setUsername] = useState('');
  const[email,setEmail] = useState('');
  const[password,setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [openSignIn,setOpenSignIn] = useState(false);

  //useEffect runs a peice of code based on a specific condition
  //we can have multiple of these
  

  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser)
      {
        //user has logged in..
        console.log(authUser);
        setUser(authUser);

      }
      else
      {
        //user has logged out..
        setUser(null);
      }
    })

    return () => {
      //perform some cleanup actions before refiring the useEffect
      unsubscribe();
    }

  }, [user, username]);

  useEffect(() => {
    //this is where the code runs
    //conditions here are simply variables
    document.title="ezpzlemonsqueeshy";
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()})));
    })

  }, []);
 
  const signUp = (event) => {
      event.preventDefault();

      auth
       .createUserWithEmailAndPassword(email, password)
       .then((authUser) => {
           return authUser.user.updateProfile({
              displayName: username,
            })
       })
      .catch((error) => alert(error.message));
      setOpen(false);
  }

  const signIn = (event) => {
    event.preventDefault();

    auth
    .signInWithEmailAndPassword(email,password)
    .catch((error) => alert(error.message))

    setOpenSignIn(false);
  }


  return (
    <div className="App">

       <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
         <div style={modalStyle} className={classes.paper}>
           <form className="app__signup">
           <center>
         <img className="app__headerImage"
      src="https://www.androidguys.com/wp-content/uploads/2015/04/insta.png"
     alt="" /></center>
     <Input
      placeholder="username"
      type="text"
      vale={username}
      onChange={(e) => setUsername(e.target.value)}/>
      <Input
      placeholder="email"
      type="text"
      vale={email}
      onChange={(e) => setEmail(e.target.value)}/>
       <Input
      placeholder="password"
      type="password"
      vale={password}
      onChange={(e) => setPassword(e.target.value)}/>
      <Button type="submit" onClick={signUp}>Sign Up</Button>
      </form>
       
    </div>
      </Modal>
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
         <div style={modalStyle} className={classes.paper}>
           <form className="app__signup">
           <center>
         <img className="app__headerImage"
      src="https://www.androidguys.com/wp-content/uploads/2015/04/insta.png"
      alt=""/></center>
     
      <Input
      placeholder="email"
      type="text"
      vale={email}
      onChange={(e) => setEmail(e.target.value)}/>
       <Input
      placeholder="password"
      type="password"
      vale={password}
      onChange={(e) => setPassword(e.target.value)}/>
      <Button type="submit" onClick={signIn}>Sign in</Button>
      </form>
       
    </div>
      </Modal>
    <div className="app__header">
      <img className="app__headerImage"
      src="https://www.androidguys.com/wp-content/uploads/2015/04/insta.png"
     alt="" />
       {user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>
      ): (
        <div className="app_loginContainer">
          <Button onClick={() => setOpenSignIn(true)}>Sign in</Button>
        <Button onClick={() => setOpen(true)}>Sign up</Button>
        </div>
      ) }
      </div>
     <div className="app__posts">
       <div className="app__postsLeft">
       {
          posts.map(({id, post}) => (
            <Post key={id}  postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
          ))
        }
       </div>
        {/* Posts(We create a component post.js for this) */}

      <div className="app_postsRight">
      <InstagramEmbed
          url='https://www.instagram.com/p/CICgAeXLoE_/'
          maxWidth={320}
          hideCaption={false}
          containerTagName='div'
          protocol=''
          injectScript
          onLoading={() => {}}
          onSuccess={() => {}}
          onAfterRender={() => {}}
          onFailure={() => {}}
        />
        </div>
       
        </div>
        
        {/* <Post username="Adheesh" caption="What's goody" imageUrl="https://scontent-maa2-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/c0.123.1025.1025a/s640x640/126296377_282853426478158_1134939254371702356_n.jpg?_nc_ht=scontent-maa2-1.cdninstagram.com&_nc_cat=110&_nc_ohc=aFscl9UR8MEAX-i_4Ys&tp=1&oh=f233351ed5c8a0618b6dcfc463a2ade1&oe=5FE209DF"/>
        <Post username="klop" caption="Goody day" imageUrl="https://scontent-maa2-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/c0.177.1440.1440a/s640x640/126520465_169588191528726_4036265976518975592_n.jpg?_nc_ht=scontent-maa2-1.cdninstagram.com&_nc_cat=106&_nc_ohc=Y-zukVcluHIAX8SpK1L&tp=1&oh=9d2abcd50775de3eaeae5ce7958c97c0&oe=5FE538DA"/>
        <Post username="Michael" caption="Let's run" imageUrl="https://scontent-maa2-2.cdninstagram.com/v/t51.2885-15/sh0.08/e35/c0.116.1018.1018a/s640x640/125878810_203295834692035_558400751172491737_n.jpg?_nc_ht=scontent-maa2-2.cdninstagram.com&_nc_cat=107&_nc_ohc=aARznZlp2UIAX8vIkgF&tp=1&oh=bda9797be816acbe500a8b163a155e71&oe=5FE335D3"/> */}
         {user?.displayName ? (
             <ImageUpload username={user.displayName}/>
      ): (
        <h3>Sorry, you need to login to upload</h3>  
 
      )}
      
    </div>
  );
}

export default App;
