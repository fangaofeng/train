import React, { useState } from 'react';
import { DatePicker, Card, Button, Input, Spin, Form } from 'antd';
import moment from 'moment';
import { history } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ExamBasicInfo from '@/components/ExamBasicInfo';
import SubmitSuccessCard from '@/components/SubmitSuccessCard';
import ViewSelect from '@/pages/TrainGroupManager/ViewSelect';
import { examplanService, paperService } from '@/services';
import styles from './Common.less';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

function EditExamPlan(props) {
  const maxNameLength = 50; // 考试名称最多50字
  const {
    match: {
      params: { examID },
    },
  } = props;
  const [currentStatus, setCurrentStatus] = useState('edit');
  const [traingroups, setTraingroups] = useState([]);
  const [planState, setPlanState] = useState({
    name: '', // 考试计划名称
    start_time: '', // 考试计划开始时间
    end_time: '', // 考试计划结束时间})
  });

  const [nameLengthLeft, setNameLengthLeft] = useState(maxNameLength);

  const { data: paper, loading } = paperService.retriveRequest(examID);

  const create = examplanService.createRequest(null, {
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
      title = '创建考试计划';
    } else {
      title = '创建考试计划成功';
    }
    return title;
  };

  return (
    <PageHeaderWrapper title={pageHeaderWrapperTitle()}>
      <Spin spinning={loading}>
        <ExamBasicInfo isShow={currentStatus === 'success'} ExamInfo={paper} />
      </Spin>
      <Card
        className={styles.testInfoDetail}
        style={{ display: currentStatus === 'edit' ? 'block' : 'none' }}
      >
        <Form hideRequiredMark layout="inline" onFinish={onFinish} className={styles.formContent}>
          <FormItem
            label="考试名称"
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
              placeholder="考试名称"
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
            label="考试开放时间"
            name="examPlan_time"
            rules={[{ type: 'array', required: true, message: '考试开放时间必填' }]}
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
          <Button onClick={() => history.push('/examPlan/examPlanManager/index')}>取消</Button>
        </div>
      </Card>

      <SubmitSuccessCard
        successFlag={currentStatus}
        title="编辑考试计划成功"
        infoMsgConfig={{
          '计划名称：': planState.name,
          '考试开放时间：': `${planState.start_time}  至  ${planState.end_time}`,
        }}
        btns={
          <>
            <Button type="primary" onClick={() => history.push('/examPlan/examPlanManager/index')}>
              完成
            </Button>
          </>
        }
      />
    </PageHeaderWrapper>
  );
}

export default EditExamPlan;
