import React from 'react';
import StockForm from './stock_form';
import WatchButton from './watch_button';

const StockSidebar = ({ stock }) => (
  <div className="sidebar-container">
    <div className="sidebar margin_left_50">
      <div className="sidebar-card">
        <StockForm stock={stock} />
      </div>
      <div className="sidebar-buttons">
        <WatchButton symbol={stock.symbol} />
      </div>
    </div>
  </div>
);

export default StockSidebar;
