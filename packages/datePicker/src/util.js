import dateUtil from '@/utils/date';

export const extractTimeFormat = function(format) {
  return format
    .replace(/\W?D{1,2}|\W?Do|\W?d{1,4}|\W?M{1,4}|\W?y{2,4}/g, '')
    .trim();
};

export const toDate = function(date) {
  let _date = new Date(date);
  if (isNaN(_date.getTime()) && typeof date === 'string') {
    _date = date.split('-').map(Number);
    _date[1] += 1;
    _date = new Date(..._date);
  }

  if (isNaN(_date.getTime())) return null;
  return _date;
};

export const clearHours = (time) => {
  const cloneDate = new Date(time);
  cloneDate.setHours(0, 0, 0, 0);
  return cloneDate.getTime();
};

export const initTimeDate = () => {
  const date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  return date;
};

export const isInRange = (time, a, b) => {
  if (!a || !b) return false;
  const [start, end] = [a, b].sort();
  return time >= start && time <= end;
};


export const formatDate = function(date, format) {
  date = toDate(date);
  if (!date) return '';
  return dateUtil.format(date, format || 'yyyy-MM-dd');
};

export const parseDate = function(string, format,type) {
  return dateUtil.parse(string, format || 'yyyy-MM-dd');
};

export const DEFAULT_FORMATS = {
  date: 'yyyy-MM-dd',
  month: 'yyyy-MM',
  year: 'yyyy',
  datetime: 'yyyy-MM-dd HH:mm:ss',
  time: 'HH:mm:ss',
  timerange: 'HH:mm:ss',
  daterange: 'yyyy-MM-dd',
  datetimerange: 'yyyy-MM-dd HH:mm:ss',
  week: 'yyyywWW'
};

const DATE_FORMATTER = function(value, format) {
  return formatDate(value, format);
};
const DATE_PARSER = function(text, format, type) {
  return parseDate(text, format);
};
const RANGE_FORMATTER = function(value, format, RANGE_SEPARATOR) {
  if (Array.isArray(value) && value.length === 2) {
    const start = value[0];
    const end = value[1];

    if (start && end) {
      // return formatDate(start, format) + RANGE_SEPARATOR + formatDate(end, format);
      return [formatDate(start, format), formatDate(end, format)];
    }
  } else if (!Array.isArray(value) && value instanceof Date) {
    return formatDate(value, format);
  }
  return '';
};

const RANGE_PARSER = function(text, format, RANGE_SEPARATOR) {
  const array = Array.isArray(text) ? text : text.split(RANGE_SEPARATOR);
  if (array.length === 2) {
    const range1 = array[0];
    const range2 = array[1];
    return [
      range1 instanceof Date ? range1 : parseDate(range1, format),
      range2 instanceof Date ? range2 : parseDate(range2, format)
    ];
  }
  return [parseDate(text, format)];
};

export const isDate = function(date) {
  if (date === null || date === void 0) return false;
  if (isNaN(new Date(date).getTime())) return false;
  if (Array.isArray(date)) return false; // deal with `new Date([ new Date() ]) -> new Date()`
  return true;
};

export const getWeekNumber = function(src) {
  if (!isDate(src)) return null;
  const date = new Date(src.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  const week1 = new Date(date.getFullYear(), 0, 4);
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
};

export const TYPE_VALUE_RESOLVER_MAP = {
  default: {
    formatter(value) {
      if (!value) return '';
      return '' + value;
    },
    parser(text) {
      if (text === void 0 || text === '') return null;
      return text;
    }
  },
  week: {
    formatter(value, format) {
      if (!value) {
        return;
      }
      if (typeof value === 'string') {
        value = parseDate(value, 'yyyy-MM-dd');
      }
      let week = getWeekNumber(value);
      let month = value.getMonth();
      const trueDate = new Date(value);
      if (week === 1 && month === 11) {
        trueDate.setHours(0, 0, 0, 0);
        trueDate.setDate(trueDate.getDate() + 3 - (trueDate.getDay() + 6) % 7);
      }
      let date = formatDate(trueDate, format);

      date = /WW/.test(date) ?
        date.replace(/WW/, week < 10 ? '0' + week : week) :
        date.replace(/W/, week);
      return date;
    },
    // formatter: DATE_FORMATTER,
    parser(value, format) {
      return typeof value === 'string' ? parseDate(value, format || 'yyyy-MM-dd') : value;
    }
  },
  date: {
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER
  },
  datetime: {
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER
  },
  daterange: {
    formatter: RANGE_FORMATTER,
    parser: RANGE_PARSER
  },
  datetimerange: {
    formatter: RANGE_FORMATTER,
    parser: RANGE_PARSER
  },
  timerange: {
    formatter: RANGE_FORMATTER,
    parser: RANGE_PARSER
  },
  time: {
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER
  },
  month: {
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER
  },
  year: {
    formatter: DATE_FORMATTER,
    parser: DATE_PARSER
  },
  number: {
    formatter(value) {
      if (!value) return '';
      return '' + value;
    },
    parser(text) {
      let result = Number(text);

      if (!isNaN(text)) {
        return result;
      }
      return null;
    }
  }
};

