import React from 'react';
import { Icon } from 'antd';
// 系统管理员
// 工作台
const WorkbenchSvg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 60 60">
    <path d="M50.61,43.35H9.51a7.9,7.9,0,0,1-7.88-7.89V12.36A7.89,7.89,0,0,1,9.51,4.47H50.61a7.9,7.9,0,0,1,7.89,7.89V35.47A7.9,7.9,0,0,1,50.61,43.35ZM9.51,8.34a4,4,0,0,0-4,4V35.47a4,4,0,0,0,4,4H50.61a4,4,0,0,0,4-4V12.36a4,4,0,0,0-4-4Z" />
    <path d="M45.74,54.78H15.43a1.93,1.93,0,0,1,0-3.86H45.74a1.93,1.93,0,1,1,0,3.86Z" />
    <path d="M14.79,34.15a1.93,1.93,0,0,1-1.44-3.22L22,21.27a2,2,0,0,1,1.53-.64A1.93,1.93,0,0,1,25,21.4l5.84,7.86,12.88-12.9a1.93,1.93,0,1,1,2.73,2.73L32,33.58a1.89,1.89,0,0,1-1.51.56,1.93,1.93,0,0,1-1.41-.78L23.3,25.61l-7.08,7.9A1.93,1.93,0,0,1,14.79,34.15Z" />
  </svg>
);
// 系统管理
const SystemManagerSvg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M579,1024H445a60.06,60.06,0,0,1-60-60l-4.49-101.23c-8-2.95-15.88-6.22-23.61-9.76l-75.83,69.41c-22.36,22.39-60.44,22.33-83.78-1L102.64,826.7a60.05,60.05,0,0,1,0-84.86L171,667.06c-3.5-7.73-6.78-15.58-9.76-23.57L58.57,638.9h-.07C26.91,639,0,612.06,0,579V445a60.09,60.09,0,0,1,60-60l101.14-4.52c3-7.92,6.25-15.78,9.79-23.57l-69.38-75.76c-10.31-10.41-16.53-25.47-16.53-41.45a59.54,59.54,0,0,1,17.65-42.43l94.62-94.69a59.93,59.93,0,0,1,84.86,0L356.94,171c7.73-3.54,15.58-6.74,23.57-9.76l4.55-102.68C385,26.91,411.94,0,445,0H579a60.1,60.1,0,0,1,60,60l4.52,101.17c8,2.95,15.81,6.22,23.54,9.76l75.86-69.41C763.38,81,804.08,80,826.7,102.68l94.69,94.69a60,60,0,0,1,.07,84.8L853,356.94c3.54,7.73,6.78,15.58,9.79,23.57L964.87,385A60.05,60.05,0,0,1,1024,445V579a60.06,60.06,0,0,1-60,60l-101.2,4.52c-3,8-6.25,15.85-9.76,23.57l69.38,75.83c22.39,22.33,22.39,60.44-1,83.82l-94.72,94.69c-22.56,22.59-62.17,22.79-84.86-.07L667.09,853c-7.73,3.54-15.62,6.81-23.57,9.76L639,965.53C639,997.09,612.06,1024,579,1024Zm-7-60.64a4.1,4.1,0,0,0,0,.46Zm-119.93-1.18v0Zm-.26-5.24H572.28l5.27-120a33.48,33.48,0,0,1,23.77-30.58,306.4,306.4,0,0,0,55.63-23,33.55,33.55,0,0,1,38.47,4.78L784,869.2l85.19-85.13-81.13-88.6a33.58,33.58,0,0,1-4.85-38.5,305.92,305.92,0,0,0,23.08-55.72A33.6,33.6,0,0,1,837,577.48l120-5.3V451.82l-120-5.3a33.63,33.63,0,0,1-30.61-23.84,308.44,308.44,0,0,0-23-55.59,33.53,33.53,0,0,1,4.81-38.5L869.2,240,784,154.8l-88.63,81.13a33.77,33.77,0,0,1-38.47,4.78,306.4,306.4,0,0,0-55.63-23,33.48,33.48,0,0,1-23.77-30.58l-5.34-120H451.79l-5.3,120a33.49,33.49,0,0,1-23.74,30.58,306.85,306.85,0,0,0-55.69,23,33.56,33.56,0,0,1-38.47-4.78L240,154.8,154.8,240l81.13,88.6a33.63,33.63,0,0,1,4.81,38.5,307,307,0,0,0-23.08,55.59A33.63,33.63,0,0,1,187,446.52l-120,5.3V572.24l120,5.24a33.6,33.6,0,0,1,30.61,23.77A311.59,311.59,0,0,0,240.74,657a33.58,33.58,0,0,1-4.81,38.44l-81.1,88.6L240,869.2l88.6-81.13a33.31,33.31,0,0,1,38.47-4.78,306.85,306.85,0,0,0,55.69,23,33.48,33.48,0,0,1,23.77,30.58ZM235.24,873.59a5.7,5.7,0,0,0-.46.39Zm638.31-84.8a5.44,5.44,0,0,0,.43.46Zm-722.36-.72-.1.13C151.13,788.14,151.16,788.07,151.2,788.07ZM962.45,572h0ZM60,571.92h0ZM964,452.08h0ZM61.85,452h0ZM873,235.86a.57.57,0,0,0-.1.13Zm-722.85-1,.26.26C150.28,235.08,150.21,234.95,150.12,234.88Zm85.75-83.82a1.42,1.42,0,0,0,.23.2Zm543.4-1a.06.06,0,0,0,.07.07ZM572,61.55v0ZM452.08,60l0,.59S452.08,60.24,452.08,60ZM512,760.83c-137.18,0-248.8-111.65-248.8-248.83S374.82,263.17,512,263.17,760.83,374.82,760.83,512,649.22,760.83,512,760.83Zm0-430.61c-100.22,0-181.74,81.52-181.74,181.78S411.78,693.78,512,693.78,693.78,612.25,693.78,512,612.22,330.22,512,330.22Z" />
  </svg>
);
// 平台公告
const AnnouncementSvg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M627.52,1003.41a34,34,0,0,1-22-8.08L315.91,751H121.75C54.61,751,0,694.11,0,624.17V415.74C0,345.86,54.61,289,121.75,289l187.89,1.87L605,32a34.21,34.21,0,0,1,56.75,25.72V969.21a34.28,34.28,0,0,1-34.2,34.2Zm-506.1-646c-29.09,0-53,26.19-53,58.32V624.17c0,32.2,23.92,58.39,53.34,58.39H328.41a34.1,34.1,0,0,1,22,8.08l242.86,205V133.16L344.91,350.94c-6.35,5.48-15.9,8-22.88,8.48Z" />
    <path d="M792.86,304a34.19,34.19,0,0,1-24.62-57.92l131.3-136.28a34.18,34.18,0,1,1,49.23,47.43L817.48,293.55A33.92,33.92,0,0,1,792.86,304Z" />
    <path d="M924.16,905.48A33.92,33.92,0,0,1,899.54,895L768.24,758.71a34.18,34.18,0,1,1,49.23-47.43l131.3,136.28a34.19,34.19,0,0,1-24.62,57.92Z" />
    <path d="M989.8,536.59H792.86a34.2,34.2,0,0,1,0-68.41H989.8a34.2,34.2,0,0,1,0,68.41Z" />
  </svg>
);
// 课件资源
const CoursewareSvg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M910.19,996.45H113.81A113.92,113.92,0,0,1,0,882.67V138.24A113.92,113.92,0,0,1,113.81,24.46H910.19A113.92,113.92,0,0,1,1024,138.24V882.67A113.92,113.92,0,0,1,910.19,996.45ZM113.81,91.89a46.43,46.43,0,0,0-46.39,46.35V882.67A46.43,46.43,0,0,0,113.81,929H910.19a46.43,46.43,0,0,0,46.39-46.35V138.24a46.43,46.43,0,0,0-46.39-46.35Z" />
    <path d="M210.92,349.29a55.9,55.9,0,0,1,78.82-.47L397,454.82a55.9,55.9,0,0,1,.47,78.82l-106,107.28a55.9,55.9,0,0,1-78.82.47l-.16-27.21-1.44-238.71Z" />
    <path d="M862,324.78H574.45a33.71,33.71,0,1,1,0-67.42H862a33.71,33.71,0,0,1,0,67.42Z" />
    <path d="M862,522.7H574.45a33.71,33.71,0,1,1,0-67.42H862a33.71,33.71,0,0,1,0,67.42Z" />
    <path d="M862,720.63H574.45a33.71,33.71,0,1,1,0-67.42H862a33.71,33.71,0,0,1,0,67.42Z" />
  </svg>
);
// 试卷资源
const TestResourceSvg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M702.92,961.93c-4.49,0-450.38-2.37-561.14,0-53.78-8-90.2-28.75-113.86-62.12C-10,846.25,1.53,780.56,2,777.83l4.67-25.48H633.37v31.06c0,34.64,2.61,83.11,25.08,104.34,7.34,7,17.11,10.92,29.57,12,6.64,0,11.28.06,13.59.06,61.78-12.37,50-94.33,48.38-103.67l-.45-518.53c0-58.84,0-215.23,128-215.23,51.35-.67,90.08,14.68,115.07,45.92C1034,160,1017,234,1016.23,237.16L1010.56,261H811.84c-.12,5.34-.18,10.86-.18,16.62V790.87c8.74,46.89-.79,151-102.7,170.52-2,.12-4,.24-6,.3ZM62.4,814.47c1.06,14.86,5,33.73,16.47,49.8,13.62,18.93,36.18,31.06,67.09,35.91,72.52-1.94,304.73-1.4,445.46-.85-12.71-25.78-17.62-56.05-19.32-84.86ZM816.93,198.88H958.3c.18-16.8-2.76-37.55-14.35-51.93-12.47-15.35-34-22.57-66-22.44C859.51,124.51,829.09,124.51,816.93,198.88Z" />
    <path d="M245.81,787H183.69v-557c0-57.39,16.53-101.49,49.11-131.09,46-41.92,106.43-36.76,108.92-36.4l535.79-.12v62.12H338.77c-3.18-.12-39.31-2.79-64.6,20.75-18.84,17.35-28.36,45.86-28.36,84.74Z" />
    <path d="M652,329.91H331.67a31.06,31.06,0,1,1,0-62.12H652a31.06,31.06,0,0,1,0,62.12Z" />
    <path d="M652,457.78H331.67a31.06,31.06,0,1,1,0-62.12H652a31.06,31.06,0,0,1,0,62.12Z" />
    <path d="M566.77,599.85H331.67a31.06,31.06,0,1,1,0-62.12H566.77a31.06,31.06,0,0,1,0,62.12Z" />
  </svg>
);
// 个人中心
const PersonalCenterSvg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M514.89,635.91c-175,0-317.47-142.42-317.47-317.5S339.84,1,514.89,1,832.36,143.4,832.36,318.41,689.93,635.91,514.89,635.91Zm0-563.93C379,72,268.43,182.51,268.43,318.41S379,564.91,514.89,564.91s246.46-110.59,246.46-246.5S650.79,72,514.89,72Z" />
    <path d="M961.5,1024A35.48,35.48,0,0,1,926,988.5c0-194.43-184.41-352.59-411.11-352.59S103.78,794.07,103.78,988.5a35.5,35.5,0,1,1-71,0c0-233.6,216.27-423.59,482.11-423.59S997,754.9,997,988.5A35.48,35.48,0,0,1,961.5,1024Z" />
  </svg>
);

