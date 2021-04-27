import React from 'react';
import { connect } from 'react-redux';
import StockIndex from './stock_index';
import { fetchStock } from '../../actions/stock';

class OwnedStocks extends React.Component {
  componentDidMount() {
    this.watchedAndNotOwned().forEach(symbol => this.props.fetchStock(symbol));
  }

  componentDidUpdate(prevProps) {
    this.props.owned.forEach(symbol => {
      if (!prevProps.owned.includes(symbol)) {
        this.props.fetchStock(symbol);
      }
    });
  }

  watchedAndNotOwned() {
    const { watchedStocks, owned } = this.props;
    const watchedAndNotOwned = [];
    this.props.owned.forEach(symbol => {
      if (!watchedStocks.includes(symbol)) watchedAndNotOwned.push(symbol);
    });
    return watchedAndNotOwned;
  }

  render () {
    const { watchedStocks, allStocks, sharesOf, balanceCents } = this.props;
    if (watchedStocks === undefined || this.watchedAndNotOwned().length === 0) {
      return '';
    }
    return (
      <div>

        <StockIndex sharesOf={sharesOf} stocks={this.watchedAndNotOwned().map(symbol =>
          allStocks[symbol] ? allStocks[symbol] : { symbol }
        )} />
      </div>
    );
  }
}

const ownedStockSymbols = sharesOf => (
  Object.keys(sharesOf).filter(symbol => sharesOf[symbol] > 0)
);

const mapStateToProps = state => ({
  watchedStocks: state.session.currentUser.watchedStocks,
  allStocks: state.stocks,
  owned: ownedStockSymbols(state.session.currentUser.sharesOf),
  sharesOf: state.session.currentUser.sharesOf,
  balanceCents: state.session.currentUser.balanceCents
});

export default connect(mapStateToProps, { fetchStock })(OwnedStocks);
