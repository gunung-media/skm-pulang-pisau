import moment from 'moment';
import 'moment/locale/id';

export const toIndonesian = (date: string) => {
    return moment(date).locale('id').format('D MMMM YYYY, [pukul] HH:mm');
};
