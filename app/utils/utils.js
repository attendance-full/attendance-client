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
