import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

class BlogPostPreview extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
            return (<div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                  <div className="post-preview">
                    <Link to={'post/' + this.props.id} >
                           <div className="list-group-item-heading">
                                <h2 className="post-title">{this.props.title}</h2>
                           </div>
                           <div className="list-group-item-desc">
                                <h3 className="post-subtitle">Posted by <i>{this.props.username}</i> on 
                                {moment.unix(this.props.datetime).format("MM/DD/YY")}</h3>
                           </div>
                       </Link>
                   </div>
              </div>)
        }
}

export default BlogPostPreview;