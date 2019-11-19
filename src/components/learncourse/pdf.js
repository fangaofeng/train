import React, { useReducer, useRef } from 'react';
import { Divider, Icon, Layout } from 'antd';
// import router from 'umi/router';
// import Link from 'umi/link';

import { Document, Page } from 'react-pdf';
import screenfull from 'screenfull';
// import web from '@/assets/main.pdf'
import styles from './Common.less';

const { Footer, Content } = Layout;
// @connect(({ loading }) => ({
//   loading: loading.effects['MyLearnPlan/GetLearnPlanVideoOrPDF'],
// }))
const initialState = {
  numPages: 0,
  scale: 1.2,
  pageNumber: 1,
  isFullscreen: false,
  ended: false,
};
function reducer(state, action) {
  switch (action.type) {
    case 'numPages':
      return { ...state, numPages: action.numPages };
    case 'pageNumber':
      if (state.pageNumber === state.numPages) {
        return { ...state, pageNumber: action.pageNumber, ended: true };
      }
      return { ...state, pageNumber: action.pageNumber };
    case 'scale':
      return { ...state, scale: action.scale };
    case 'isFullscreen':
      return { ...state, isFullscreen: !state.isFullscreen };
    default:
      throw new Error();
  }
}
function PdfViewer(props) {
  const { courseSrc, sendRequest, pageNumber } = props;

  const [state, statedispatch] = useReducer(reducer, { ...initialState, pageNumber });

  const pdfPlayer = useRef(null);
  // pdf是否成功加载
  const onDocumentLoadSuccess = ({ numPages }) => {
    statedispatch({ type: 'numPages', numPages });
  };

  // pdf缩小
  const zoomDecrease = () => {
    let { scale } = state;
    if (scale <= 0.5) {
      return;
    }
    scale -= 0.1;

    statedispatch({ type: 'scale', scale });
  };

  // pdf放大
  const zoomAdd = () => {
    let { scale } = state;
    if (scale >= 2.5) {
      return;
    }
    scale += 0.1;
    statedispatch({ type: 'scale', scale });
  };

  // 上一页
  const previousPage = () => {
    let { pageNumber: tPageNumber } = state;
    if (tPageNumber === 1) {
      return;
    }
    tPageNumber -= 1;
    statedispatch({ type: 'pageNumber', tPageNumber });
    sendRequest(
      {
        numpage: tPageNumber,
      },
      state.ended
    );
  };

  // 下一页
  const nextPage = () => {
    let { tPageNumber } = state;
    if (tPageNumber === state.numPages) {
      return;
    }

    tPageNumber += 1;
    statedispatch({ type: 'pageNumber', tPageNumber });
    sendRequest(
      {
        numpage: pageNumber,
      },
      state.ended
    );
  };

  // 全屏
  const screenFull = () => {
    if (screenfull.enabled) {
      screenfull.toggle(pdfPlayer.current);
      statedispatch({ type: 'isFullscreen' });
    }
  };

  return (
    <div className={styles.videoOrPDFContent}>
      <div className={styles.pdfContent} ref={pdfPlayer}>
        <Layout>
          <Content className={styles.pdfDocumentContent}>
            <Document file={courseSrc} renderMode="canvas" onLoadSuccess={onDocumentLoadSuccess}>
              <Page
                pageNumber={state.pageNumber}
                scale={state.scale} // 缩放
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </Document>
          </Content>
          <Footer className={styles.pdfFooter}>
            {' '}
            {/* <div className={styles.pdfFooter}> */}
            <div>
              <Icon
                type="zoom-out"
                onClick={zoomDecrease}
                title="缩小"
                style={{
                  cursor: state.scale <= 0.5 ? 'unset' : 'pointer',
                }}
              />{' '}
              <Divider
                type="vertical"
                style={{
                  height: '18px',
                  background: '#ccc',
                  margin: '0 15px',
                }}
              />{' '}
              <Icon
                type="zoom-in"
                onClick={zoomAdd}
                title="放大"
                style={{
                  cursor: state.scale >= 2.5 ? 'unset' : 'pointer',
                }}
              />
            </div>{' '}
            <div>
              <Icon
                type="left"
                onClick={previousPage}
                title={state.pageNumber === 1 ? '已经是第一页' : '上一页'}
                style={{
                  cursor: state.pageNumber === 1 ? 'unset' : 'pointer',
                }}
              />{' '}
              <span
                style={{
                  padding: '0 15px',
                }}
              >
                {' '}
                {state.pageNumber}/ {state.numPages}
              </span>
              <Icon
                type="right"
                onClick={nextPage}
                title={state.pageNumber === state.numPages ? '已经是最后一页' : '下一页'}
                style={{
                  cursor: state.pageNumber === state.numPages ? 'unset' : 'pointer',
                }}
              />
            </div>{' '}
            <div>
              <Icon
                type={state.isFullscreen ? 'fullscreen-exit' : 'fullscreen'}
                title="全屏查看"
                style={{
                  cursor: 'pointer',
                }}
                onClick={screenFull}
              />
            </div>{' '}
            {/* </div> */}
          </Footer>
        </Layout>
        {/* <div className={styles.pdfDocumentContent} />{' '} */}
      </div>{' '}
    </div>
  );
}

export default PdfViewer;
