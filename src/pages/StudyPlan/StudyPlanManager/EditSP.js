import React, { Component, Fragment } from 'react';
import { DatePicker, Card, Button, Input, Form, message, Spin } from 'antd';
import moment from 'moment';
import router from 'umi/router';
// import Link from 'umi/link';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import CourseBasicInfo from '@/components/CourseBasicInfo';
import SubmitSuccessCard from '@/components/CustomComponent/SubmitSuccessCard/SubmitSuccessCard';
import styles from './Common.less';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

@connect(({ loading }) => ({
  detailLoading: loading.effects['StudyPlanManager/ViewGetCourseAndPlanInfo'],
}))
@Form.create()
class EditSP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courserTeacherInfo: {}, // 课程信息、讲师信息
      /**
       * 默认是'fail',用于判断编辑是否成功还是失败。
       * 编辑完成提交后失败————'fail' ;
       * 编辑完成提交后成功————'success' ;
       */
      currentStatus: 'fail',
      maxNameLength: 50, // 计划名称最多50字
      nameLengthLeft: 50, // 计划名称剩余字数

      courseName: '', // 课件名称
      studyPlanName: '', // 学习计划名称
      studyPlanStartTime: '', // 学习计划开始时间
      studyPlanEndTime: '', // 学习计划结束时间
    };
  }

  // 页面加载完成后
  componentDidMount() {
    this.getInfo();
  }

  // 根据学习计划id获取课程信息、讲师信息、学习计划名称、学习计划开始时间、学习计划结束时间
  getInfo = () => {
    const {
      dispatch,
      match: {
        params: { studyPlanID },
      },
    } = this.props;
    dispatch({
      type: 'StudyPlanManager/ViewGetCourseAndPlanInfo',
      payload: {
        id: studyPlanID, // id
      },
      callback: res => {
        if (res.status === 'ok') {
          // console.log('请求成功', res);
          this.setState({
            courserTeacherInfo: res.data.course,
            courseName: res.data.course.name, // 课件名称
          });
          this.setFormValue(res.data.name, res.data.start_time, res.data.end_time);
        } else {
          // console.log('请求失败');
        }
      },
    });
  };

  // 为form表单赋值,并修改剩余多少字（包括计划名称和学习开放时间）
  setFormValue = (name, startTime, endTime) => {
    const {
      form: { setFieldsValue },
    } = this.props;
    const { maxNameLength } = this.state; // 最多多少字
    const nameLengthLeft = maxNameLength - name.length; // 剩余多少字
    setFieldsValue({
      studyPlan_name: name,
      studyPlan_time: [moment(startTime, 'YYYY-MM-DD'), moment(endTime, 'YYYY-MM-DD')],
    });
    this.setState({
      nameLengthLeft: nameLengthLeft <= 0 ? 0 : nameLengthLeft,
    });
  };

  // 点击提交
  editSubmit = () => {
    const {
      form: { validateFieldsAndScroll },
    } = this.props;
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('表单值', values);
        const studyTimeRange = values.studyPlan_time;
        const name = values.studyPlan_name; // 学习计划名称
        const startTime = studyTimeRange[0].format('YYYY-MM-DD'); // 学习计划开始时间
        const endTime = studyTimeRange[1].format('YYYY-MM-DD'); // 学习计划结束时间
        this.sendSubmitRequest(name, startTime, endTime);
      }
    });
  };

  // 点击提交按钮，发送的请求
  sendSubmitRequest = (studyPlanName, studyPlanStartTime, studyPlanEndTime) => {
    const {
      dispatch,
      match: {
        params: { studyPlanID },
      },
    } = this.props;
    dispatch({
      type: 'StudyPlanManager/SubmitEditSP',
      payload: {
        id: studyPlanID, // 学习计划ID
        data: {
          name: studyPlanName,
          start_time: studyPlanStartTime,
          end_time: studyPlanEndTime,
        },
      },
      callback: res => {
        if (res.status === 'ok') {
          message.success('提交成功');
          this.setState({
            studyPlanName, // 学习计划名称
            studyPlanStartTime, // 学习计划开始时间
            studyPlanEndTime, // 学习计划结束时间
            currentStatus: 'success',
          });
        } else {
          message.warning('提交失败');
        }
      },
    });
  };

  // 判断剩余多少字
  inputLengthFun = (e, params, total) => {
    const len = total - e.target.value.length;
    this.setState({
      [params]: len <= 0 ? 0 : len,
    });
  };

  render() {
    const { courserTeacherInfo } = this.state;
    const {
      form: { getFieldDecorator },
      detailLoading,
    } = this.props;
    const { currentStatus } = this.state;
    const {
      maxNameLength,
      nameLengthLeft,
      courseName,
      studyPlanName,
      studyPlanStartTime,
      studyPlanEndTime,
    } = this.state;
    const pageHeaderWrapperTitle = () => {
      let title = '';
      if (currentStatus === 'fail') {
        title = '编辑学习计划';
      } else {
        title = '编辑学习计划成功';
      }
      return title;
    };

    return (
      <PageHeaderWrapper title={pageHeaderWrapperTitle()}>
        <Spin spinning={detailLoading}>
          <CourseBasicInfo CousreInfo={courserTeacherInfo} isShow={false} />
        </Spin>
        <Card
          className={styles.detailSP}
          style={{ display: currentStatus === 'fail' ? 'block' : 'none' }}
        >
          <Form hideRequiredMark layout="inline" className={styles.formContent}>
            <FormItem label="计划名称">
              {getFieldDecorator('studyPlan_name', {
                rules: [
                  {
                    required: true,
                    message: '计划名称必填',
                  },
                ],
              })(
                <Input
                  style={{ width: 300 }}
                  placeholder="计划名称"
                  maxLength={maxNameLength}
                  onChange={e => {
                    this.inputLengthFun(e, 'nameLengthLeft', maxNameLength);
                  }}
                />
              )}
              <span className={styles.spanTips}>
                剩余
                <span>{nameLengthLeft}</span>
                个字
              </span>
            </FormItem>

            <FormItem label="学习开放时间">
              {getFieldDecorator('studyPlan_time', {
                rules: [{ type: 'array', required: true, message: '学习开放时间必填' }],
              })(<RangePicker />)}
            </FormItem>
          </Form>
          <div className={styles.foonter_btns}>
            <Button type="primary" onClick={this.editSubmit}>
              提交
            </Button>
            <Button onClick={() => router.push('/studyPlan/studyPlanManager/index')}>取消</Button>
          </div>
        </Card>
        <SubmitSuccessCard
          successFlag={currentStatus}
          title="编辑学习计划成功"
          infoMsgConfig={{
            '课件名称：': courseName,
            '计划名称：': studyPlanName,
            '学习开放时间：': `${studyPlanStartTime}  至  ${studyPlanEndTime}`,
          }}
          btns={
            <Fragment>
              <Button
                type="primary"
                onClick={() => router.push('/studyPlan/studyPlanManager/index')}
              >
                完成
              </Button>
            </Fragment>
          }
        />
      </PageHeaderWrapper>
    );
  }
}

export default EditSP;
