import React from 'react'
import SideNavigationBar from './../SideNav';
import OwnedStocks from './../stock/balance_owned_stocks';
import { formatMoney } from './../../util/util';
import { connect } from 'react-redux';
export function Balance({balanceCents}) {
    return (
        <div className="container">
            <div className=' '>
                <SideNavigationBar/>
            </div>

            <div className="sidebar-container margin_auto margin_right_500">
            <div className="sidebar margin_left_50">
                <div className='fixer_balancer'>
                    <h4>BALANCE</h4>
                    <div className="shares">
                        {formatMoney(balanceCents / 100)}
                    </div>
                </div>
                <h4 className='balance_h4_padding'>STOCKS HELD</h4>
                <div className="sidebar-card box_shadow_none">
                <OwnedStocks />
                {/* <WatchedStocks /> */}
                </div>
            </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    balanceCents: state.session.currentUser.balanceCents
  });
  
  export default connect(mapStateToProps)(Balance);
  