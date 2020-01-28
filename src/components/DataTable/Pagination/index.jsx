import React, {Component, Fragment, useState} from 'react';
import {Pane, Text, Button} from 'evergreen-ui';

import './style.scss';

const Pagination = (props) => {
  const pageCount = 12;
  // const {pageCount, currentPage} = props;
  const [currentPage, setCurrentPage] = useState(1);

  const firstPage = (currentPage < 4) ? 1 
    : (pageCount - currentPage > 2) ? currentPage - 3 
    : (pageCount - 6 < 1) ? 1
    : pageCount - 6;
  const lastPage = (pageCount < 7) ? pageCount
    : (firstPage + 6 > pageCount) ? pageCount
    : (currentPage + 3 > pageCount) ? pageCount
    : (currentPage < 4) ? firstPage + 6
    : currentPage + 3

  let pageButtons = [];
  for (let i = firstPage; i <= lastPage; i++) {
    pageButtons.push(
      <Button appearance={i === currentPage ? 'primary' : 'default'} onClick={() => setCurrentPage(i)} >
        {i}
      </Button>
    );
  }

  return (
      <Pane className="pagination" display="flex">
        <Button disabled={currentPage === firstPage} onClick={() => setCurrentPage(currentPage - 1)} >Previous</Button>
        {firstPage !== 1 &&
          <Text size={600} >...</Text>
        }
        {pageButtons}
        {lastPage !== pageCount &&
          <Text size={600} >...</Text>
        }
        <Button disabled={currentPage === lastPage} onClick={() => setCurrentPage(currentPage + 1)} >Next</Button>
      </Pane>
  );
};

export default Pagination;
