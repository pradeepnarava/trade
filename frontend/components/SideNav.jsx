import React from 'react';
import {connect} from 'react-redux';
import { formatMoney } from '../util/util';
import { Link } from 'react-router-dom';
import Loader from './loader';
const NavigationMenu = ({stock, currentUser}) => {
    const stocksLoaded = () => {
        return Object.keys(currentUser.sharesOf).every(symbol =>
        stock[symbol] && stock[symbol].priceCents
        );
    }
    const styles = {
        division: {
            margin: '-30px 0px 0px 8px',
            position: 'fixed',
            height: '100%'
            },
        ul : {
            padding: 0,
            margin: 0,
            'listStyle': 'none',},
        box: {
            overflowY: 'scroll',
            //padding: '8px 24px',
            margin:  '16px 0px',
            maxHeight: '45%',
        },
        li : {
            'padding' : '0px 24px',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
            height: '60px'
        },
        li_header: {
            fontSize: '16px',
            fontWeight: '600',
            lineHeight: '47px',

        },
        para_under_list: {
            fontSize: '16px'
        },
        para_header: {
            fontSize: '13px',
            fontWeight: '500'
        },
        inner_anchor: {
            textDecoration: 'inherit',
            color: 'inherit'
        }
    }
    const location = window.location.href;
    if(!stocksLoaded()){
        return <div className="sidenav-loader full-screen"><Loader /></div>;
    }
    return <div style={styles.division} className=' trasparentScroll'>
        <div className='sidebar-card' style={styles.box}>
        <ul style={Object.assign({}, styles.ul, styles.li_header)}>
            <li className='bottom_border' style={Object.assign({}, styles.li, styles.li_header)}>{formatMoney(currentUser.balanceCents/100)}</li>

            {
                /**
                 * looping over all the stocks for priceCents
                 */
            }
            {
                currentUser.sharesOf && Object.keys(currentUser.sharesOf)
                .filter(e => {
                    if(currentUser.sharesOf[e] > 0)
                        return e;
                })
                .map((item, index) => {
                    let symbol, priceCents;
                    try {
                        symbol = stock[item].symbol;
                        priceCents = stock[item].priceCents
                    } catch (error) {
                        symbol = '';
                        priceCents = 0;
                    }
                    //let {symbol, priceCents} = stock[item];
                    //priceCents = priceCents ? priceCents : 0;
                    return <li key={index} style={styles.li} className='hover_white'> 
                        <p style={styles.para_header}>
                            {symbol} - 
                        </p>
                        <p style={styles.para_under_list}>
                            {formatMoney(priceCents/100)}
                        </p>
                        {" "}
                        {/* <p style={styles.para_under_list}>
                            +4.5%
                        </p> */}
                    </li>
                })
            }
        </ul>
        </div>
        <div className='sidebar-card' style={styles.box}>
        <ul style={styles.ul}>
            <li style={styles.li} className='hover_white bottom_border'>DASHBOARD</li>
            <li style={styles.li} className='hover_white bottom_border'>
             <Link to={`/balance`} style={styles.inner_anchor} 
             className={`${location.includes('balance') ? 'font_weight_bold' : ''}`}>
                BALANCE
             </Link>
            </li>
            <li style={styles.li} className='hover_white bottom_border'>SIGNAL</li>
            <li style={styles.li} className='hover_white bottom_border'>SETTINGS</li>
            <li style={styles.li} className='hover_white'>PRO</li>
        </ul>
        </div>
  </div>
}


const mapStateToProps = (state) => ({
    stock: state.stocks,
    currentUser: state.session.currentUser
  });
  

export default connect(mapStateToProps, null)(NavigationMenu);