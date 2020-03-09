/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { registerFormField, SchemaField, FormPath, CircleButton, TextButton } from '@uform/antd';

import { toArr, isFn } from '@uform/shared';
import { ArrayList } from '@uform/react-shared-components';
import { Card, Icon, Row, Col } from 'antd';
import styled from 'styled-components';

const ArrayComponents = {
  CircleButton,
  TextButton,
  AdditionIcon: () => <Icon type="plus" />,
  RemoveIcon: () => <Icon type="delete" />,
  MoveDownIcon: () => <Icon type="down" />,
  MoveUpIcon: () => <Icon type="up" />,
};

const FormCardsField = styled(props => {
  const { value, schema, className, editable, path, mutators } = props;
  const {
    renderAddition,
    renderRemove,
    renderMoveDown,
    renderMoveUp,
    renderEmpty,
    renderExtraOperations,
    ...componentProps
  } = schema.getExtendsComponentProps() || {};
  const onAdd = () => {
    const items = Array.isArray(schema.items)
      ? schema.items[schema.items.length - 1]
      : schema.items;
    mutators.push(items.getEmptyValue());
  };
  return (
    <div className={className}>
      <ArrayList
        value={value}
        minItems={schema.minItems}
        maxItems={schema.maxItems}
        editable={editable}
        components={ArrayComponents}
        renders={{
          renderAddition,
          renderRemove,
          renderMoveDown,
          renderMoveUp,
          renderEmpty,
        }}
      >
        {toArr(value).map((item, index) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <Card {...componentProps} size="small" className="card-list-item" key={index}>
              <Row
                type="flex"
                justify="space-around"
                align="middle"
                gutter={{ md: 8, lg: 8, xl: 8 }}
              >
                <Col md={2} sm={24}>
                  <div>
                    {index + 1}. {componentProps.title}
                  </div>
                </Col>
                <Col md={18} sm={24}>
                  <SchemaField path={FormPath.parse(path).concat(index)} />
                </Col>
                <Col md={4} sm={24}>
                  <div className="list-extra">
                    <ArrayList.Remove index={index} onClick={() => mutators.remove(index)} />
                    <ArrayList.MoveDown index={index} onClick={() => mutators.moveDown(index)} />
                    <ArrayList.MoveUp index={index} onClick={() => mutators.moveUp(index)} />
                    {isFn(renderExtraOperations)
                      ? renderExtraOperations(index)
                      : renderExtraOperations}
                  </div>
                </Col>
              </Row>
            </Card>
          );
        })}
        <ArrayList.Empty>
          {({ children }) => {
            return (
              <Card
                {...componentProps}
                size="small"
                className="card-list-item card-list-empty"
                onClick={onAdd}
              >
                <div className="empty-wrapper">{children}</div>
              </Card>
            );
          }}
        </ArrayList.Empty>
        <ArrayList.Addition>
          {({ children, isEmpty }) => {
            if (!isEmpty) {
              return (
                <div className="array-cards-addition" onClick={onAdd}>
                  {children}
                </div>
              );
            }
            return null;
          }}
        </ArrayList.Addition>
      </ArrayList>
    </div>
  );
})`
  .ant-card {
    .ant-card {
      box-shadow: none;
    }
    .ant-card-body {
      padding: 0px 10px 0 10px;
    }
    .array-cards-addition {
      box-shadow: none;
      border: 1px solid #eee;
      transition: all 0.35s ease-in-out;
      &:hover {
        border: 1px solid #ccc;
      }
    }
    .ant-form-item {
      margin-bottom: 0px;
      vertical-align: middle;
    }
    .empty-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 10px;
      img {
        height: 85px;
      }
      .ant-btn {
        color: #888;
      }
    }
  }
  .card-list-empty.card-list-item {
    cursor: pointer;
  }

  .array-cards-addition {
    margin-top: 10px;
    margin-bottom: 3px;
    background: #fff;
    display: flex;
    cursor: pointer;
    padding: 5px 0;
    justify-content: center;
    box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.1);
  }
  .card-list-item {
    margin-top: 10px;
    border: 1px solid #eee;
  }
  .card-list-item:first-child {
    margin-top: 0 !important;
  }
  .list-extra {
    display: flex;
    button {
      margin-right: 8px;
    }
  }
`;
registerFormField('list', FormCardsField);
// export default FormCardsField;
