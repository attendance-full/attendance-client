import moment from 'moment';

export const serverDateToDateTime = (date) => {
	if (! date || date.length> 0) {
		return '';
	}
	var date = moment(date);
	return date.format('YYYY-MM-DD hh:mm');
}

export const serverDateToDate = (date) => {
	if (! date || date.length> 0) {
		return '';
	}
	var date = moment(date);
	return date.format('YYYY-MM-DD');
}

export const urlSearchData = (searchString) => {
  if (!searchString) return false;

  return searchString
      .substring(1)
      .split('&')
      .reduce((result, next) => {
          let pair = next.split('=');
          result[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);

          return result;
      }, {});
};
