const helper = {
  shuffleArray(arr) {
    const array = arr.slice();
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  },
  getDistanceBetweenTwoPoints(p1, p2) {
    var a = p1.x - p2.x;
    var b = p1.y - p2.y;
    
    var c = Math.sqrt( a*a + b*b );

    return c;
  },
  getRandomItemFromArray(items){
    const randomIndexInArray = Math.floor(Math.random() * items.length);
    return {item:items[randomIndexInArray],index:randomIndexInArray};
  } ,
  swap(route){
    const routeAInfo = helper.getRandomItemFromArray(route);
    const routeBInfo = helper.getRandomItemFromArray(route);

    route[routeAInfo.index] = routeBInfo.item;
    route[routeBInfo.index] = routeAInfo.item;

    return route.slice();
  },
  randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
};

export default helper;