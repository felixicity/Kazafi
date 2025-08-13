/* A helper function that calculates the discounted amount of a product or item*/
//@desc nothing here
export const discountCalculator = (price, discount) => {
      return price - (price * discount) / 100;
};