// 培训管理员
// 工作台
// 学员管理
const StuManagerSvg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M1001,782.77l-53-2.34a143.26,143.26,0,0,0-10.8-26.06l35.79-39.11a11.17,11.17,0,0,0,0-15.8l-40-40a11.17,11.17,0,0,0-15.79,0L878.2,695.3a142.83,142.83,0,0,0-26-10.8l-2.35-53a11.17,11.17,0,0,0-11.18-11.17H782.14A11.17,11.17,0,0,0,771,631.55l-2.35,53a143.49,143.49,0,0,0-26.06,10.8l-39.11-35.8a11.18,11.18,0,0,0-15.8,0l-39.94,40a11.18,11.18,0,0,0,0,15.8l35.79,39.11a142.58,142.58,0,0,0-10.8,26.06l-53,2.34a11.18,11.18,0,0,0-11.18,11.18v56.49a11.17,11.17,0,0,0,11.18,11.17l53,2.35A142.64,142.64,0,0,0,683.51,890l-35.79,39.11a11.18,11.18,0,0,0,0,15.8l39.94,39.94a11.17,11.17,0,0,0,15.8,0l39.11-35.79a143.36,143.36,0,0,0,26.07,10.8l2.34,53A11.17,11.17,0,0,0,782.15,1024h56.48a11.17,11.17,0,0,0,11.18-11.17l2.35-53a143.19,143.19,0,0,0,26-10.8l39.12,35.79a11.16,11.16,0,0,0,15.79,0l40-39.94a11.17,11.17,0,0,0,0-15.8L937.27,890a143.32,143.32,0,0,0,10.8-26.06l53-2.35a11.17,11.17,0,0,0,11.18-11.17V793.94A11.18,11.18,0,0,0,1001,782.77ZM810.38,913a90.8,90.8,0,1,1,90.82-90.81A90.8,90.8,0,0,1,810.38,913Z" />
    <path d="M472.82,669.21c-184.72,0-335-150.27-335-335s150.3-335,335-335,335.05,150.27,335.05,335S657.57,669.21,472.82,669.21Zm0-600.94c-146.63,0-265.92,119.3-265.92,265.92s119.3,265.92,265.92,265.92,266-119.3,266-265.92S619.48,68.27,472.82,68.27Z" />
    <path d="M46.6,1002.54a37.07,37.07,0,0,1-8.1-.94A34.59,34.59,0,0,1,13,959.9C63.84,748.09,251.73,600.12,469.91,600.12a34.55,34.55,0,1,1,0,69.1c-186.1,0-346.36,126.18-389.74,306.88A34.61,34.61,0,0,1,46.6,1002.54Z" />
  </svg>
);
// 学习计划
const StudyPlanSvg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <rect x="364.33" y="102.62" width="274.44" height="72.97" />
    <path d="M914.64,1024H109.36C49,1024,0,971,0,905.84V226.91c0-65.14,49-118.16,109.36-118.16h81.51v73H109.36c-19.54,0-36,20.67-36,45.18V905.84c0,24.51,16.5,45.18,36,45.18H914.64c19.54,0,36-20.67,36-45.18V226.91c0-24.51-16.5-45.18-36-45.18H816.28v-73h98.37c60.32,0,109.36,53,109.36,118.16V905.84C1024,971,975,1024,914.64,1024Z" />
    <path d="M277.67,295.55A36.55,36.55,0,0,1,241,259.06V37.93a36.65,36.65,0,0,1,73.31,0V259.06A36.55,36.55,0,0,1,277.67,295.55Z" />
    <path d="M726.18,294.18a36.55,36.55,0,0,1-36.65-36.49V36.49a36.65,36.65,0,0,1,73.31,0V257.69A36.55,36.55,0,0,1,726.18,294.18Z" />
    <rect x="205.02" y="405.61" width="128.29" height="127.71" />
    <rect x="445.49" y="405.61" width="128.29" height="127.71" />
    <rect x="685.96" y="405.61" width="128.29" height="127.71" />
    <rect x="205.02" y="686.11" width="128.29" height="127.71" />
    <rect x="445.49" y="686.11" width="128.29" height="127.71" />
    <rect x="685.96" y="686.11" width="128.29" height="127.71" />
  </svg>
);
// 考试计划
const ExamPlanSvg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M775.78,430.66H249.53a36.06,36.06,0,0,1,0-72.12H775.78a36.06,36.06,0,0,1,0,72.12Z" />
    <path d="M775.78,628.77H249.53a36.06,36.06,0,1,1,0-72.12H775.78a36.06,36.06,0,0,1,0,72.12Z" />
    <path d="M628.31,826.87H242a36.06,36.06,0,1,1,0-72.12H628.31a36.06,36.06,0,0,1,0,72.12Z" />
    <rect x="395.52" y="89.73" width="230.96" height="72.12" />
    <path d="M907.09,1021.11H114.91c-59.33,0-107.57-53.52-107.57-119.3V209.1c0-65.85,48.24-119.37,107.57-119.37h80.18v72.12H114.91c-19.23,0-35.46,21.62-35.46,47.26V901.8c0,25.56,16.23,47.19,35.46,47.19H907.09c19.23,0,35.46-21.62,35.46-47.19V209.1c0-25.63-16.23-47.26-35.46-47.26H810.33V89.73h96.76c59.33,0,107.57,53.52,107.57,119.37V901.8C1014.67,967.58,966.42,1021.11,907.09,1021.11Z" />
    <path d="M301.29,251.71a36,36,0,0,1-36.06-36.06V39a36.06,36.06,0,0,1,72.12,0v176.7A36,36,0,0,1,301.29,251.71Z" />
    <path d="M719.58,251.71a36,36,0,0,1-36.06-36.06V39a36.06,36.06,0,0,1,72.12,0v176.7A36,36,0,0,1,719.58,251.71Z" />
  </svg>
);
// 培训证书
const TrainCertificateSvg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M822.89,543.29H608.14a35.79,35.79,0,0,1,0-71.58H822.89a35.79,35.79,0,0,1,0,71.58Z" />
    <path d="M822.89,750.62H608.14a35.79,35.79,0,0,1,0-71.58H822.89a35.79,35.79,0,0,1,0,71.58Z" />
    <path d="M822.89,336H608.14a35.79,35.79,0,0,1,0-71.58H822.89a35.79,35.79,0,0,1,0,71.58Z" />
    <path d="M476.1,464.31c3.69-15.12,36.43-36.31,34.61-51.78-2.06-17.75-43.93-32.93-52.33-48.69s2.82-59.8-11.27-70.91c-13.2-10.39-51,10.6-67,5.34s-34.08-44.72-51.06-44.72-34.5,41.06-51.07,44.72c-19.56,4.3-65.45-19.2-79.93-5.34-12.81,12.26,10.59,55.54,1.7,70.91-9.33,16.11-61.29,17.56-65.31,35.72-4.34,19.62,41.89,45.48,47.59,64.75,5.41,18.22-30.75,56.74-21,73,9.48,15.78,57.18,4.46,72,15.34,13.23,9.69,17,51.34,32.37,57.12,15.76,5.92,46.77-22.24,63.6-22.24s47.85,28.17,63.62,22.24C408,604,412,562.67,425.06,552.69c12.09-9.3,50.4-2.78,59.07-15.34C494.55,522.22,471.73,482.14,476.1,464.31ZM321,532.68A96.64,96.64,0,1,1,417.62,436,96.64,96.64,0,0,1,321,532.68Z" />
    <path d="M201.84,586.29s30.85,81.85,102,51.52l-32.2,92.3-47.22-42.92-70.84,7.5Z" />
    <path d="M352.09,638.89s59,29,100.89-46.14L493.76,699l-61.71-8.59-56.33,39.71Z" />
    <path d="M865.35,1005.63H157.09C70.76,1005.63.5,935.38.5,849V169C.5,82.62,70.76,12.37,157.09,12.37H865.35c86.33,0,156.58,70.25,156.58,156.58V849C1021.94,935.38,951.69,1005.63,865.35,1005.63ZM157.09,83.95a85.08,85.08,0,0,0-85,85V849a85.08,85.08,0,0,0,85,85H865.35a85.08,85.08,0,0,0,85-85V169a85.08,85.08,0,0,0-85-85Z" />
  </svg>
);
// 问卷调查
const QuestionnaireSvg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M771.89,986.89H162C72.68,986.89,0,920,0,837.72v-687C0,68.41,72.68,1.5,162,1.5H771.89c89.36,0,162,66.91,162,149.17v50.54a34.78,34.78,0,0,1-69.56,0V150.67c0-43.88-41.51-79.61-92.49-79.61H162c-51,0-92.49,35.73-92.49,79.61v687c0,43.88,41.51,79.61,92.49,79.61H771.89c51,0,92.49-35.73,92.49-79.61V663.81a34.78,34.78,0,0,1,69.56,0v173.9C933.93,920,861.25,986.89,771.89,986.89Z" />
    <path d="M672.54,294.35H212.89a34.78,34.78,0,0,1,0-69.56H672.54a34.78,34.78,0,1,1,0,69.56Z" />
    <path d="M672.54,500.38H212.89a34.78,34.78,0,0,1,0-69.56H672.54a34.78,34.78,0,1,1,0,69.56Z" />
    <path d="M491.13,706.41H212.89a34.78,34.78,0,0,1,0-69.56H491.13a34.78,34.78,0,1,1,0,69.56Z" />
    <polygon points="679.77 805.46 952.02 483.2 832.18 381.94 559.92 704.23 679.77 805.46" />
    <path d="M1012.95,411.07a46.82,46.82,0,0,0-5.54-66l-48.33-40.83a46.82,46.82,0,0,0-66,5.56l-33.54,39.72L979.41,450.8Z" />
    <polygon points="532.55 736.63 531.02 859.98 531.02 859.98 652.37 837.87 532.55 736.63" />
  </svg>
);
// 统计分析
const StatisticalAnalysisSvg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M485.35,1024C217.73,1024,0,806.24,0,538.65S217.73,53.3,485.35,53.3A34.83,34.83,0,0,1,520.2,88.15V503.8H935.85a34.83,34.83,0,0,1,34.85,34.85C970.7,806.24,753,1024,485.35,1024ZM450.5,124.44C237.57,142.2,69.71,321.23,69.71,538.65c0,229.2,186.45,415.64,415.64,415.64,217.45,0,396.45-167.86,414.18-380.79H485.35a34.83,34.83,0,0,1-34.85-34.85Z" />
    <path d="M1026.07,413.88C1026.07,185.3,840.77,0,612.2,0V413.88Z" />
  </svg>
);
// 个人中心

