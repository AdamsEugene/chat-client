export const reorder = (data) => {
  let x = 1;
  let g = 0;
  let container = [];

  for (let index = 0; index < data.length; index++) {
    if ((data[index + 1] ? data[index + 1].sender : 0) === data[index].sender) {
      if ("group" in data[index]) x -= 1;
      x += 1;
      data[index].group = x;
      data[index + 1].group = x;
      if (data[index].group !== g) {
        g = data[index].group;
        data[index].start = true;
      }
    }
    container.push(data[index]);
  }
  return container;
};

export const range = (start, stop, step) => {
  let items = [];
  if (step === 0) step = 1;
  if (step < 0) {
    step = Math.abs(step);
    for (let i = start + stop - 1; i >= start; i -= step) {
      items.push(i);
    }
  } else {
    for (let i = start; i < start + stop; i += step) {
      items.push(i);
    }
  }
  return items;
};
