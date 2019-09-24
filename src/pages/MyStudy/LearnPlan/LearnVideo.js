import React, { Component } from 'react';
import {
  Modal,
  Card,
  Button,
  Table,
  Divider,
  Popconfirm,
  Icon,
  Upload,
  Row,
  Col,
  message,
  Input,
  Select,
  Spin,
  Avatar,
} from 'antd';
// import router from 'umi/router';
// import Link from 'umi/link';
import { connect } from 'dva';
import classNames from 'classnames';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import {
  Player,
  BigPlayButton,
  LoadingSpinner,
  ControlBar,
  PlayToggle, // 播放、暂停
  VolumeMenuButton, // 音量
  CurrentTimeDisplay, // 当前时间
  TimeDivider, // 斜杠
  DurationDisplay, // 总时长
  ProgressControl, // 进度条
  PlaybackRateMenuButton, // 倍速
  FullscreenToggle, // 全屏
} from 'video-react';
// import '../../../../node_modules/video-react/dist/video-react.css'
import './video-react.less';
import styles from './Common.less';

const { TextArea } = Input;

@connect(({ loading }) => ({ loading: loading.effects['MyLearnPlan/GetLearnPlanVideoOrPDF'] }))
class LearnVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseInfo: {
        // 获取视频资源，课程信息等
        courseName: '', // 课件名称
        intruduce: '', // 课件简介
        class_hour: '', // 课时
        cover: '', // 课件封面
        teachername: '', // 讲师姓名
        teacherdesc: '', // 讲师介绍
        teacherimg: '', // 老师封面
        canDrag: false, // 是否允许视频拖动
        courseSrc: '', // 课件资源路径
        studyPlanName: '', // 学习计划名称
        planStartTime: '', // 学习计划开始时间
        planEndTime: '', // 学习计划结束时间
      },
      currentTime: 0, // 当前时间点
      ended: false, // 是否已经完成学习

      // paused:true, // true,暂停播放，false，开始播放
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
              canDrag: res.data.plan.course.drag_flag, // 是否允许视频拖动
              courseSrc: res.data.plan.course.courseware_file, // 课件资源路径
              studyPlanName: res.data.plan.name, // 学习计划名称
              planStartTime: res.data.plan.start_time, // 学习计划开始时间
              planEndTime: res.data.plan.end_time, // 学习计划结束时间
            },
            currentTime: Number(res.data.progress.starttime),
            ended: res.data.status === '已完成' || res.data.status === '超期已完成', // 已指派、学习中、已完成、超期已完成、超期未完成
          });
        } else {
          console.log('请求失败');
        }
      },
    });
    // subscribe state change
    this.player.subscribeToStateChange(this.handleStateChange.bind(this));
  }

  componentWillUnmount() {
    // 如果存在this.timer，则使用clearTimeout清空。
    // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
    this.timer && clearTimeout(this.timer);
  }

  // 开始播放后每隔10秒调用一次接口
  setTimeOut = () => {
    this.sendRequest();
    this.timer = setTimeout(() => {
      this.setTimeOut();
    }, 10000);
  };

  // 发送视频的当前时间和播放状态
  sendRequest = () => {
    const {
      match: { params },
      dispatch,
    } = this.props;
    const { player } = this.player.getState();
    const { currentTime } = player;
    const { ended } = player;
    const { id } = params;
    console.log('当前时间：', currentTime);
    console.log('播放完成：', ended); // print current time

    dispatch({
      type: 'MyLearnPlan/SendCurrentTimeAndStatus',
      payload: {
        id,
        data: {
          progress: { starttime: currentTime },
          status: ended ? '已完成' : '学习中',
        },
      },
    });
  };

  /**
   * 监测播放状态
   * 1、是否播放完成
   * 2、是否开始播放、
   * 3、是否暂停播放
   */
  handleStateChange(state, prevState) {
    if (state.ended && !prevState.paused) {
      this.setState({
        ended: true, // 播放完成
      });
      this.sendRequest();
    }
    if (!state.paused && prevState.paused) {
      // 开始播放
      console.log('开始播放');
      console.log(this.timer);
      this.setTimeOut();
    }
    if (state.paused && !prevState.paused) {
      // 暂停播放
      console.log('暂停播放');
      console.log(this.timer);
      this.timer && clearTimeout(this.timer);
    }
  }

  render() {
    const { baseInfo, currentTime, ended } = this.state;
    const { loading } = this.props;
    return (
      <Spin spinning={loading}>
        <PageHeaderWrapper title={`${baseInfo.studyPlanName}(${baseInfo.courseName})`}>
          <div className={styles.videoOrPDFContent}>
            <div className={styles.playerContent}>
              <Player
                ref={dom => {
                  this.player = dom;
                }}
                fluid={false}
                width="100%"
                height="100%"
                poster={baseInfo.cover}
                src={baseInfo.courseSrc}
                startTime={currentTime}
              >
                <BigPlayButton position="center" />
                <LoadingSpinner />
                <ControlBar disableDefaultControls>
                  <PlayToggle order={1.1} />
                  <VolumeMenuButton vertical order={2.1} />
                  <CurrentTimeDisplay order={4.1} />
                  <TimeDivider order={4.2} />
                  <DurationDisplay order={4.3} />
                  {baseInfo.canDrag && <ProgressControl order={5.1} />}
                  <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
                  <FullscreenToggle order={10.1} />
                </ControlBar>
              </Player>
            </div>
            <div className={styles.questionContent}>
              <div className={styles.questionBox}>
                <div className={styles.fixedInfo}>
                  <div className={styles.studyTime}>
                    <span>学习时间：</span>
                    <span>
                      {baseInfo.planStartTime} 至 {baseInfo.planEndTime}
                    </span>
                  </div>
                  <div className={styles.classHour}>
                    <span>课&emsp;&emsp;时：</span>
                    <span>
                      {Number(baseInfo.class_hour)}
                      小时
                    </span>
                  </div>
                  <div className={styles.courseDesc}>
                    <span>课程介绍：</span>
                    <span title={baseInfo.intruduce}>{baseInfo.intruduce}</span>
                  </div>
                  <div className={styles.teacherInfo}>
                    <div className={styles.teacherInfoLeft}>
                      <Avatar size={60} src={baseInfo.teacherimg} alt="老师头像" icon="user" />
                    </div>
                    <div className={styles.teacherInfoRight}>
                      <div className={styles.teacherJSXM}>
                        <span>姓名：</span>
                        <span>{baseInfo.teachername}</span>
                      </div>
                      <div className={styles.teacherInfoJSJS}>
                        <span title={baseInfo.teacherdesc}>{baseInfo.teacherdesc}</span>
                      </div>
                    </div>
                  </div>
                  <div className={classNames(styles.studyProgress, ended ? styles.studyEnded : '')}>
                    {ended ? '学习完成' : '学习中'}
                  </div>
                  <div className={styles.textAreaBox}>
                    <TextArea
                      rows={3}
                      placeholder="输入你的提问内容，培训管理员答复提问后你将收到答复通知。"
                    />
                  </div>
                  <div className={styles.buttonBox}>
                    <Button type="primary">提交</Button>
                  </div>
                </div>
                <div className={styles.listInfo} />
              </div>
            </div>
          </div>
        </PageHeaderWrapper>
      </Spin>
    );
  }
}

export default LearnVideo;
