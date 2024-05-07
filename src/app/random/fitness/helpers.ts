export const getBadgeType = (percentCompleted: number) => {
  if (percentCompleted < 25) {
    return 'danger';
  } else if (percentCompleted < 50) {
    return 'warning';
  } else if (percentCompleted < 76) {
    return 'warning';
  } else {
    return 'success';
  }
}

export const getProgressColor = (percentCompleted: number) => {
  if (percentCompleted < 25) {
    return 'red';
  } else if (percentCompleted < 50) {
    return 'orange';
  } else if (percentCompleted < 76) {
    return 'yellow';
  } else {
    return 'green';
  }
}
