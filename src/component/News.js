import React, { useEffect, useState } from "react";
import Newscard from "./Newscard";
import Loader from "./Loader";
import newsAlt from "./newsAlt.png";
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) =>{
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() =>{
    updateData();
    // eslint-disable-next-line
  }, [])

  // handleClickPrevious = async () => {
  //   document.body.scrollTop = document.documentElement.scrollTop = 0;
  //   const url = `https://newsapi.org/v2/top-headlines?country=${
  //     props.country
  //   }&category=${props.category}&apiKey=${
  //     process.env.REACT_APP_API_URL
  //   }&page=${page - 1}&pageSize=${props.pageSize}`;
  //   setState({ loading: true });
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   setState({
  //     articles: parsedData.articles,
  //     totalResults: parsedData.totalResults,
  //     page: page - 1,
  //     loading: false,
  //   });
  // };
  // handleClickNext = async () => {
  //   document.body.scrollTop = document.documentElement.scrollTop = 0;
  //   const url = `https://newsapi.org/v2/top-headlines?country=${
  //     props.country
  //   }&category=${props.category}&apiKey=${
  //     process.env.REACT_APP_API_URL
  //   }&page=${page + 1}&pageSize=${props.pageSize}`;
  //   setState({ loading: true });
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   setState({
  //     articles: parsedData.articles,
  //     totalResults: parsedData.totalResults,
  //     page: page + 1,
  //     loading: false,
  //   });
  // };
  const fetchMoreData = async () =>{
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${process.env.REACT_APP_API_URL}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page + 1)
    setLoading(true)
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    setLoading(false)
  }
  const updateData = async() => {
    props.setProgressAmount(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${process.env.REACT_APP_API_URL}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    props.setProgressAmount(30);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgressAmount(100)
  }


    return (
      <>
          <h3 className="text-light md-6" id="topheadtext">
            Top Headlines
          </h3>
          <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !== totalResults}
            loader={loading && <Loader/>}
          >
          <div className="container">
          <div className="row text-light">
            {articles.map((element) => {
              return (
                <div key={element.url} className=" col-md-4">
                  <Newscard
                    title={element.title ? element.title.slice(0, 50) : ""}
                    desc={
                      element.description
                      ? element.description.slice(0, 80)
                      : ""
                    }
                    imgUrl={element.urlToImage ? element.urlToImage : newsAlt}
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
          </InfiniteScroll>
      </>
    );
}

export default News;