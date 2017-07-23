import moment from 'moment';

export const serverDateToDateTime = (date) => {
	var date = moment(date);
	return date.format('YYYY-MM-DD hh:mm');
}

export const serverDateToDate = (date) => {
	var date = moment(date);
	return date.format('YYYY-MM-DD');
}