// 学员
// 工作台
// 我的学习
const MyStudySvg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M908.44,985.25H115.53A115.65,115.65,0,0,1,0,869.72V128.53A115.65,115.65,0,0,1,115.53,13H908.44A115.68,115.68,0,0,1,1024,128.53v741.2A115.68,115.68,0,0,1,908.44,985.25ZM115.53,84.61a44,44,0,0,0-43.92,43.92v741.2a44,44,0,0,0,43.92,43.92H908.44a44,44,0,0,0,44-43.92V128.53a44,44,0,0,0-44-43.92Z" />
    <path d="M432.57,318.71a69.16,69.16,0,0,1,97.51-.59L662.83,449.27a69.16,69.16,0,0,1,.59,97.51L532.26,679.53a69.16,69.16,0,0,1-97.51.59l-.2-33.66L432.77,351.1Z" />
  </svg>
);
// 我的考试
const MyExamSvg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M905.11,1024H115.77A115.86,115.86,0,0,1,0,908.3V170.45A115.88,115.88,0,0,1,115.77,54.69H510.44a36.36,36.36,0,1,1,0,72.73H115.77a43.1,43.1,0,0,0-43,43V908.3a43,43,0,0,0,43,43H905.11a43,43,0,0,0,43-43V490.91a36.36,36.36,0,0,1,72.73,0V908.3A115.86,115.86,0,0,1,905.11,1024Z" />
    <polygon points="549.93 692.89 904.91 272.7 748.66 140.67 393.67 560.89 549.93 692.89" />
    <path d="M984.35,178.66a61,61,0,0,0-7.23-86l-63-53.23a61,61,0,0,0-86,7.25L784.36,98.44l156.26,132Z" />
    <polygon points="357.97 603.13 355.98 763.98 355.98 763.98 514.21 735.14 357.97 603.13" />
  </svg>
);
// 我的问卷
const MyQuestionnaireSvg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M167.06,1020.33C74.93,1020.33,0,951.35,0,866.54V158.25C0,73.44,74.93,4.46,167.06,4.46H795.8c92.13,0,167.06,69,167.06,153.79V270.51a35.86,35.86,0,0,1-71.71,0V158.25c0-45.24-42.79-82.08-95.35-82.08H167.06c-52.56,0-95.35,36.84-95.35,82.08v708.3c0,45.24,42.79,82.08,95.35,82.08a35.86,35.86,0,0,1,0,71.71Z" />
    <path d="M754,306.36H219.51a35.86,35.86,0,0,1,0-71.71H754a35.86,35.86,0,0,1,0,71.71Z" />
    <path d="M586.65,518.77H219.51a35.86,35.86,0,0,1,0-71.71H586.65a35.86,35.86,0,0,1,0,71.71Z" />
    <path d="M506.36,731.17H219.51a35.86,35.86,0,0,1,0-71.71H506.36a35.86,35.86,0,1,1,0,71.71Z" />
    <path d="M775.84,835.87C682.18,835.87,606,759.68,606,666s76.19-169.83,169.86-169.83S945.74,572.34,945.74,666,869.51,835.87,775.84,835.87Zm0-268A98.15,98.15,0,1,0,874,666,98.21,98.21,0,0,0,775.84,567.86Z" />
    <path d="M988.14,1020.33a35.84,35.84,0,0,1-35.86-35.86c0-81.94-79.14-148.61-176.44-148.61S599.43,902.54,599.43,984.48a35.86,35.86,0,1,1-71.71,0C527.72,863,639,764.16,775.84,764.16S1024,863,1024,984.48A35.84,35.84,0,0,1,988.14,1020.33Z" />
  </svg>
);
// 我的培训记录
const MyTrainSvg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M287.67,956.92H108.81A106.08,106.08,0,0,1,2.89,851V171.68A106.08,106.08,0,0,1,108.81,65.73H835.56A106.08,106.08,0,0,1,941.48,171.68V327.24a32.82,32.82,0,1,1-65.63,0V171.68a40.34,40.34,0,0,0-40.28-40.32H108.81a40.34,40.34,0,0,0-40.28,40.32V851a40.34,40.34,0,0,0,40.28,40.32H287.67a32.82,32.82,0,0,1,0,65.63Z" />
    <path d="M305.81,346a63.39,63.39,0,0,1,89.38-.54L516.85,465.64a63.39,63.39,0,0,1,.54,89.38L397.18,676.68a63.39,63.39,0,0,1-89.38.54l-.19-30.85L306,375.66Z" />
    <path d="M796.88,789.44c-85.73,0-155.46-69.74-155.46-155.5s69.74-155.43,155.46-155.43,155.5,69.74,155.5,155.43S882.61,789.44,796.88,789.44Zm0-245.29a89.83,89.83,0,1,0,89.86,89.8A89.89,89.89,0,0,0,796.88,544.14Z" />
    <path d="M991.18,958.27a32.8,32.8,0,0,1-32.82-32.82c0-75-72.43-136-161.49-136s-161.46,61-161.46,136a32.82,32.82,0,0,1-65.63,0c0-111.21,101.88-201.64,227.09-201.64S1024,814.24,1024,925.45A32.8,32.8,0,0,1,991.18,958.27Z" />
  </svg>
);
// 我的证书
const MyCertificateSvg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M538.54,426.91c4.24-17.36,41.82-41.68,39.72-59.43-2.36-20.37-50.42-37.79-60.07-55.89s3.24-68.64-12.94-81.39c-15.15-11.93-58.55,12.17-76.87,6.13C409.9,230.21,389.27,185,369.78,185s-39.6,47.13-58.62,51.33c-22.45,4.93-75.13-22-91.74-6.13-14.71,14.07,12.16,63.75,1.95,81.39-10.7,18.49-70.34,20.16-75,41-5,22.52,48.08,52.21,54.62,74.32,6.21,20.91-35.3,65.13-24.09,83.83,10.88,18.11,65.63,5.11,82.68,17.61,15.19,11.12,19.52,58.92,37.15,65.56,18.09,6.79,53.68-25.53,73-25.53s54.92,32.33,73,25.53c17.62-6.64,22.19-54.1,37.15-65.56,13.88-10.67,57.85-3.2,67.8-17.61C559.71,493.38,533.52,447.37,538.54,426.91Zm-178,78.48A110.92,110.92,0,1,1,471.41,394.47,110.92,110.92,0,0,1,360.49,505.39Z" />
    <path d="M223.75,566.91s35.41,93.94,117,59.13L303.82,732l-54.2-49.26-81.31,8.61Z" />
    <path d="M396.2,627.29s67.76,33.26,115.8-53l46.81,122L488,686.41,423.32,732Z" />
    <path d="M290,1024H167.15C75.37,1024,.73,955.28.73,870.8V165.22C.73,80.74,75.37,12,167.15,12H793.47c91.77,0,166.42,68.79,166.42,153.27V296.31a35.72,35.72,0,0,1-71.44,0V165.22c0-45.14-42.62-81.83-95-81.83H167.15c-52.36,0-95,36.7-95,81.83V870.8c0,45.07,42.62,81.76,95,81.76H290a35.72,35.72,0,0,1,0,71.44Z" />
    <path d="M773.59,840.25c-93.31,0-169.21-75.9-169.21-169.24s75.9-169.17,169.21-169.17S942.84,577.73,942.84,671,866.9,840.25,773.59,840.25Zm0-267A97.77,97.77,0,1,0,871.4,671,97.83,97.83,0,0,0,773.59,573.26Z" />
    <path d="M985.08,1024a35.7,35.7,0,0,1-35.72-35.72c0-81.62-78.83-148-175.77-148s-175.73,66.41-175.73,148a35.72,35.72,0,0,1-71.44,0c0-121,110.89-219.47,247.17-219.47s247.2,98.43,247.2,219.47A35.7,35.7,0,0,1,985.08,1024Z" />
  </svg>
);
// 个人中心

