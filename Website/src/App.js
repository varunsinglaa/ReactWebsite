import React, { Component } from 'react';
import './App.css';
import ProductFilter from './product.js';
import Card from './Card.js';
import Pagination from './page';

const spoonflowerRootUrl = `http://search.spoonflower.com/searchv2/designs`

class App extends Component {
  constructor() {
    super()
    this.state = {
      pageOfItems: []
    };
    this.onChangePage = this.onChangePage.bind(this);
    this.displayResults = this.displayResults.bind(this);
  }

  onChangePage(pageOfItems) {
    this.setState({ pageOfItems: pageOfItems });
  }

  displayResults(filter) {
    fetch(spoonflowerRootUrl + '?q=' + filter)
    .then(results => {
      return results.json();
    })
    .then(data => {
      let designsArray = data.results.map((row) => {
        return row
      })
      this.setState({designsArray: designsArray});
    })
  }

  componentDidMount() {
    this.displayResults("")
  }

  render() {
    return (
      <div className="container-fluid">

        <div className="header-section">
          <h1 id="main-heading">Product Filter</h1>

          <div className="filter-section">
            <ProductFilter displayResults={this.displayResults}/>
          </div>

        </div>

        <div className="product-card-wrapper">
          {this.state.pageOfItems.map(item =>
            <Card
            key={item.id}
            name={item.name}
            description={item.short_description}
            image={item.thumbnail_url}/>
          )}
        </div>
        <Pagination className="page-change-bar" items={this.state.designsArray} onChangePage={this.onChangePage} />
      </div>
    );
  }
}

export default App;
