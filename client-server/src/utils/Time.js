const zero = '0';

const Time = {
  convertToTime: seconds => {
    const hour = String(parseInt(seconds / 3600, 10));
    const minute = String(parseInt((seconds % 3600) / 60, 10));
    let second = String(parseInt(seconds % 60, 10));

    if (second < 10) {
      second = zero.concat(second);
    }

    if (hour > 0) {
      return `${hour}:${minute}:${second}`;
    }
    return `${minute}:${second}`;
  },
};

export default Time;
