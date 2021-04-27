import React from 'react';
import Graph from './graph';
import { connect } from 'react-redux';
import {
  fetchDayChart,
  fetchFiveYearsCharts,
  fetchWeekChart
} from '../actions/chart';
import News from './news/news';
import OwnedStocks from './stock/owned_stocks';
import WatchedStocks from './stock/watched_stocks';
import PieCharts from './user/pie_charts';
import SideNavigationBar from './SideNav';
class Dashboard extends React.Component {
  componentDidMount() {
    this.props.fetchDayChart();
    this.props.fetchFiveYearsCharts();
    this.props.fetchWeekChart();
  }

  render () {
    return (
      <div className="container">
        <SideNavigationBar/>
        <div className="main dashboard">
          <Graph data={this.props.charts} />
          <section>
            <PieCharts />
          </section>
          <section>
            <h2>Recent News</h2>
            <News symbol="market" />
          </section>
        </div>
        <div className="sidebar-container">
          <div className="sidebar margin_left_50">
            <div className="sidebar-card">
              <OwnedStocks />
              <WatchedStocks />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ charts: state.session.currentUser.charts });

const mapDispatchToProps = {
  fetchDayChart,
  fetchFiveYearsCharts,
  fetchWeekChart
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
