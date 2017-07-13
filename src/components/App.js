import React from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import Layout from './Layout';
import IndexPage from './IndexPage';
import { NotFoundPage } from './NotFoundPage';
import BlogPostFull from './blog-post-full';
import BlogPostPreview from './blog-post-preview';
import Registration from './register';
import Login from './login';
import NewBlogPost from './new-post-view';
import firebase from '../db/firebase';
import UUID from '../util/uuid.js';
// TODO: Mock data repllace with db dt.
import blogPosts from '../data/mock-blog-data';
import blogComments from '../data/mock-comment-data';


// This is the routing logic for rending a full blog post by id.
const registration = () => {
    return <Registration db={firebase} />
}

const newPostWithDB = () => {
    return <NewBlogPost db={firebase} />
}

const newLoginSession = ({history}) => {
    return <Login db={firebase} history={history}/>
}

export class App extends React.Component {
  constructor(){
    super();
    this.UUID = new UUID(25);
    this.state = {
        loggedIn: false,
        posts: [],
        previews: [],
    };

    this.renderPost = this.renderPost.bind(this);
    this.defaultView = this.defaultView.bind(this);
  }
  componentDidMount() {
      firebase.auth().onAuthStateChanged((user)=>{
          // Check to see if the user has a session, if so update the state.
          if (user) {
            this.setState({ userID: user.uid, loggedIn: true, username: user.email });
          } 
          else {
            this.setState({ loggedIn: false });
          }
        });

        firebase.database().ref('posts').on('value', (snapshot)=>{
            const posts = snapshot;
            const tempPreviews = [];
            const tempPosts = [];
            let newState;

            posts.forEach((post)=>{
                const postData = post.val();
                tempPosts.push(postData);
                tempPreviews.push(<BlogPostPreview
                            key={this.UUID.new()} 
                            title={postData.title}
                            username={postData.username}
                            datetime= {postData.datetime}
                            id= {postData.id}/>);
            });

            newState = Object.assign({}, this.state);
            newState.posts = tempPosts;
            newState.previews = newState.previews.concat(tempPreviews);

            this.setState(newState, ()=>{
                console.log(this.state);
            });
        });
  }

    defaultView(){ 
        return <IndexPage db={firebase} previews={this.state.previews}/>
    }

   renderPost({match, staticContext}){
        if (this.state.posts){
            const id = match.params.id;
            const post = this.state.posts? this.state.posts.find(post => post.id === id) : false;
            const comments = blogComments.filter(comment => comment.post_id === id);
            console.log(post);
            if (post) {
                return <BlogPostFull db={firebase} postData={post} commentsData={comments}/>;
            }
            else {
                return <NotFoundPage />;
            }
     }
  }
  render(){
        return (
        <Layout db={firebase} loggedIn={this.state.loggedIn}>
            <Switch>
              <Route exact path="/" render={this.defaultView} />
              <Route exact path="/login" render={newLoginSession} />
              <Route exact path="/register" render={registration} />
              <Route exact path="/post/:id" render={this.renderPost} />
              <Route exact path="/newPost" render={newPostWithDB} />
              <Route component={NotFoundPage} />
            </Switch>
        </Layout>)
    }
}

export default App;