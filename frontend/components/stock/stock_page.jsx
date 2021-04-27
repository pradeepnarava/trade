import React from 'react';
import { connect } from 'react-redux';
import { fetchStock, fetchWeekChart,
} from '../../actions/stock';
import {fetchDayChart, fetchFiveYearsCharts} from '../../actions/chart';
import StockSidebar from './stock_sidebar';
import StockMain from './stock_main';
import Loader from '../loader';
import SideNavigationBar from './../SideNav';


class StockPage extends React.Component {
  constructor(props) {
    super(props);
    this.symbol = this.symbol.bind(this);
  }

  componentDidMount() {
    const stock = this.props.stock;
    if (stock === undefined || stock.companyName === undefined) {
      this.props.fetchStock(this.symbol());
    }
    if (stock === undefined || !stock["1W"] || !stock["1W"].detailed) {
      this.props.fetchWeekChart(this.symbol());
    }
    if(!stock){
      this.props.fetchDayChart();
      this.props.fetchFiveYearsCharts();
    }
  }

  componentDidUpdate(prevProps) {
    const stock = this.props.stock;
    if (stock === null) {
      this.props.history.push("/");
    } else {
      if (stock === undefined || stock.companyName === undefined) {
        this.props.fetchStock(this.symbol());
      }
      if (stock === undefined || !stock["1W"] || !stock["1W"].detailed) {
        this.props.fetchWeekChart(this.symbol());
      }
    }

  }

  symbol() {
    return this.props.match.params.symbol.toUpperCase();
  }

  render () {
    if (this.props.stock === undefined) {
      return <div className="full-screen"><Loader /></div>;
    }
    return (
      <div className="container">
        <SideNavigationBar/>
        <StockMain stock={this.props.stock} />
        <StockSidebar stock={this.props.stock} />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
  stock: state.stocks[ownProps.match.params.symbol.toUpperCase()]
  }
}

const mapDispatchToProps = { 
  fetchStock,
  fetchWeekChart,
  fetchDayChart,
  fetchFiveYearsCharts
};

export default connect(mapStateToProps, mapDispatchToProps)(StockPage);
