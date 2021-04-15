import React, { useState } from 'react';

import { Button, Card, Row, Col, Divider, Drawer } from 'antd';

import { FormItem, InternalFieldList as FieldList } from '@formily/antd';
import { Input, Radio, Checkbox, NumberPicker } from '@formily/antd-components';
import { MinusOutlined, PlusOutlined, UpOutlined, DownOutlined } from '@ant-design/icons';
import style from './style.less';

const orderNo = 'ABCDEFGHJIK';
export const ArrayCardFormItemR = props => {
  const { children, name = 'list', title = '', buTTitle = '添加新的数据' } = props;
  return (
    <FieldList name={name}>
      {({ state, mutators }) => {
        const { value } = state;
        return (
          <div>
            {value.map((item, index) => (
              <Card title={`${index + 1}.${title}`} style={{ marginBottom: '8px' }}>
                {children({ item, index, state, mutators })}
              </Card>
            ))}
          </div>
        );
      }}
    </FieldList>
  );
};

export const ListFormItemE = props => {
  const {
    children,
    name = 'list',
    title = null,
    buTTitle = '',
    size = null,
    maxLen = orderNo.length,
    minLen = 1,
  } = props;
  return (
    <FieldList name={name}>
      {({ state, mutators }) => {
        const { value } = state;

        if (value.length < minLen) {
          const t = minLen - value.length;
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < t; i++) value.push({});
        }
        const onAdd = () => mutators.push();
        return (
          <div>
            {value.map((item, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <FormItem
                name={`${name}.${index}_layout`}
                label={title ? title(index) : `${index + 1}`}
              >
                <Row type="flex" justify="start" gutter={{ md: 8, lg: 8, xl: 8 }}>
                  <Col md={20} sm={24}>
                    {children({ item, index, state, mutators })}
                  </Col>
                  <Col md={4} sm={24}>
                    {value.length > 0 ? (
                      <div className={style.extra_btns}>
                        {index === 0 ? null : (
                          <Button
                            size={size}
                            shape="circle"
                            icon={<UpOutlined />}
                            onClick={() => mutators.moveUp(index)}
                          />
                        )}
                        {index === value.length - 1 ? null : (
                          <Button
                            size={size}
                            shape="circle"
                            icon={<DownOutlined />}
                            onClick={() => mutators.moveDown(index)}
                          />
                        )}

                        <Button
                          size={size}
                          shape="circle"
                          icon={<MinusOutlined />}
                          onClick={() => mutators.remove(index)}
                        />
                      </div>
                    ) : null}
                  </Col>
                </Row>
              </FormItem>
            ))}
            {buTTitle && value.length < maxLen ? (
              <div style={{ textAlign: 'center' }}>
                <Button
                  type="dashed"
                  style={{ width: '80%' }}
                  icon={<PlusOutlined />}
                  onClick={() => {
                    onAdd();
                  }}
                >
                  {buTTitle}
                </Button>
              </div>
            ) : null}
          </div>
        );
      }}
    </FieldList>
  );
};
export const ListFormItemR = props => {
  const { children, name = 'list', title = '' } = props;
  return (
    <FieldList name={name}>
      {({ state, mutators }) => {
        const { value } = state;
        return (
          <div>
            {value.map((item, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <FormItem name={`${name}.${index}_layout`} label={`${index + 1}.`}>
                {children({ item, index, state, mutators })}
              </FormItem>
            ))}
          </div>
        );
      }}
    </FieldList>
  );
};
export const QuestionsE = props => {
  const { name, children } = props;

  return (
    <ListFormItemE name={name} buTTitle="添加问题">
      {({ index, state }) => (
        <>
          <FormItem
            label="问题"
            name={`${state.name}.${index}.question`}
            component={Input.TextArea}
          />
          <FormItem name="answers_layout" label="选项">
            <Card>
              {children({ index, state })}
              {/* <ListFormItemE
                name={`${state.name}.${index}.answers`}
                buTTitle={buTTitle}
                title={title}
                size="small"
              >
                {({ index: indext, state: statet }) => children({ index: indext, state: statet })}
              </ListFormItemE> */}
            </Card>
          </FormItem>
          <FormItem
            label="分值"
            name={`${state.name}.${index}.score`}
            step={0.5}
            component={NumberPicker}
          />
          <Divider />
        </>
      )}
    </ListFormItemE>
  );
};
const titlefunc = index => orderNo[index];
export const MultiChecksE = props => {
  const { name, buTTitle = '添加选项' } = props;

  return (
    <QuestionsE name={`${name}.multichoice`} title="多选">
      {({ index, state }) => (
        <ListFormItemE
          name={`${state.name}.${index}.answers`}
          buTTitle={buTTitle}
          title={titlefunc}
          size="small"
          minLen={2}
        >
          {({ index: indext, state: statet }) => (
            <div className={style.formContent}>
              <FormItem
                name={`${statet.name}.${indext}.choice`}
                component={Checkbox}
                dataSource={['1']}
              />
              <FormItem
                name={`${statet.name}.${indext}.answer`}
                itemStyle={{ width: '100%' }}
                component={Input.TextArea}
              />
            </div>
          )}
        </ListFormItemE>
      )}
    </QuestionsE>
  );
};

