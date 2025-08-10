import { v4 as uuidv4 } from 'uuid';

import dayjs from 'dayjs';

import { OverviewList } from '../types';

export function generateId() {
  return uuidv4().toString().replaceAll('-', '');
}

export function sortOverviewListByDate(overviewList: OverviewList): OverviewList {
  const sortedList = [...overviewList].sort((current, next) => {
    const currentDate = dayjs(current.checkupDate).valueOf();
    const nextDate = dayjs(next.checkupDate).valueOf();
    return nextDate - currentDate;
  });

  return sortedList;
}
