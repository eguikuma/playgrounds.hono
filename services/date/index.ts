import dayjs from "dayjs";
import "dayjs/locale/ja";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.locale("ja");
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export const date = dayjs;

export const toYYYY = (value: dayjs.ConfigType = dayjs()) =>
  date(value).format("YYYY");

export const toYYYYMMDD = (value: dayjs.ConfigType = dayjs()) =>
  date(value).format("YYYY-MM-DD");

export const toJaYYYYMMDD = (value: dayjs.ConfigType = dayjs()) =>
  date(value).format("YYYY年MM月DD日");

export const toYYYYMMDDHHmmss = (value: dayjs.ConfigType = dayjs()) =>
  date(value).format("YYYY-MM-DD HH:mm:ss");
