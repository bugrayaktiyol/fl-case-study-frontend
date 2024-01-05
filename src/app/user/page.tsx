'use client';
import React, { useState, useEffect } from 'react';
import type { Key } from 'antd/es/table/interface';
import { fetchDataFromApi } from '@/services/DataService';
import UserTable from '@/components/MasterView/UserTable/UserTable';


const App: React.FC = () => {

  return (
    
      <UserTable ></UserTable>
  );
};

export default App;
