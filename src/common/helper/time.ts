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

  calDiff = (day: number, param: number) => {
    const result = Math.floor(day / param);
    return result;
  };

  calDayHourMinutes = (time: number) => {
    const days = Math.floor(time / (24 * 60 * 60 * 1000));
    const daysms = time % (24 * 60 * 60 * 1000);
    const hours = Math.floor(daysms / (60 * 60 * 1000));
    const hoursms = time % (60 * 60 * 1000);
    const minutes = Math.floor(hoursms / (60 * 1000));
    if (days > 365) return `${this.calDiff(days, 365)} năm trước`;
    else if (days > 30) return `${this.calDiff(days, 30)} tháng trước`;
    else if (days > 7) return `${this.calDiff(days, 7)} tuần trước`;
    else if (days > 0) return `${days} ngày trước`;
    else if (hours > 0) return `${hours} giờ trước`;
    else if (minutes >= 0) return `${minutes} phút trước`;
  };
}

export default new TimeHelper();
