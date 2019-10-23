import React, { Fragment } from 'react';
import { Icon, Row, Col } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';
// import SelectLang from '@/components/SelectLang';
import styles from './UserLayout.less';
// import logo from '../assets/logo.svg';
import logo from '@/assets/images/Login/login_logo.png';
import { company } from '../defaultSettings';

const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> {company}
  </Fragment>
);

class UserLayout extends React.PureComponent {
  render() {
    const { children } = this.props;
    return (
      // @TODO <DocumentTitle title={this.getPageTitle()}>
      <div className={styles.container}>
        <div className={styles.top}>
          <Row>
            <Col xs={24} sm={24} md={{ span: 16, offset: 4 }}>
              <img src={logo} alt="logo图片" />
            </Col>
          </Row>
        </div>
        <div className={styles.content}>{children}</div>
        <GlobalFooter copyright={copyright} />
      </div>
    );
  }
}

export default UserLayout;
