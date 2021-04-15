import React from 'react';
import { learnPublicProgressService } from '@/services';
import LearnProgress from '../LearnPlan/Learn';

export default props => LearnProgress({ service: learnPublicProgressService, ...props });
