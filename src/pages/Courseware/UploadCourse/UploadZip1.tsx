/* eslint-disable prefer-destructuring */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Button, Row, Col, message, Input, Select, Avatar, Form, InputNumber } from 'antd';
import TreeSelect from '@/components/EditContent/tree';
import SelfCard from '@/components/Workbench/selfCard';
import classNames from 'classnames';
import { Link } from 'umi';
import { useUpdateEffect } from '@umijs/hooks';
import { LimitInput, LimitTextArea } from '@/components/LimitInput';
import { departmentService } from '@/services';
import styles from './UploadZip1.less';

const { TextArea } = Input;
const { Option } = Select;
const FormItem = Form.Item;

function UploadZip1(props) {
  const maxLength = {
    KJMC: 50, // 课件名称最多50字
    KJJS: 500, // 课件介绍最多500字
    SYDX: 50, // 使用对象最多50字
    JSJS: 500, // 讲师介绍最多500字
  };
  const { zipInfo, setZipInfo, next, prev } = props;
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [form] = Form.useForm();

  const onFinish = values => {
    setZipInfo({ ...values, depatments: checkedKeys });
    next();
  };
  return (
    // <Row gutter={24}>
    //   <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
    <Form form={form} initialValues={zipInfo} onFinish={onFinish}>
      <SelfCard title="课程信息">
        <FormItem
          label="课件编号："
          name="courseware_no"
          className={styles.selfFormItem}
          rules={[
            {
              required: true,
              message: '课件编号必填',
            },
          ]}
        >
          <Input maxLength={12} style={{ display: 'none' }} />
        </FormItem>
        <FormItem
          label="课件名称："
          name="name"
          className={styles.selfFormItem}
          rules={[
            {
              required: true,
              message: '课件名称必填',
            },
          ]}
        >
          <LimitInput placeholder="课件名称" maxLength={maxLength.KJMC} />
        </FormItem>
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={8} xxl={8}>
            <FormItem
              label="课件分类："
              name="category"
              className={classNames(styles.selfFormItem, styles.selfFormItemPadding)}
              rules={[
                {
                  required: true,
                  message: '课件分类必填',
                },
              ]}
            >
              <Select>
                <Option value="公开课">公开课</Option>
                <Option value="非公开课">非公开课</Option>
              </Select>
            </FormItem>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={8} xxl={8}>
            <FormItem
              label="课件类型："
              name="type"
              className={classNames(styles.selfFormItem, styles.selfFormItemPadding)}
              rules={[
                {
                  required: true,
                  message: '课件类型必填',
                },
              ]}
            >
              <Select>
                <Option value="通用课件">通用课件</Option>
                <Option value="基础课件">基础课件</Option>
                <Option value="管理课件">管理课件</Option>
                <Option value="其他">其他</Option>
              </Select>
            </FormItem>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={8} xxl={8}>
            <FormItem
              label="课时(小时)"
              name="class_hour"
              className={styles.selfFormItem}
              rules={[
                {
                  required: true,
                  message: '课时必填',
                },
              ]}
            >
              <InputNumber placeholder="课时" step={0.1} />
            </FormItem>
          </Col>
        </Row>
        <FormItem
          label="课件介绍："
          name="intruduce"
          className={styles.selfFormItem}
          rules={[
            {
              required: true,
              message: '课件介绍必填',
            },
          ]}
        >
          <LimitTextArea placeholder="课件介绍" maxLength={maxLength.KJJS} />
        </FormItem>
        <FormItem
          label="适用对象："
          name="applicable_user"
          className={styles.selfFormItem}
          rules={[
            {
              required: true,
              message: '适用对象必填',
            },
          ]}
        >
          <LimitInput placeholder="适用对象" maxLength={maxLength.SYDX} />
        </FormItem>
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={8} xxl={8}>
            <FormItem
              label="课程文件类型"
              name="file_type"
              className={classNames(styles.selfFormItem, styles.selfFormItemPadding)}
              rules={[
                {
                  required: true,
                  message: '课程文件类型必填',
                },
              ]}
            >
              <Select disabled style={{ display: 'none' }}>
                <Option value="0">PDF</Option>
                <Option value="1">MP4</Option>
              </Select>
            </FormItem>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={8} xxl={8}>
            <FormItem
              label="允许视频拖放"
              name="drag_flag"
              className={classNames(styles.selfFormItem, styles.selfFormItemPadding)}
              rules={[
                {
                  required: true,
                  message: '允许视频拖放必填',
                },
              ]}
            >
              <Select>
                <Option value="true">是</Option>
                <Option value="false">否</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <FormItem
          label="课件封面："
          name="cover"
          className={styles.selfFormItem}
          rules={[
            {
              required: true,
              message: '课件封面必填',
            },
          ]}
        >
          <Input style={{ display: 'none' }} />
          {zipInfo.cover ? (
            <img src={zipInfo.cover} alt="课件封面" height="130" />
          ) : (
            <div style={{ width: '230px', height: '130px', background: '#ccc' }} />
          )}
        </FormItem>
        <FormItem label="文件名称" name="courseware_file" className={styles.selfFormItem}>
          <Input disable="true" placeholder="文件名称" />
        </FormItem>
      </SelfCard>
      <SelfCard title="讲师信息">
        <div className={styles.teacherInfo}>
          <div className={styles.teacherInfoLeft}>
            <FormItem
              className={styles.selfFormItem}
              name="teacherimg"
              rules={[
                {
                  required: true,
                  message: '讲师照片必填',
                },
              ]}
            >
              <Input style={{ display: 'none' }} />
              <Avatar size={100} src={zipInfo.teacherimg} alt="老师头像" icon={<UserOutlined />} />
            </FormItem>
          </div>
          <div className={styles.teacherInfoRight}>
            <FormItem
              label="讲师姓名："
              name="teachername"
              className={styles.selfFormItem}
              rules={[
                {
                  required: true,
                  message: '讲师姓名必填',
                },
              ]}
            >
              <Input placeholder="讲师姓名" />
            </FormItem>
            <FormItem
              label="讲师介绍："
              name="teacherdesc"
              className={styles.selfFormItem}
              rules={[
                {
                  required: true,
                  message: '讲师介绍必填',
                },
              ]}
            >
              <TextArea placeholder="讲师介绍" maxLength={maxLength.JSJS} />
            </FormItem>
          </div>
        </div>
      </SelfCard>
      <SelfCard title="选择可以使用本课件的部门">
        <TreeSelect
          onChange={checkedallKeys => setCheckedKeys(checkedallKeys)}
          service={departmentService}
          checkedKeys={checkedKeys}
          name="部门"
        />
      </SelfCard>
      <div className={styles.foonter_btns}>
        <FormItem>
          <Button type="primary" onClick={() => prev()}>
            上一步
          </Button>
          <Button type="primary" htmlType="submit">
            提交
          </Button>

          <Link to="/courseware/coursewareManager/index">
            <Button>取消</Button>
          </Link>
        </FormItem>
      </div>
    </Form>
    // </Col>
    // <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12} className={styles.secondCol}>

    // </Col>
    // </Row>
  );
}
export default UploadZip1;
