import { ServiceRequest } from './base';

const path = '/learn/progress';
const publicprogressPath = '/learn/publicprogress';

export const learnProgressService = new ServiceRequest(path);
export const learnPublicProgressService = new ServiceRequest(publicprogressPath);
