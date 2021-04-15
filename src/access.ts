export default function(initialState = { currentUser: { currentrole: null } }) {
  const {
    currentUser: { currentrole = null },
  } = initialState;

  return {
    department: currentrole === 'admin',
    workbench: currentrole === 'admin',
    usermanager: currentrole === 'admin',
    'announcement.list': currentrole === 'admin',
    'announcement.create': currentrole === 'admin',
    'announcement.edit': currentrole === 'admin',
    'announcement.listview': true,
    'announcement.detail': true,
    groupmanager: currentrole === 'trainmanager',
    studyPlanmanager: currentrole === 'trainmanager',
    examPlanManager: currentrole === 'trainmanager',
    trainCertificateMmanager: currentrole === 'admin',
    statisticaManager: currentrole === 'stu',
    publicCourseLearn: currentrole === 'stu',
    myStudyManager: currentrole === 'stu',
    noticetaskManager: currentrole === 'admin' || currentrole === 'trainmanager',
    myExamManager: currentrole === 'stu',
    myCertificateManager: currentrole === 'stu',
    personalCenter: true,
  };
}
