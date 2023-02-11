import React, { Component } from "react";
import Newscard from "./Newscard";
import Loader from "./Loader";
import newsAlt from "./newsAlt.png"

export default class News extends Component {

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    const url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${process.env.REACT_APP_API_URL}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
  }

  handleClickPrevious = async () => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    const url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${process.env.REACT_APP_API_URL}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      page: this.state.page - 1,
      loading: false
    });
  };
  handleClickNext = async () => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    const url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${process.env.REACT_APP_API_URL}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      page: this.state.page + 1,
      loading: false
    });
  };

  render() {
    return (
      <div>
        <div className="container">
          <h3 className="text-light md-6" id="topheadtext">
            Top Headlines
          </h3>
          {this.state.loading && <Loader/>}
          <div className="row text-light">
            {this.state.articles.map((element) => {
              return (
                <div key={element.url} className=" col-md-4">
                  <Newscard
                    title={element.title ? element.title.slice(0, 50) : ""}
                    desc={
                      element.description
                        ? element.description.slice(0, 80)
                        : ""
                    }
                    imgUrl={
                      element.urlToImage ? element.urlToImage : newsAlt
                    }
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="container">
          <button
            type="button"
            id="previous"
            disabled={this.state.page <= 1}
            onClick={this.handleClickPrevious}
            className="btn btn-outline-success"
          >
            &larr;Previous
          </button>
          <button
            type="button"
            id="next"
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
            onClick={this.handleClickNext}
            className="btn btn-outline-success"
          >
            Next&rarr;
          </button>
        </div>
      </div>
    );
  }
}
