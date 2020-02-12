import React from 'react';
import { List, Icon } from 'antd';
import ViewList from '@/components/ViewPage/viewList';
import ArticleListContent from '@/components/ArticleListContent';
import moment from 'moment';
import Link from 'umi/link';

export default () => {
  const datalist = state => state.Announcement.articleList;
  const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );
  const renderItem = item => (
    <List.Item
      key={item.id}
      actions={[
        <IconText type="star-o" text="156" key="list-vertical-star-o" />,
        <IconText
          type="star-o"
          text={moment(item.pub_time).format('YYYY-MM-DD HH:mm')}
          key="list-vertical-star-o"
        />,
      ]}
      extra={
        <Link to={`/announcement/detail/${item.id}`}>
          <img height={172} alt="" src={item.thumbnail} />
        </Link>
      }
    >
      <List.Item.Meta
        // avatar={<Avatar src={item.avatar} />}
        title={<Link to={`/announcement/detail/${item.id}`}>{item.title} </Link>}
        description={<Link to={`/announcement/detail/${item.id}`}>{item.description} </Link>}
      />
      <ArticleListContent data={item} />
    </List.Item>
  );

  const props = {
    action: 'Announcement/GetArticleLists',
    name: '公告',
    datalist,
    renderItem,
  };

  return ViewList(props);
};
