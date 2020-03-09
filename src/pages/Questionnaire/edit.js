// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'dva';
// // import BraftEditor from 'braft-editor';
// import SchemaForm, {
//   SchemaMarkupField as Field,
//   FormButtonGroup,
//   FormItemGrid,
//   Submit,
//   Reset,
//   FormCard,
//   FormPath,
//   FormLayout,
//   createFormActions,
// } from '@uform/antd';

// import { message } from 'antd';
// // eslint-disable-next-line import/no-unresolved
// import '@/components/uform/index';

// // const { onFormInit$, onFieldValueChange$ } = FormEffectHooks;
// // const onChangeOption$ = createEffectHook('onChangeOption');

// const testquesiton = props => {
//   const questionType = [
//     { label: '多选', value: 'multichoice' },
//     { label: '单选', value: 'singlechoice' },
//     { label: '判断', value: 'yesorno' },
//     { label: '问答', value: 'asked' },
//   ];
//   const msg = '调查问卷';
//   const [defaulttype, setType] = useState('yesorno');
//   const [initialValues, setInitialValues] = useState({});
//   const dispatch = useDispatch();
//   const getdata = id => {
//     dispatch({
//       type: 'Questionnaire/GetQuiz',
//       payload: { id },
//       callback: res => {
//         if (res.status === 'ok') {
//           setInitialValues(res.data);
//           console.log(initialValues);
//         }
//       },
//     });
//   };
//   useEffect(() => {
//     const {
//       match: {
//         params: { id },
//       },
//     } = props;
//     if (id) getdata(id);
//   }, []);

//   const submit = value => {
//     console.log(value);
//     dispatch({
//       type: 'Questionnaire/CreateQuiz',
//       payload: { data: value },
//       callback: res => {
//         if (res && res.status === 'ok') {
//           message.success(`${msg}成功`);
//           // this.forceUpdate();
//         } else {
//           message.warning(`${msg}失败`);
//         }
//       },
//     });
//   };

//   const Quest = () => {
//     return (
//       <Field type="object" name="answer">
//         <Field
//           name="multichoice"
//           maxItems={6}
//           minItems={1}
//           type="array"
//           // x-component="list"
//           title="可选答案"
//         >
//           <Field type="object">
//             <FormItemGrid gutter={10} cols={[2, 22]}>
//               <Field
//                 name="selected"
//                 type="checkbox"
//                 enum={[{ lable: 'selected ', value: 'selected' }]}
//               />{' '}
//               <Field
//                 name="content"
//                 required
//                 type="string"
//                 x-component-props={{
//                   placeholder: '内容填写这里，并且选择正确答案',
//                 }}
//               />
//             </FormItemGrid>
//           </Field>
//         </Field>
//         <Field
//           name="singlechoice"
//           maxItems={6}
//           minItems={1}
//           type="array"
//           // x-component="list"
//           title="可选答案"
//         >
//           <Field type="object">
//             <FormItemGrid gutter={10} cols={[2, 22]}>
//               <Field
//                 name="selected"
//                 type="radio"
//                 enum={[{ lable: 'selected ', value: 'selected' }]}
//               />
//               <Field
//                 name="content"
//                 required
//                 type="string"
//                 x-component-props={{
//                   placeholder: '内容填写这里，并且选择正确答案',
//                 }}
//               />
//             </FormItemGrid>
//           </Field>
//         </Field>
//         <Field
//           name="yesorno"
//           title="选择答案"
//           type="radio"
//           required
//           enum={[{ label: '正确', value: true }, { label: '错误', value: false }]}
//         />
//         <Field
//           name="asked"
//           title="填写答案"
//           type="textarea"
//           x-component-props={{
//             placeholder: '如果有正确答案，请填写在这里',
//           }}
//         />
//       </Field>
//     );
//   };

//   const QuestionFragment = () => {
//     return (
//       <Field type="object">
//         <FormLayout labelCol={3} wrapperCol={21}>
//           <Field
//             name="type"
//             type="string"
//             enum={questionType}
//             required
//             title="问题类型"
//             default={defaulttype}
//           />
//           <Field
//             type="string"
//             title="问题内容"
//             name="content"
//             required
//             x-component="textarea"
//             // x-render={props => (
//             //   <div>
//             //     <label>问题内容</label>
//             //     <BraftEditor
//             //       onChange={e => props.mutators.change(e.toHTML())}
//             //       defaultValue={BraftEditor.createEditorState(props.value)}
//             //       placeholder="请输入内容"
//             //       contentStyle={{ height: 300 }}
//             //     />
//             //   </div>
//             // )}
//           />
//           {/* <Field name="complex" type="complex" /> */}
//           <Quest />
//         </FormLayout>
//       </Field>
//     );
//   };
//   const actions = createFormActions();
//   return (
//     <SchemaForm
//       layout="horizontal"
//       actions={actions}
//       labelCol={4}
//       wrapperCol={20}
//       initialValues={initialValues}
//       effects={($, { setFieldState }) => {
//         $('onFieldValueChange', `questiones.*.type`).subscribe(fieldState => {
//           const { name, value } = fieldState;
//           const target = FormPath.transform(name, /\d+/, i => `questiones.${i}.answer`);

//           questionType.forEach(item => {
//             setFieldState(`${target}.${item.value}`, state => {
//               // eslint-disable-next-line no-param-reassign
//               state.visible = item.value === value;
//             });
//           });
//           setType(value);
//         });
//         $('onFieldInputChange', `questiones`).subscribe(fieldState => {
//           console.log(fieldState);
//         });
//       }}
//       onSubmit={v => submit(v)}
//     >
//       <FormCard title="调查问卷" name="paper">
//         <FormCard title="信息" name="info">
//           <Field
//             type="string"
//             title="问卷名称"
//             name="name"
//             required
//             x-component-props={{
//               placeholder: '问卷名称填写这里',
//             }}
//           />{' '}
//           <Field type="number" default={100} required title="问卷总分" name="totalscore" />
//           <Field
//             type="string"
//             title="问卷说明"
//             name="introduce"
//             x-component-props={{
//               placeholder: '问卷简要说明填写这里',
//             }}
//           />
//         </FormCard>
//         <FormCard title="题目" name="quizes">
//           <Field
//             // title="题目"
//             name="questiones"
//             maxItems={100}
//             minItems={1}
//             required
//             type="array"
//             // x-component="list"
//             x-props={{
//               renderAddition: '添加',
//               renderRemove: '删除',
//             }}
//           >
//             <QuestionFragment />
//           </Field>{' '}
//         </FormCard>
//         {/* </FormLayout> */}
//       </FormCard>{' '}
//       <FormButtonGroup offset={7} sticky>
//         <Submit>提交</Submit>
//         <Reset>重置</Reset>
//       </FormButtonGroup>
//     </SchemaForm>
//   );
// };

// export default testquesiton;
