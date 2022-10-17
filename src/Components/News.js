import React, { Component } from "react";
import Item from "./Item";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 5,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  //! agr constructor me props use krny hu ghy tu props pass kry ghy
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };

    document.title = `${this.props.category.charAt(0).toUpperCase() +
      this.props.category.slice(1)} - NewsGuardian`;
    //! things to remember
    // let a = "EHTISHAM"
    // this.state={
    //   thing:"THING",
    //   willbe:"WILL BE"
    // }
    // console.log("this is News construct0r with string "+this.state.thing);
    // console.log("this is News construct0r with string "+this.state.willbe);
    // console.log("this is News construct0r with string "+a);
  }

  async updateNews() {
    // this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=bc21041aadb647919c82dd9ff4d9e731&pageSize`;
    let data = await fetch(url);
    // this.props.setProgress(50);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
    // this.props.setProgress(80);
  }

  async componentDidMount() {
    this.updateNews();
  }

  // handleNext = async () => {

  //   if (
  //     this.state.page <=
  //     Math.ceil(this.state.totalResults / this.props.pageSize)
  //   ) {
  //     this.setState({ page: this.state.page + 1 });
  //     this.updateNews();
  //   } else {
  //   }
  // };
//! the next button we removed was fetching further pages' content of the api 
  // handlePrev = async () => {
  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();
  // };
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    console.log(this.props.apiKey)
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      // concat na kia tu wo spinnner hi
      // ghomta nazar aye gha bs or news further load nhi hn ghi load nhi hu
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
    });
  };
  render() {
    return (
      <>
        
          <h1 className="container text text-center" style={{marginTop:"5rem"}}>
            {" "}
            <span className="badge bg-dark mb-3">
              NewsGuardian - World's Best News Platform
            </span>
          </h1>
          <h1 className="container">
            {" "}
            <span className="badge bg-dark my-3">
              {this.props.category.charAt(0).toUpperCase() +
                this.props.category.slice(1)}
            </span>
          </h1>
          {/* {this.state.loading && <Spinner />} */}

          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length <= this.state.totalResults}
            loader={<Spinner />}
          >
            <div className="container">              
            <div className="row">
              {this.state.articles.map((element,index) => {
                // jab bhi mapping krty hein to
                // unique key deni hoti elements ko
                return (
                  <div
                    className="col-lg-4 col-md-6 mb-5 mx-auto"
                    key={element.url}
                  >
                    <Item
                    key={index}
                      title={element.title}
                      description={element.description}
                      urlToImage={element.urlToImage}
                      readMore={element.url}
                      source={element.source["name"]}
                      time={element.publishedAt}
                      author={element.author}
                    />
                    {/* {this.props.setProgress(100)}; */}
                  </div>
                );
              })}
            </div>
            </div>
          </InfiniteScroll>
       
        
          {/* //! check this out 
      <button type="button" className={`btn btn-dark ${this.state.page<=1?'disabled':''}`} onClick={this.handlePrev}> &larr; Previous</button>
      <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNext}> Next &rarr;</button> */}
       
      </>
    );
  }
}

export default News;
