import React, {useState, useEffect} from 'react';
import {TabNavigation, Tab} from 'evergreen-ui';
import {useHistory, useLocation} from "react-router-dom";

import './style.scss';

const Header = () => {
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => setCurrentPage(window.location.pathname),[]);
  const location = useLocation();
  let history = useHistory();
  // debugger;
  return (
    <header className="header" >
      <h2 className="title" >
        Courses & Students - Siemple SPA
      </h2>
      <TabNavigation className="navigation" >
        <Tab 
          isSelected={location.pathname === '/courses'}
          onSelect={() => history.push('/courses')}
        >
          Courses
        </Tab>
        <Tab
          isSelected={currentPage === '/students'}
          onSelect={() => history.push('/students')}
        >
          Students
        </Tab>
      </TabNavigation>
    </header>
  );
};

export default Header;
