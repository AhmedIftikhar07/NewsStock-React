import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'





export class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 6,
        category: 'sports'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    capitalFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `NewsStock - ${this.capitalFirstLetter(this.props.category)}`
    }

    async componentDidMount() {
        this.props.setProgress(20)
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ff399ce74f504f45bf950d7b0fbbbb5c&page=1&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(url);
        this.props.setProgress(40)
        let parseData = await data.json()
        this.setState({
            articles: parseData.articles,
            totalResults: parseData.totalResults,
            loading: false,

        })
        this.props.setProgress(100)

    }
    handlePrevBtn = async () => {
        console.log('prev');
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ff399ce74f504f45bf950d7b0fbbbb5c&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(url);
        let parseData = await data.json()
        this.setState({
            page: this.state.page - 1,
            articles: parseData.articles,
            loading: false
        })
    }

    handleNextBtn = async () => {
        console.log('next');
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

        } else {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ff399ce74f504f45bf950d7b0fbbbb5c&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
            this.setState({ loading: true })
            let data = await fetch(url);
            let parseData = await data.json()
            this.setState({
                page: this.state.page + 1,
                articles: parseData.articles,
                loading: false
            })
        }
    }
    fetchData = async () => {
        this.setState({ page: this.state.page + 1 })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ff399ce74f504f45bf950d7b0fbbbb5c&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
        let data = await fetch(url);
        let parseData = await data.json()
        this.setState({
            articles: this.state.articles.concat(parseData.articles),
            totalResults: parseData.totalResults,
            loading: false,

        })

        }

    render() {
        return (
            <div>
                <h2 className='text-center' style={{ margin: "35px 0px" }}>NewsStock - Top {this.capitalFirstLetter(this.props.category)} Headlines</h2>

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div  className='container my-3'>
                        <div className='row'>

                            {this.state.loading && <Spinner />}

                            {this.state.articles.map((element) => {
                                return <div className='col-md-4' key={element.url} >
                                    <NewsItem title={element.title} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt} />
                                </div>
                            })}

                        </div>
                    </div>
                    
                </InfiniteScroll>

                {/* <div className='container d-flex justify-content-between'>

                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevBtn}>&larr; Previous</button>

                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextBtn}>Next &rarr;</button>
                </div> */}
            </div>
        )
    }
}

export default News
