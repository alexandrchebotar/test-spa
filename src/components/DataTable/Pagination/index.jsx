import React from 'react';
import {Pane, Text, Button} from 'evergreen-ui';

import './style.scss';

const Pagination = (props) => {
  const {pageCount, currentPage, setCurrentPage} = props;
  const firstPage = (currentPage < 4) ? 1 
    : (pageCount - currentPage > 2) ? currentPage - 3 
    : (pageCount - 6 < 1) ? 1
    : pageCount - 6;
  const lastPage = (pageCount < 7) ? pageCount
    : (firstPage + 6 > pageCount) ? pageCount
    : (currentPage + 3 > pageCount) ? pageCount
    : (currentPage < 4) ? firstPage + 6
    : currentPage + 3;
  let pageButtons = [];
  for (let i = firstPage; i <= lastPage; i++) {
    pageButtons.push(
      <Button key={i} appearance={i === currentPage ? 'primary' : 'default'} onClick={() => setCurrentPage(i)} >
        {i}
      </Button>
    );
  }

  return (
      <Pane className="pagination" display="flex">
        <Button disabled={currentPage === firstPage} onClick={() => setCurrentPage(currentPage - 1)} >Previous</Button>
        {firstPage !== 1 &&
          <Text>...</Text>
        }
        {pageButtons}
        {lastPage !== pageCount &&
          <Text>...</Text>
        }
        <Button disabled={currentPage === lastPage} onClick={() => setCurrentPage(currentPage + 1)} >Next</Button>
      </Pane>
  );
};

export default Pagination;
