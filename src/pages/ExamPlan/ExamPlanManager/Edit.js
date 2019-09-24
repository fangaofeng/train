import React, { Component, Fragment } from 'react';
import { DatePicker, Card, Button, Input, Form, message, Spin } from 'antd';
import moment from 'moment';
import router from 'umi/router';
// import Link from 'umi/link';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ExamBasicInfo from '@/components/CustomComponent/ExamBasicInfo/ExamBasicInfo';
import SubmitSuccessCard from '@/components/CustomComponent/SubmitSuccessCard/SubmitSuccessCard';
import styles from './Common.less';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

@connect(({ ExamPlanManager, loading }) => ({
  examplanLoading: loading.effects['ExamPlanManager/GetExamplanDetail'],
}))
@Form.create()
class EditExamPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTestInfo: {},
      /**
       * 默认是'fail',用于判断编辑是否成功还是失败。
       * 编辑完成提交后失败————'fail' ;
       * 编辑完成提交后成功————'success' ;
       */
      currentStatus: 'fail',
      maxNameLength: 50, // 考试名称最多50字
      nameLengthLeft: 50, // 考试名称剩余字数
      examPlanName: '', // 考试计划名称
      examPlanStartTime: '', // 考试计划开始时间
      examPlanEndTime: '', // 考试计划结束时间
    };
  }

  componentDidMount() {
    this.getExamInfo();
  }

  // 根据考试计划id获取课程信息、讲师信息、考试计划名称、考试计划开始时间、考试计划结束时间
  // 获取试卷信息
  getExamInfo = () => {
    const {
      dispatch,
      match: {
        params: { examPlanID },
      },
    } = this.props;
    dispatch({
      type: 'ExamPlanManager/GetExamplanDetail',
      payload: {
        id: examPlanID, // id
      },
      callback: res => {
        if (res.status === 'ok') {
          console.log('请求成功');
          this.setState({
            currentTestInfo: res.data.exampaper,
          });
          this.setFormValue(res.data.name, res.data.start_time, res.data.end_time);
        } else {
          console.log('请求失败');
        }
      },
    });
  };
  // 页面加载完成后

  // 为form表单赋值,并修改剩余多少字（包括计划名称和考试开放时间）
  setFormValue = (name, startTime, endTime) => {
    const {
      form: { setFieldsValue },
    } = this.props;
    const { maxNameLength } = this.state; // 最多多少字
    const nameLengthLeft = maxNameLength - name.length; // 剩余多少字
    setFieldsValue({
      name,
      examPlan_time: [
        moment(startTime, 'YYYY-MM-DD HH:mm:00'),
        moment(endTime, 'YYYY-MM-DD HH:mm:00'),
      ],
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
        const examTimeRange = values.examPlan_time;
        const { name } = values; // 考试计划名称
        const startTime = examTimeRange[0].format('YYYY-MM-DD HH:mm:00'); // 考试计划开始时间
        const endTime = examTimeRange[1].format('YYYY-MM-DD HH:mm:00'); // 考试计划结束时间
        this.sendSubmitRequest(name, startTime, endTime);
      }
    });
  };

  // 点击提交按钮，发送的请求
  sendSubmitRequest = (examPlanName, examPlanStartTime, examPlanEndTime) => {
    const {
      dispatch,
      match: {
        params: { examPlanID },
      },
    } = this.props;
    dispatch({
      type: 'ExamPlanManager/SubmitEditExamplan',
      payload: {
        id: examPlanID, // 考试计划ID
        data: {
          name: examPlanName,
          start_time: examPlanStartTime,
          end_time: examPlanEndTime,
        },
      },
      callback: res => {
        if (res.status === 'ok') {
          message.success('提交成功');
          this.setState({
            examPlanName, // 考试计划名称
            examPlanStartTime, // 考试计划开始时间
            examPlanEndTime, // 考试计划结束时间
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
    const { currentTestInfo } = this.state;
    const {
      form: { getFieldDecorator },
      examplanLoading,
    } = this.props;
    const { currentStatus } = this.state;
    const {
      maxNameLength,
      nameLengthLeft,
      examPlanName,
      examPlanStartTime,
      examPlanEndTime,
    } = this.state;
    const pageHeaderWrapperTitle = () => {
      let title = '';
      if (currentStatus === 'fail') {
        title = '编辑考试计划';
      } else {
        title = '编辑考试计划成功';
      }
      return title;
    };

    return (
      <PageHeaderWrapper title={pageHeaderWrapperTitle()}>
        <Spin spinning={examplanLoading}>
          <ExamBasicInfo
            isShow={currentStatus === 'success'}
            detailConfig={{
              ...currentTestInfo,
            }}
          />
        </Spin>
        <Card
          className={styles.testInfoDetail}
          style={{ display: currentStatus === 'fail' ? 'block' : 'none' }}
        >
          <Form hideRequiredMark layout="inline" className={styles.formContent}>
            <FormItem label="考试名称">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '名称必填',
                  },
                ],
              })(
                <Input
                  style={{ width: 300 }}
                  placeholder="考试名称"
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

            <FormItem label="考试开放时间">
              {getFieldDecorator('examPlan_time', {
                rules: [{ type: 'array', required: true, message: '考试开放时间必填' }],
              })(
                <RangePicker
                  dropdownClassName={styles.customerRangePicker}
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm:00"
                  showToday
                />
              )}
            </FormItem>
          </Form>
          <div className={styles.foonter_btns}>
            <Button type="primary" onClick={this.editSubmit}>
              提交
            </Button>
            <Button onClick={() => router.push('/examPlan/examPlanManager/index')}>取消</Button>
          </div>
        </Card>

        <SubmitSuccessCard
          successFlag={currentStatus}
          title="编辑考试计划成功"
          infoMsgConfig={{
            '计划名称：': examPlanName,
            '考试开放时间：': `${examPlanStartTime}  至  ${examPlanEndTime}`,
          }}
          btns={
            <Fragment>
              <Button type="primary" onClick={() => router.push('/examPlan/examPlanManager/index')}>
                完成
              </Button>
            </Fragment>
          }
        />
      </PageHeaderWrapper>
    );
  }
}

export default EditExamPlan;
