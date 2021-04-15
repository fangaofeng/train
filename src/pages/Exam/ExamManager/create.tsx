import React, { useState } from 'react';
import {
  Form,
  FormItem,
  FormButtonGroup,
  Submit,
  Reset,
  FormEffectHooks,
  FormItemDeepProvider as FormLayout,
  InternalVirtualField as VirtualField,
} from '@formily/antd';
import { Card, Button, Row, Col, Tooltip, Drawer, Radio as RadioAnt } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import {
  Input,
  Radio,
  Checkbox,
  Select,
  DatePicker,
  NumberPicker,
  TimePicker,
  Upload,
  Switch,
  Range,
  Transfer,
  Rating,
} from '@formily/antd-components'; // 或者@formily/next-components
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { paperService } from '@/services';

import {
  ArrayCardFormItemE,
  MultiChecksE,
  RadioChecksE,
  YesOrNoE,
  questionType,
  getquestions,
} from './components';
import style from './style.less';

const CreatePaper = () => {
  const { run, loading } = paperService.createRequest(null, {
    manual: true,
  });
  // const [drawvisible, setDrawvisible] = useState(false);
  // const [types, setTypes] = useState(questionType);
  // const [nodekeyList, setNodeKey] = useState([]);

  // const preAdd = onAddt => {
  //   setDrawvisible(true);
  //   onAddt();
  // };
  const onFinish = values => {
    console.log(values);
    run(values);
  };
  // const onChange = key => {
  //   setNodeKey(nodekeyList.concat(key));
  //   setDrawvisible(false);
  // };

  return (
    <PageHeaderWrapper>
      <Form
        onSubmit={onFinish}
        // editable={state.editable}
        // effects={({ setFieldState }) => {
        //   FormEffectHooks.onFieldValueChange$('bbb').subscribe(({ value }) => {
        //     setFieldState('detailCard', state => {
        //       state.visible = value;
        //     });
        //   });
        //   FormEffectHooks.onFieldValueChange$('ccc').subscribe(({ value }) => {
        //     setFieldState('layout_1', state => {
        //       state.visible = value;
        //     });
        //   });
        // }}
        // labelCol={8}
        // wrapperCol={6}
      >
        <Card title="试卷信息" style={{ marginBottom: 15 }}>
          <FormLayout labelCol={4} wrapperCol={12}>
            <FormItem label="试卷编号" name="info.number" component={Input} />
            <FormItem label="试卷名称" name="info.name" component={Input} />
            <FormItem
              label="考试时长"
              name="time"
              component={NumberPicker}
              min={0}
              max={240}
              formatter={value => `${value}分钟`}
              parser={value => value.replace('分钟', '')}
            >
              <Tooltip title="考试时长可在0~240分钟以内选择">
                <QuestionCircleOutlined style={{ marginLeft: 10 }} />
              </Tooltip>
            </FormItem>
            <FormItem
              label="试卷总分"
              name="score"
              // rules={[
              //   {
              //     required: true,
              //     message: '试卷总分必填',
              //   },
              // ]}
              component={NumberPicker}
              min={0}
              formatter={value => `${value}分`}
              parser={value => value.replace('分', '')}
            />
            <FormItem
              label="合格分数"
              name="passScore"
              // rules={[
              //   {
              //     required: true,
              //     message: '合格分数必填',
              //   },
              // ]}
              component={NumberPicker}
              min={0}
              formatter={value => `${value}分`}
              parser={value => value.replace('分', '')}
            />
            <FormItem
              label="适用对象"
              name="applicablePerson"
              component={Input}
              // rules={[
              //   {
              //     required: true,
              //     message: '适用对象必填',
              //   },
              // ]}
            />
            <FormItem
              label="试卷介绍"
              name="introduce"
              component={Input.TextArea}
              // rules={[
              //   {
              //     required: true,
              //     message: '试卷介绍必填',
              //   },
              // ]}
            />
            <FormItem label="适用课程编号" name="applicableCourseNumber" component={Input} />
            <FormItem label="适用课程名称" name="applicableCourseName" component={Input} />
            <FormItem label="试卷封面" name="cover" component={Input}>
              {/* {paperInfo?.cover ? (
                <img src={paperInfo.cover} alt="课件封面" height="130" />
              ) : (
                <div style={{ width: '230px', height: '130px', background: '#ccc' }} />
              )} */}
            </FormItem>{' '}
          </FormLayout>
        </Card>
        <VirtualField name="detailCard">
          <Card title="详细信息">
            <ArrayCardFormItemE name="examquestions" buTTitle="添加新的题目类型" />
          </Card>
        </VirtualField>

        <FormButtonGroup offset={8} sticky>
          ​<Submit>提交</Submit>​<Button type="primary">取消</Button>
          <Reset>重置</Reset>​
        </FormButtonGroup>
      </Form>
    </PageHeaderWrapper>
  );
};

export default CreatePaper;
