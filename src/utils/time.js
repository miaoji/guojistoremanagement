export const handleFields = (fields) => {
  const tmp = fields;
  const { createTime } = tmp;
  if (createTime && createTime.length === 2) {
    tmp.startDate = `${createTime[0].format('YYYY-MM-DD')} 00:00:00`;
    tmp.endDate = `${createTime[1].format('YYYY-MM-DD')} 23:59:59`;
    delete tmp.createTime;
  }
  return tmp;
};
