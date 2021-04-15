import React, { useState } from 'react';
import { DatePicker, Card, Button, Input, message, Spin, Form } from 'antd';
import moment from 'moment';
import { history } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import CourseBasicInfo from '@/components/CourseBasicInfo';
import SubmitSuccessCard from '@/components/SubmitSuccessCard';
import ViewSelect from '@/pages/TrainGroupManager/ViewSelect';
import { learnplanService, coursewareService } from '@/services';
import styles from './Common.less';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

function EditExamPlan(props) {
  const maxNameLength = 50; // 课程名称最多50字
  const {
    match: {
      params: { courseId },
    },
  } = props;
  const [currentStatus, setCurrentStatus] = useState('edit');
  const [traingroups, setTraingroups] = useState([]);
  const [planState, setPlanState] = useState({
    name: '', // 课程计划名称
    start_time: '', // 课程计划开始时间
    end_time: '', // 课程计划结束时间})
  });

  const [nameLengthLeft, setNameLengthLeft] = useState(maxNameLength);

  const { data: courese, loading } = coursewareService.retriveRequest(courseId);

  const create = learnplanService.createRequest(null, {
    manual: true,
    onSuccess: result => {
      if (result) {
        setCurrentStatus('success');
        // message.success(`创建成功 ${params[0]}`);
      }
    },
  });

  const onFinish = values => {
    const examTimeRange = values.examPlan_time;
    const data = {
      name: values.name,
      start_time: examTimeRange[0].format('YYYY-MM-DD HH:mm:00'),
      end_time: examTimeRange[1].format('YYYY-MM-DD HH:mm:00'),
    };
    setPlanState(data);
    // if (examPlanID) patch.run(examPlanID, data);
    create.run({ ...data, traingroups });
  };

  // 判断剩余多少字
  const inputLengthFun = (valuelength, params, total) => {
    const len = total - valuelength;
    setNameLengthLeft(len <= 0 ? 0 : len);
  };

  const pageHeaderWrapperTitle = () => {
    let title = '';
    if (currentStatus === 'edit') {
      title = '创建课程计划';
    } else {
      title = '创建课程计划成功';
    }
    return title;
  };

  return (
    <PageHeaderWrapper title={pageHeaderWrapperTitle()}>
      <Spin spinning={loading}>
        <CourseBasicInfo isShow={currentStatus === 'success'} CousreInfo={courese} />
      </Spin>
      <Card
        className={styles.testInfoDetail}
        style={{ display: currentStatus === 'edit' ? 'block' : 'none' }}
      >
        <Form hideRequiredMark layout="inline" onFinish={onFinish} className={styles.formContent}>
          <FormItem
            label="课程名称"
            name="name"
            rules={[
              {
                required: true,
                message: '名称必填',
              },
            ]}
          >
            <Input
              style={{ width: 300 }}
              placeholder="课程名称"
              maxLength={maxNameLength}
              onChange={e => {
                inputLengthFun(e.target.value.length, 'nameLengthLeft', maxNameLength);
              }}
            />
            <span className={styles.spanTips}>
              剩余
              <span>{nameLengthLeft}</span>
              个字
            </span>
          </FormItem>

          <FormItem
            label="课程开放时间"
            name="examPlan_time"
            rules={[{ type: 'array', required: true, message: '课程开放时间必填' }]}
          >
            <RangePicker
              dropdownClassName={styles.customerRangePicker}
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm:00"
            />
          </FormItem>
        </Form>
        <div className={styles.tableContent}>
          <ViewSelect onSelectKeys={onSelectKeys => setTraingroups(onSelectKeys)} />
        </div>
        <div className={styles.foonter_btns}>
          <Button type="primary" loading={create.loading} htmlType="submit">
            提交
          </Button>
          <Button onClick={() => history.push('/studyPlan/studyPlanManager/index')}>取消</Button>
        </div>
      </Card>

      <SubmitSuccessCard
        successFlag={currentStatus}
        title="编辑课程计划成功"
        infoMsgConfig={{
          '计划名称：': planState.name,
          '课程开放时间：': `${planState.start_time}  至  ${planState.end_time}`,
        }}
        btns={
          <>
            <Button
              type="primary"
              onClick={() => history.push('/studyPlan/studyPlanManager/index')}
            >
              完成
            </Button>
          </>
        }
      />
    </PageHeaderWrapper>
  );
}

export default EditExamPlan;
