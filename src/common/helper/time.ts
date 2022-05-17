import moment from 'moment';

type AddType = 'years' | 'months' | 'weeks' | 'days' | 'hours' | 'minutes' | 'seconds' | 'milliseconds' | 'quarters';

class TimeHelper {
  addTime = (date: Date, typeToAdd: AddType, value: number) => {
    const newTime = moment(date);
    switch (typeToAdd) {
      case 'days':
        newTime.add(value, 'd');
        break;
      case 'hours':
        newTime.add(value, 'h');
        break;
      case 'milliseconds':
        newTime.add(value, 'ms');
        break;
      case 'minutes':
        newTime.add(value, 'm');
        break;
      case 'months':
        newTime.add(value, 'M');
        break;
      case 'quarters':
        newTime.add(value, 'Q');
        break;
      case 'seconds':
        newTime.add(value, 's');
        break;
      case 'weeks':
        newTime.add(value, 'w');
        break;
      case 'years':
        newTime.add(value, 'y');
        break;
      default:
        break;
    }

    return newTime.toDate();
  };

  formatDate = (day: Date | string) => {
    return moment(day).format('MMMM Do YYYY');
  };
}

export default new TimeHelper();