export const RadioChecksE = props => {
  const { name, title = '单选', buTTitle = '添加选项' } = props;
  return (
    <QuestionsE name={`${name}.singlechoice`} title={title}>
      {({ index, state }) => (
        <ListFormItemE
          name={`${state.name}.${index}.answers`}
          buTTitle={buTTitle}
          title={titlefunc}
          size="small"
          minLen={2}
        >
          {({ index: indext, state: statet }) => (
            <div className={style.formContent}>
              <FormItem
                name={`${statet.name}.${indext}.choice`}
                component={Radio.Group}
                dataSource={[{ label: '', value: indext }]}
              />
              <FormItem
                name={`${statet.name}.${indext}.answer`}
                itemStyle={{ width: '100%' }}
                component={Input.TextArea}
              />
            </div>
          )}
        </ListFormItemE>
      )}
    </QuestionsE>
  );
};

export const YesOrNoE = props => {
  const { name, buTTitle = null, title = '判断' } = props;
  return (
    <QuestionsE name={`${name}.yesorno`} title={title} buTTitle={buTTitle}>
      {({ index, state }) => (
        <div className={style.formContent}>
          <FormItem
            name={`${state.name}.${index}.choice`}
            component={Radio.Group}
            dataSource={['正确', '错误']}
          />
        </div>
      )}
    </QuestionsE>
  );
};

export const Questions = props => {
  const { name, children } = props;
  return (
    <ListFormItemR name={name}>
      {({ index, state }) => (
        <>
          <FormItem
            label="问题"
            editable={false}
            name={`${state.name}.${index}.question`}
            component={Input.TextArea}
          />
          <FormItem name="answers_layout" label="选项">
            {children({ index, state })}
          </FormItem>
          <FormItem
            label="分值"
            name={`${state.name}.${index}.score`}
            step={0.5}
            component={NumberPicker}
          />
          <Divider />
        </>
      )}
    </ListFormItemR>
  );
};

export const MultiChecks = props => {
  const { name } = props;
  return (
    <Questions name={`${name}.multichoice`}>
      {({ index, state }) => (
        <FormItem name={`${state.name}.${index}.choice`} component={Checkbox.Group} />
      )}
    </Questions>
  );
};

export const RadioChecks = props => {
  const { name } = props;
  return (
    <Questions name={`${name}.singlechoice`}>
      {({ index, state }) => (
        <FormItem name={`${state.name}.${index}.choice`} component={Radio.Group} />
      )}
    </Questions>
  );
};

export const YesOrNo = props => {
  const { name } = props;
  return (
    <Questions name={`${name}.YesOrNo`}>
      {({ index, state }) => (
        <FormItem name={`${state.name}.${index}.choice`} component={Radio.Group} />
      )}
    </Questions>
  );
};
export const questionType = {
  multichoice: { label: '多选', value: 'multichoice', node: MultiChecksE },
  singlechoice: { label: '单选', value: 'singlechoice', node: RadioChecksE },
  yesorno: { label: '判断', value: 'yesorno', node: YesOrNoE },
  // asked: { label: '问答', value: 'asked', node: () => <></> },
};

export const getquestions = (value, props) => {
  return questionType[value].node({ title: questionType[value].label, ...props });
};

export const Test = props => {
  const { state, mutators, buTTitle, title } = props;
  const [drawvisible, setDrawvisible] = useState<boolean>(false);
  const [types, setTypes] = useState(Object.assign({}, questionType));
  const { value } = state;
  const preAdd = () => {
    setDrawvisible(true);
  };

  const onChange = key => {
    setDrawvisible(false);
    mutators.push({ [key]: [] });
    delete types[key];
  };

  return (
    <div>
      {value.map((item, index) => {
        const key = Object.keys(item).pop(0);
        return (
          <Card
            title={`${index + 1}.${questionType[key].label}`}
            style={{ marginBottom: '8px' }}
            extra={
              value.length > 0 ? (
                <div className={style.extra_btns}>
                  {index === 0 ? null : (
                    <Button
                      shape="circle"
                      icon={<UpOutlined />}
                      onClick={() => mutators.moveUp(index)}
                    />
                  )}
                  {index === value.length - 1 ? null : (
                    <Button
                      shape="circle"
                      icon={<DownOutlined />}
                      onClick={() => mutators.moveDown(index)}
                    />
                  )}

                  <Button
                    shape="circle"
                    icon={<MinusOutlined />}
                    onClick={() => mutators.remove(index)}
                  />
                </div>
              ) : null
            }
          >
            {getquestions(key, { name: `${state.name}.${index}` })}
          </Card>
        );
      })}
      <Button
        type="dashed"
        style={{ width: '100%' }}
        icon={<PlusOutlined />}
        onClick={() => {
          preAdd();
        }}
      >
        {buTTitle}
      </Button>
      <Drawer
        title="题目类型"
        placement="right"
        closable={false}
        onClose={() => setDrawvisible(false)}
        visible={drawvisible}
      >
        {Object.keys(types).map(key => {
          return (
            <Button onClick={() => onChange(key)} style={{ marginBottom: 10 }} key={key} block>
              {types[key].label}
            </Button>
          );
        })}
      </Drawer>
    </div>
  );
};
export const ArrayCardFormItemE = props => {
  const { name = 'list', title = '', buTTitle = '添加新的数据' } = props;

  return (
    <FieldList name={name}>
      {({ state, mutators }) => Test({ state, mutators, ...props })}
    </FieldList>
  );
};
