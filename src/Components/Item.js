import React, { Component } from 'react';
import hello from './hello.jpg'

export class Item extends Component {
  render() {
    let {title,description,urlToImage,readMore,source,time,author}=this.props;
    return (
      <div>
        <div className="card">
          {/* //! here i imported the image 
          myself and it is working well */}
            <img src={!urlToImage?hello:urlToImage} className="card-img-top" alt="Unavailable ! Sorry "/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text text-muted"> Author <span class="badge text-bg-secondary">{author?author:'Unknown'}</span></p>
                <p className="card-text"><small className="text-muted">{new Date(time).toGMTString()}</small></p>
                <span className="position-absolute top-0 mt-2 badge rounded-pill bg-danger">
                  {source}
                </span>
                <a href={readMore} target="_blank" rel="noopener noreferrer"className="btn btn-primary">Read here</a>
            </div>
        </div>
      </div>
    );
  }
}

export default Item;
