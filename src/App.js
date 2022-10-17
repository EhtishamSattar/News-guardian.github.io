import './App.css';
import React, { Component } from 'react';
import Navbar from './Components/Navbar';
import News from './Components/News';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
// import LoadingBar from 'react-top-loading-bar'
export default class App extends Component {
  
  pageSize=5
  //! ye hm ny is liye kia ky hm ani api key chupa saky custom environment variables ky through 
  //! aek file bnana pri env.local ky name sy 
  apiKey=process.env.REACT_APP_NEWS_API;
  // state = {
  //   progress:0
  // }

  // setProgress=(progress)=>{
  //   this.setState({
  //     progress:progress
  //   })
  // }

  render() {
    return (

      <div>
        <BrowserRouter>
        {/* <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        
      /> */}
        <Navbar/>
        <Routes>
          <Route exact path='/' element={<News  apiKey={this.apiKey} />}/>
            <Route exact path='/business' element={<News key='business' apiKey={this.apiKey} pageSize={this.pageSize} category='business' country='in'/>} />
            <Route exact path='/entertainment' element={<News key='entertainment' apiKey={this.apiKey} pageSize={this.pageSize} category='entertainment' country='in'/>}/>
            <Route exact path='/general' element={<News key='general' apiKey={this.apiKey} pageSize={this.pageSize} category='general' country='in'/>}/>
            <Route exact path='/health' element={<News key='health' apiKey={this.apiKey} pageSize={this.pageSize} category='health' country='in'/>}/>
            <Route exact path='/science' element={<News key='science' apiKey={this.apiKey} pageSize={this.pageSize} category='science' country='in'/>}/>
            <Route exact path='/sports' element={<News key='sports' apiKey={this.apiKey} pageSize={this.pageSize} category='sports' country='in'/>}/>
            <Route exact path='/technology' element={<News key='technolgy' apiKey={this.apiKey} pageSize={this.pageSize} category='technology' country='in'/>}/>
        </Routes>
        
        </BrowserRouter>
      </div>
      

    );
  }
}

