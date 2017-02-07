export const checkFoodInCart = (food, selectedFoods) => {
  var isIn = selectedFoods.find((item) => {
    if (item.name === food.name) {
      return true
    }
  })
  if (isIn) {
    return true
  }
  return false
}
