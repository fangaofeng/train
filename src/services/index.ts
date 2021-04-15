import authService from './auth';
import { accountService, noticesService } from './account';
import announcementService from './announcement';
import workbenchService from './workbench';
import configService from './config';
import coursewareService from './courseware';
import examplanService from './examplan';
import examprogressService from './examprogress';
import groupsService from './groups';
import learnplanService from './learnplan';
import { learnProgressService, learnPublicProgressService } from './learnProgress';
import noticetaskService from './noticetask';
import userService from './user';
import paperService from './paper';
import departmentService from './department';

export * from './request';

export {
  authService,
  accountService,
  noticesService,
  announcementService,
  workbenchService,
  configService,
  coursewareService,
  examplanService,
  groupsService,
  learnplanService,
  examprogressService,
  learnProgressService,
  learnPublicProgressService,
  userService,
  noticetaskService,
  paperService,
  departmentService,
};
