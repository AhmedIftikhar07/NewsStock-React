import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let { title, description, imgUrl, newsUrl, date } = this.props
    return (
      <div className='my-3 shadow-sm p-3 mb-5 bg-body rounded'>
        <div className="card">
          <img src={!imgUrl ? "https://images.moneycontrol.com/static-mcnews/2017/03/IPO_initial_public_offerings_IPO_1280x720-770x433.jpg" : imgUrl} className="card-img-top" alt="..." />

          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className='card-text'><small className='text-muted'>Published on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target='blank' className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem

