import React, { Component } from 'react';
import { Button, Divider, Icon, Input, Spin, Avatar } from 'antd';
// import router from 'umi/router';
// import Link from 'umi/link';
import { connect } from 'dva';
import classNames from 'classnames';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Document, Page } from 'react-pdf';
import screenfull from 'screenfull';
// import web from '@/assets/images/web.pdf'
import styles from './Common.less';

const { TextArea } = Input;

@connect(({ loading }) => ({
  loading: loading.effects['MyLearnPlan/GetLearnPlanVideoOrPDF'],
}))
class LearnPDF extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numPages: null, // 总页数
      pageNumber: 1, // 当前页码
      scale: 1, // 缩放

      baseInfo: {
        // 获取课件资源，课程信息等
        courseName: '', // 课件名称
        intruduce: '', // 课件简介
        class_hour: '', // 课时
        cover: '', // 课件封面
        teachername: '', // 讲师姓名
        teacherdesc: '', // 讲师介绍
        teacherimg: '', // 老师封面
        // canDrag : false,// 是否允许视频拖动
        courseSrc: '', // 课件资源路径
        studyPlanName: '', // 学习计划名称
        planStartTime: '', // 学习计划开始时间
        planEndTime: '', // 学习计划结束时间
      },
      // currentTime:0,// 当前时间点
      ended: false, // 是否已经完成学习
    };
  }

  componentDidMount() {
    // 禁用浏览器鼠标右键操作
    window.document.oncontextmenu = () => false;
    const {
      match: { params },
      dispatch,
    } = this.props;
    const { id } = params;
    dispatch({
      type: 'MyLearnPlan/GetLearnPlanVideoOrPDF',
      payload: {
        id,
      },
      callback: res => {
        if (res.status === 'ok') {
          console.log('请求成功', res.data);
          this.setState({
            baseInfo: {
              courseName: res.data.plan.course.name, // 课件名称
              intruduce: res.data.plan.course.intruduce, // 课件简介
              class_hour: res.data.plan.course.class_hour, // 课时
              cover: res.data.plan.course.cover, // 课件封面
              teachername: res.data.plan.course.teachername, // 讲师姓名
              teacherdesc: res.data.plan.course.teacherdesc, // 讲师介绍
              teacherimg: res.data.plan.course.teacherimg, // 老师封面
              // canDrag : res.data.plan.course.drag_flag,// 是否允许视频拖动
              courseSrc: res.data.plan.course.courseware_file, // 课件资源路径
              studyPlanName: res.data.plan.name, // 学习计划名称
              planStartTime: res.data.plan.start_time, // 学习计划开始时间
              planEndTime: res.data.plan.end_time, // 学习计划结束时间
            },
            pageNumber: Number(res.data.progress.numpage), // 当前页码
            ended: res.data.status === '已完成' || res.data.status === '超期已完成', // 已指派、学习中、已完成、超期已完成、超期未完成
          });
        } else {
          console.log('请求失败');
        }
      },
    });
  }

  // pdf是否成功加载
  onDocumentLoadSuccess = ({ numPages }) => {
    console.log('pdf加载成功');
    this.setState({
      numPages,
    });
  };

  // pdf缩小
  zoomDecrease = () => {
    let { scale } = this.state;
    if (scale <= 0.5) {
      return;
    }
    scale -= 0.1;
    this.setState({
      scale,
    });
  };

  // pdf放大
  zoomAdd = () => {
    let { scale } = this.state;
    if (scale >= 2.5) {
      return;
    }
    scale += 0.1;
    this.setState({
      scale,
    });
  };

  // 上一页
  previousPage = () => {
    const { ended } = this.state;
    let { pageNumber } = this.state;
    if (pageNumber === 1) {
      return;
    }
    pageNumber -= 1;
    this.setState({
      pageNumber,
    });
    this.sendRequest(pageNumber, ended); // 发送pdf的当前页码和学习状态
  };

  // 下一页
  nextPage = () => {
    const { numPages } = this.state;
    let { pageNumber, ended } = this.state;
    if (pageNumber === numPages) {
      return;
    }
    pageNumber += 1;
    if (!ended) {
      ended = pageNumber === numPages; // 判断是否学习完成
    }
    this.setState({
      pageNumber,
      ended,
    });
    this.sendRequest(pageNumber, ended); // 发送pdf的当前页码和学习状态
  };

  // 全屏
  screenFull = () => {
    const ele = document.getElementsByTagName('canvas');
    console.log(ele[0]);
    console.log(screenfull);
    console.log(screenfull.enabled);
    console.log(screenfull.isFullscreen);
    if (screenfull.enabled) {
      // screenfull.toggle(ele[0]);
      screenfull.toggle(this.pdfPlayer);
    }
  };

  // 发送pdf的当前页码和学习状态
  sendRequest = (pageNumber, ended) => {
    const {
      match: { params },
      dispatch,
    } = this.props;
    const { id } = params; // id
    dispatch({
      type: 'MyLearnPlan/SendCurrentPageAndStatus',
      payload: {
        id,
        data: {
          progress: {
            numpage: pageNumber,
          },
          status: ended ? '已完成' : '学习中',
        },
      },
    });
  };

  render() {
    const { baseInfo, ended } = this.state;
    const { pageNumber, numPages, scale } = this.state;
    const { loading } = this.props;
    return (
      <Spin spinning={loading}>
        <PageHeaderWrapper title={`${baseInfo.studyPlanName}(${baseInfo.courseName})`}>
          <div className={styles.videoOrPDFContent}>
            <div
              className={styles.pdfContent}
              ref={dom => {
                this.pdfPlayer = dom;
              }}
            >
              <div className={styles.pdfDocumentContent}>
                <Document
                  // file={web}
                  file={baseInfo.courseSrc}
                  onLoadSuccess={this.onDocumentLoadSuccess}
                  // renderMode='svg'
                >
                  <Page
                    pageNumber={pageNumber}
                    // renderMode='svg'
                    scale={scale} // 缩放
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </Document>
              </div>{' '}
              <div className={styles.pdfFooter}>
                <div>
                  <Icon
                    type="zoom-out"
                    onClick={this.zoomDecrease}
                    title="缩小"
                    style={{
                      cursor: scale <= 0.5 ? 'unset' : 'pointer',
                    }}
                  />{' '}
                  <Divider
                    type="vertical"
                    style={{
                      height: '18px',
                      background: '#ccc',
                      margin: '0 15px',
                    }}
                  />{' '}
                  <Icon
                    type="zoom-in"
                    onClick={this.zoomAdd}
                    title="放大"
                    style={{
                      cursor: scale >= 2.5 ? 'unset' : 'pointer',
                    }}
                  />
                </div>{' '}
                <div>
                  <Icon
                    type="left"
                    onClick={this.previousPage}
                    title={pageNumber === 1 ? '已经是第一页' : '上一页'}
                    style={{
                      cursor: pageNumber === 1 ? 'unset' : 'pointer',
                    }}
                  />{' '}
                  <span
                    style={{
                      padding: '0 15px',
                    }}
                  >
                    {' '}
                    {pageNumber}/ {numPages}
                  </span>
                  <Icon
                    type="right"
                    onClick={this.nextPage}
                    title={pageNumber === numPages ? '已经是最后一页' : '下一页'}
                    style={{
                      cursor: pageNumber === numPages ? 'unset' : 'pointer',
                    }}
                  />
                </div>{' '}
                <div>
                  <Icon
                    type="fullscreen"
                    title="全屏查看"
                    style={{
                      cursor: 'pointer',
                    }}
                    onClick={this.screenFull}
                  />
                </div>{' '}
              </div>
            </div>{' '}
            <div className={styles.questionContent}>
              <div className={styles.questionBox}>
                <div className={styles.fixedInfo}>
                  <div className={styles.studyTime}>
                    <span> 学习时间：</span>{' '}
                    <span>
                      {' '}
                      {baseInfo.planStartTime}至 {baseInfo.planEndTime}
                    </span>
                  </div>{' '}
                  <div className={styles.classHour}>
                    <span> 课 &emsp; 时：</span>{' '}
                    <span>
                      {' '}
                      {Number(baseInfo.class_hour)}
                      小时
                    </span>
                  </div>{' '}
                  <div className={styles.courseDesc}>
                    <span> 课程介绍：</span>{' '}
                    <span title={baseInfo.intruduce}> {baseInfo.intruduce}</span>
                  </div>{' '}
                  <div className={styles.teacherInfo}>
                    <div className={styles.teacherInfoLeft}>
                      <Avatar size={60} src={baseInfo.teacherimg} alt="老师头像" icon="user" />
                    </div>{' '}
                    <div className={styles.teacherInfoRight}>
                      <div className={styles.teacherJSXM}>
                        <span> 姓名：</span> <span> {baseInfo.teachername}</span>
                      </div>{' '}
                      <div className={styles.teacherInfoJSJS}>
                        <span title={baseInfo.teacherdesc}> {baseInfo.teacherdesc}</span>
                      </div>{' '}
                    </div>{' '}
                  </div>{' '}
                  <div className={classNames(styles.studyProgress, ended ? styles.studyEnded : '')}>
                    {' '}
                    {ended ? '本次学习完成' : '正在学习中'}
                  </div>{' '}
                  <div className={styles.textAreaBox}>
                    <TextArea
                      rows={3}
                      placeholder="输入你的提问内容，培训管理员答复提问后你将收到答复通知。"
                    />
                  </div>{' '}
                  <div className={styles.buttonBox}>
                    <Button type="primary"> 提交</Button>
                  </div>
                </div>{' '}
                <div className={styles.listInfo} />
              </div>{' '}
            </div>
          </div>
        </PageHeaderWrapper>
      </Spin>
    );
  }
}

export default LearnPDF;
