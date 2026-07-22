import dayjs from 'dayjs';

// 서버 공통 규약: Asia/Seoul 기준 ISO 8601, 초 단위까지 전달합니다.
export const formatApiDateTime = value =>
  dayjs(value).format('YYYY-MM-DDTHH:mm:ss');
