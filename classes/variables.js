class Variables {
  constructor(){

    this.circleSize = 14;
    // this.infectionRadius = 50;
    // this.infectionRange = 2;
    this.numHealthy = 25;
    this.numInfected = 1;
    this.numImmune = 9;
    this.numCure = 2;
    this.infectionProb = 0.7


  }

  update() {

    makeMolecules();

  }
}
