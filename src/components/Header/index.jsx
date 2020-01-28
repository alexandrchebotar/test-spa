import React, {useState, useEffect} from 'react';
import {TabNavigation, Tab} from 'evergreen-ui';

import './style.scss';

const Header = () => {
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => setCurrentPage(window.location.pathname),[]);

  return (
    <header className="header" >
      <h2 className="title" >
        Courses & Students - Siemple SPA
      </h2>
      <TabNavigation className="navigation" >
        <Tab is="a" href="/courses" isSelected={currentPage === '/courses'} >
          Courses
        </Tab>
        <Tab is="a" href="/students" isSelected={currentPage === '/students'} >
          Students
        </Tab>
      </TabNavigation>
    </header>
  );
};

export default Header;
