import { observable, action } from 'mobx';
import app from '../../mobxStore';
import helper from './helper';

class Mod {
  svgWidth = 2000;
  svgHeight = 1000;
  defaults = {
    populationSize: 20,
    cityCount: 10,
    logMergeFunctionResults: false,
    debug: 0,
  };

  constructor() {
    for (let index = 0; index < this.defaults.cityCount; index++) {
      this.cities.push({
        id: index,
        x: Math.floor(Math.random() * this.svgWidth),
        y: Math.floor(Math.random() * this.svgHeight),
      });
    }

    this.makeFisrtPopulation();
    //this.makeNextGeneration();
    setInterval(() => {
        this.makeNextGeneration();
    }, 0);
  }

  cities = [];

  @observable x = 1;
  @observable y = 1;
  @observable infoPanel = [];
  @observable generationTopMates = [];

  bestRouteDistance = Infinity;
  @observable bestRoute = null;
  @observable generationCount = 0;
  @observable bestRouteInGeneration = null;

  population = [];

  base = { x: 1200, y: 700 };

  @action
  makeFisrtPopulation = () => {
    for (let i = 0; i <= this.defaults.populationSize; i++) {
      const newSequence = helper.shuffleArray(this.cities);
      this.population.push({
        distance: undefined,
        fitness: undefined,
        sequence: newSequence,
      });
    }
  };

  @action
  makeNextGeneration = () => {
    this.generationTopMates = [];
    this.generationCount++;
    this.infoPanel = this.infoPanel.splice(0, 10);
    this.infoPanel.unshift('Generation ' + this.generationCount);
    if (this.generationCount % 300 === 0 && this.defaults.debug) {
      console.log(this.generationCount);
    }
    this.calculateFitnessFunctionForAllRoutes();

    const newPoplation = [];

    this.population.forEach((populationItem) => {
      let newPopulationItem = this.mergeFunction(populationItem);      
      newPopulationItem = this.mutateIfRandom(newPopulationItem);
      newPoplation.push(newPopulationItem);
    });
    this.infoPanel.unshift('Best: ' + this.bestRouteInGeneration.distance);

    let fitnessSum = 0;
    this.population.forEach((populationItem) => {      
      fitnessSum = fitnessSum + populationItem.fitness;
    });
    this.infoPanel.unshift(
      'Avg fitness: ' + fitnessSum / this.population.length
    );
    this.population.forEach((populationItem) => {
      this.infoPanel.unshift(
        'Fitness: ' +
          populationItem.fitness +
          ', distance: ' +
          populationItem.distance
      );
    });

    var a = {};
    this.generationTopMates.forEach((topMateFitness) => {
      if (!a[topMateFitness]) {
        a[topMateFitness] = 1;
      } else {
        a[topMateFitness]++;
      }
    });
    Object.entries(a).forEach(([key, value]) =>{
    
      this.infoPanel.unshift('Top mates: ' + key+' '+value);
    })

    this.population = newPoplation;
  };

  @action
  mutateIfRandom(populationItem) {
    const random = Math.floor(Math.random() * 100);
    if (random === 1) {
      populationItem.sequence = helper.swap(populationItem.sequence);
      return populationItem;
    }
    return populationItem;
  }

  @action
  pickOne = () => {
    if (this.defaults.debug) {
      console.log({ population: this.population });
    }
    let index = 0;
    let r = Math.random(1);

    while (r > 0) {
      if (this.defaults.debug) {
        console.log({
          route: this.population[index],
          fitness: this.population[index].fitness,
        });
      }
      r = r - this.population[index].fitness;
      index++;
    }
    index--;
    if (this.defaults.debug) {
      console.log(
        'The one iwth priority: ',
        this.population[index].fitness,
        this.population[index]
      );
    }
    this.infoPanel.unshift(
      'Selected mates fitness: ' + this.population[index].fitness
    );
    this.generationTopMates.push(this.population[index].fitness);
    return this.population[index]; //.slice();
  };

  @action
  mergeFunction = (pipulationItemAInfo) => {
    const routeBInfo = this.pickOne();
    if (this.defaults.debug) {
      console.log({
        fitnessA: pipulationItemAInfo,
        fitnessAFitness: pipulationItemAInfo.fitness,
      });
      console.log({
        routeBInfo: routeBInfo,
        routeBInfoFitness: routeBInfo.fitness,
      });
    }

    const routeAStartIndex = helper.randomIntFromInterval(
      0,
      pipulationItemAInfo.sequence.length - 2
    );
    const routeAEndIndex = helper.randomIntFromInterval(
      routeAStartIndex,
      pipulationItemAInfo.sequence.length - 1
    );
    // if (this.defaults.debug) {
    //   console.log(pipulationItemAInfo.sequence.map((item) => item.id));
    //   console.log(
    //     pipulationItemAInfo.sequence
    //       .slice(routeAStartIndex, routeAEndIndex)
    //       .map((item) => item.id)
    //   );
    //   console.log(routeBInfo.map((item) => item.id));
    // }

    const parentFromRouteA = pipulationItemAInfo.sequence.slice(routeAStartIndex, routeAEndIndex);
    //const result = helper.shuffleArray(parentFromRouteA);
    let result = [];

    if(Math.floor(Math.random*100)>50){
      result = parentFromRouteA;
    }
    else{
      result = helper.shuffleArray(parentFromRouteA);
    }

    routeBInfo.sequence.forEach((cityB) => {
      const city = result.find((aCity) => aCity.id === cityB.id);
      if (!city) {
        result.push(cityB);
      }
    });

    if (this.defaults.debug) {
      console.log(routeAInfo.map((item) => item.id));
      console.log(parentFromRouteA.map((item) => item.id));
      console.log(routeBInfo.map((item) => item.id));
      console.log(result.map((item) => item.id));
    }

    return {
      distance: undefined,
      fitness: undefined,
      sequence: result,
    };
  };

  @action
  calculateFitnessFunctionForAllRoutes = () => {
    let sum = 0;

    let bestDistance = Infinity;
    //this.bestRouteDistance = Infinity;
    this.bestRouteInGeneration = null;

    this.population.forEach((populationItem) => {
      const distance = this.getRouteFitnessScore(populationItem);      
      populationItem.fitness = 1 / (distance*20);
      populationItem.distance = distance;

      if (bestDistance > distance) {
        bestDistance = distance;
        this.bestRouteInGeneration = populationItem;
      }
      if (this.bestRouteDistance > distance) {
        this.bestRouteDistance = distance;
        this.bestRoute = populationItem;
      }

      if (this.defaults.debug) {
        console.log({ f: populationItem.fitness });
      }
      sum = sum + populationItem.fitness;
    });

    

    this.population.forEach((populationItem) => {
      if (this.defaults.debug) {
        console.log({
          sum,
          percent: (populationItem.fitness / sum) * 100,
          distance: populationItem.distance,
        });
      }
      populationItem.fitness = populationItem.fitness / sum;
    });

    // this.population.forEach((populationItem) => {
    //   populationItem.fitness = populationItem.fitness / sum;
    // });
  };

  @action
  getRouteFitnessScore = (populationItem) => {
    return this.getRouteTotalDistance(populationItem);
  };

  @action
  getRouteTotalDistance = (populationItem) => {
    let totalDistance = 0;
    populationItem.sequence.forEach((point, index) => {
      if (index !== 0) {
        const distance = helper.getDistanceBetweenTwoPoints(
          point,
          populationItem.sequence[index - 1]
        );
        totalDistance = totalDistance + distance;
      }
    });
    return totalDistance;
  };
}

export default Mod;
