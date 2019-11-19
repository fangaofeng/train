import React, { PureComponent } from 'react';
// import '../../../../node_modules/video-react/dist/video-react.css'
import 'video-react/dist/video-react.css';
// import './video-react.less';
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

class LearnVideo extends PureComponent {
  componentDidMount() {
    // 禁用浏览器鼠标右键操作
    // window.document.oncontextmenu = () => false;
    // subscribe state change
    this.player.subscribeToStateChange(this.handleStateChange.bind(this));
  }

  componentWillUnmount() {
    window.document.oncontextmenu = () => true;
    // eslint-disable-next-line no-unused-expressions
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
    const { sendRequest } = this.props;
    const { player } = this.player.getState();
    const { currentTime } = player;
    const { ended } = player;

    sendRequest({ starttime: currentTime }, ended);
  };

  /**
   * 监测播放状态
   * 1、是否播放完成
   * 2、是否开始播放、
   * 3、是否暂停播放
   */
  handleStateChange(state, prevState) {
    if (state.ended && !prevState.paused) {
      this.sendRequest();
    }
    if (!state.paused && prevState.paused) {
      // 开始播放
      // console.log('开始播放');
      // console.log(this.timer);
      this.setTimeOut();
    }
    if (state.paused && !prevState.paused) {
      // 暂停播放
      // console.log('暂停播放');
      // console.log(this.timer);
      // eslint-disable-next-line no-unused-expressions
      this.timer && clearTimeout(this.timer);
    }
  }

  render() {
    const { course, currentTime } = this.props;
    return (
      <Player
        ref={dom => {
          this.player = dom;
        }}
        fluid={false}
        width="100%"
        height="100%"
        poster={course.cover}
        src={course.courseware_file}
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
          {course.drag_flag && <ProgressControl order={5.1} />}
          <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
          <FullscreenToggle order={10.1} />
        </ControlBar>
      </Player>
    );
  }
}

export default LearnVideo;
