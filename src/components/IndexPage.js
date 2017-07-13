import React from 'react';
import BlogPostPreview from './blog-post-preview';

class IndexPage extends React.Component {
    render(){

     return (<div>
                 <div className="intro-header">
                    <div className="mlb-transparent-gradient"></div>
                    <div className="site-heading">
                        <h1 className="text-shadow">Magic Leap Blog</h1>
                        <hr className="small"/>
                        <span className="subheading">Have a look into the future</span>
                    </div>
                </div>
                <div className="container">

                    {this.props.previews}

                     <div className="clearfix">
                        {/** TODO: this should only show when total posts amount is equal to or exceeding the viewport display amt.
                        <div className="pull-left">
                            <button className="btn btn-lg btn-default">&lt;</button>

                        </div>
                        <div className="pull-right">
                            <button className="btn btn-lg btn-default">&gt;</button>
                        </div>
                         **/}
                        </div>
                    </div>
            </div>);
        }       
}

export default IndexPage;