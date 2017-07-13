import React from 'react';
import $ from 'jquery';
import UUID from '../util/uuid.js';

export class NewPost extends React.Component {
    constructor(props){
        super(props);
        this.db = this.props.db;
        this.UUID = new UUID(24);
        this.addPost = this.addPost.bind(this);
    }
    
    componentDidMount() {
        $('#submit-new-post').on('click', ()=>{
            this.addPost(
                $('#post-content').val(), 
                $('#post-title').val()
            );
        });
    }

    addPost(
        title = $('#post-title').val(), 
        content = $('#post-content').val(), 
        postUUID = this.UUID.new()){

        this.db.database().ref('posts/'+ postUUID).set({
            id: postUUID.toString(),
            title,
            content,
            username: this.db.auth().currentUser.email,
            datetime: new Date()
        }).then(function(){
            alert();
        }).catch(function(){
            alert(arguments);
        });
    }

    render(){
        return (<div>
                    <div className="intro-header intro-header-login">
                        <div className="mlb-transparent-gradient"></div>
                        <div className="site-heading">
                            <h1 className="text-shadow">Create a new post</h1>
                        </div>
                    </div>
                     <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                                <div className="row control-group">
                                    <div className="form-group col-xs-12 floating-label-form-group controls">
                                        <label>Name</label>
                                        <input type="text" className="form-control" placeholder="Post title" id="post-title" required="required" data-validation-required-message="Please enter a post title." aria-invalid="false" />
                                        <p className="help-block text-danger"></p>
                                    </div>
                                </div>
                                <div className="row control-group">
                                    <div className="form-group col-xs-12 floating-label-form-group controls">
                                        <label>Post Content</label>
                                        <textarea className="form-control" rows="4" cols="50" placeholder="Post content" id="post-content"></textarea>
                                        <p className="help-block text-danger"></p>
                                    </div>
                                </div>
                                <br />
                                <div id="success"></div>
                                <div className="row">
                                    <div className="form-group col-xs-12">
                                        <button id="submit-new-post" className="btn btn-success pull-right">Post</button>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
                </div>
            )
    }
}

export default NewPost; 