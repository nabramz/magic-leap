import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import UUID from '../util/uuid.js';

class BlogPostFull extends React.Component {
    constructor(props){
        super(props);
    }

    deletePost(postID){
        this.props.db.database().ref(`posts/${postID}`).remove().then(function(){
            alert();
        });
    }

    makeComment(comment = $('#comment-content').val(), 
                username = this.props.db.auth().currentUser.email, 
                UUID = this.UUID.new()){
        const newComment = {
            username, 
            content: comment, 
            id: new UUID(25).new(), 
            post_id: this.props.postData.id, 
            datetime: new Date()
        };

        this.props.db().ref(`comments/${newComment}`).then(function(){
            alert('Comment made!');
        });
    }

    render(){
        const blogPostData = this.props.postData;
        const commentsPostData = this.props.commentsData;
        const currentUser = this.props.db.auth().currentUser;
        const loggedIn = currentUser !== null;
        const DeleteButton = () => {
            return (
                <div className="btn-group pull-right">
                    <button type="submit" className="btn btn-danger">Delete post</button>
                </div>
            );
        };

        return (<div>
              <div className="intro-header intro-header-post">
                <div className="mlb-transparent-gradient"></div>
                    <div className="site-heading text-left">
                        <h1 className="text-shadow">{this.props.postData.title}</h1>
                        <hr className="small"/>
                        <span className="post-meta">Posted by <i>{this.props.postData.username}</i></span>
                        <span className="post-meta">{moment.unix(this.props.postData.dateTime).format("MM/DD/YY")}</span>
                    </div>
                </div>

                <div className="container">
                   <div className="blockquote">
                        {this.props.postData.content}
                   </div>
                   <div>
                    <h1>Comments</h1>
                    <textarea id="comment-content" rows="10" cols="10" placeholder="Comment"></textarea>
                    <button onClick={this.makeComment}></button>
                    <ul className="list-group well">
                        {commentsPostData.map((comment)=>{
                            const date = moment.unix(comment.dateTime).format("MM/DD");

                            return (
                                <li className="list-group-item" key={comment.id}>
                                    <h4 className="list-group-item-heading">{comment.content}</h4>
                                    <div className="list-group-text">Posted by <i>{comment.username}</i> at <datetime>{date}</datetime></div>
                                </li>
                            );
                        })}
                    </ul>
                    <hr className="large" />
                </div>
            </div>
           <div className="form-group col-xs-12 clearfix">
                    {
                        loggedIn? <Link to="/newPost"><button className="btn btn-success">New Post</button></Link> : ''
                    }
                    <Link to="/" className="btn btn-sm btn-default">&lt; Posts</Link>
                    { 
                        loggedIn && currentUser.email === blogPostData.username? <DeleteButton onClick={()=>this.deletePost(blogPostData.id)} /> : ''
                    }
            </div>
        </div>)
    }
}

export default BlogPostFull;