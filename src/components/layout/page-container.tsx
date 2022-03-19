import React from 'react';
import { Outlet } from 'react-router-dom';
import PageAppBar from './app-bar';

interface IOwnProps {
}

const PageContainer: React.FC<IOwnProps> = () => {
  return (
    <div>
      <PageAppBar />
      <Outlet />
    </div>
  );
};

export default PageContainer;