export const WorkbenchIcon = props => <Icon component={WorkbenchSvg} {...props} />;
export const SystemManagerIcon = props => <Icon component={SystemManagerSvg} {...props} />;
export const AnnouncementIcon = props => <Icon component={AnnouncementSvg} {...props} />;
export const CoursewareIcon = props => <Icon component={CoursewareSvg} {...props} />;
export const TestResourceIcon = props => <Icon component={TestResourceSvg} {...props} />;
export const PersonalCenterIcon = props => <Icon component={PersonalCenterSvg} {...props} />;

export const StuManagerIcon = props => <Icon component={StuManagerSvg} {...props} />;
export const StudyPlanIcon = props => <Icon component={StudyPlanSvg} {...props} />;
export const ExamPlanIcon = props => <Icon component={ExamPlanSvg} {...props} />;
export const TrainCertificateIcon = props => <Icon component={TrainCertificateSvg} {...props} />;
export const QuestionnaireIcon = props => <Icon component={QuestionnaireSvg} {...props} />;
export const StatisticalAnalysisIcon = props => (
  <Icon component={StatisticalAnalysisSvg} {...props} />
);

export const MyStudyIcon = props => <Icon component={MyStudySvg} {...props} />;
export const MyExamIcon = props => <Icon component={MyExamSvg} {...props} />;
export const MyQuestionnaireIcon = props => <Icon component={MyQuestionnaireSvg} {...props} />;
export const MyTrainIcon = props => <Icon component={MyTrainSvg} {...props} />;
export const MyCertificateIcon = props => <Icon component={MyCertificateSvg} {...props} />;
