import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import Link from 'umi/link';
import Debounce from 'lodash-decorators/debounce';
import styles from './index.less';
import RightContent from './RightContent';
import logoMobile from '../../assets/images/Header/logo_mobile.png';

export default class GlobalHeader extends PureComponent {
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }
  /* eslint-disable*/
  @Debounce(600)
  triggerResizeEvent() {
    // eslint-disable-line
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }
  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  };
  render() {
    const { collapsed, isMobile, logo } = this.props;
    return (
      <div className={styles.header}>
        {/* {isMobile && (
          <Link to="/" className={styles.logo} key="logo">
            <img src={logo} alt="logo" width="32" />
          </Link>
        )}
        <Icon
          className={styles.trigger}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        />*/}
        {isMobile ? (
          <Link to="/" className={styles.logo} key="logo">
            {/* <img src={logo} alt="logo" width="32" /> */}
            <img src={logoMobile} alt="logo" height="44" />
          </Link>
        ) : (
          <Link to="/" className={styles.logo} key="logo">
            <img src={logo} alt="logo" height="44" />
            {/* <img src={logo} alt="logo" width="32" />万海龙在线培训平台 */}
          </Link>
        )}
        {isMobile ? (
          <Icon
            className={styles.trigger}
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.toggle}
          />
        ) : null}
        <RightContent {...this.props} />
      </div>
    );
  }
}
