/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
class page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pager: []
    };
  }

  componentWillMount() {
    
    if (this.props.items) {
      this.setPage(this.props.initialPage);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    
    if (this.props.items !== prevProps.items) {
      this.setPage(this.props.initialPage);
    }
  }

  setPage(page) {
    var items = this.props.items;
    var pager = this.state.pager;

    pager = this.getPager(items.length, page);

    var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
    this.setState({ pager: pager });
    this.props.onChangePage(pageOfItems);
  }

  getPager(totalItems, currentPage) {
    currentPage = currentPage || 1;

    var pageSize = 12;
    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    var pages = [1,2,3,4,5];
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }

  render() {
    var pager = this.state.pager;
    if (!pager.pages || pager.pages.length <= 1) {
      return null;
    }
    return (
      <ul className="page">
        <li>
          <a onClick={() => this.setPage(pager.currentPage - 1)}>Previous</a>
        </li>
        {pager.pages.map((page, index) =>
        <li key={index} className={pager.currentPage === page ? 'active' : ''}>
          <a onClick={() => this.setPage(page)}>{page}</a>
        </li>
        )}
        <li>
          <a onClick={() => this.setPage(pager.currentPage + 1)}>Next</a>
        </li>
      </ul>
    );
  }
}

export default page;
