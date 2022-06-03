export const getAverageStarPoint = (starRatings: any) => {
  const totalPoints = starRatings.reduce((acc: number, curr: any) => {
    return acc + +curr?.ratingPoint;
  }, 0);
  if (totalPoints) {
    return (totalPoints / starRatings.length).toFixed(1);
  } else {
    return 0;
  }
};
