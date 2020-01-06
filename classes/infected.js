class Infected extends Molecule {
  constructor(_x, _y, _vx, _vy) {
    super(_x, _y, _vx, _vy);
      this.Rcolor = color(95, 17, 0);
    }



    display() {

        //pick a brush
        stroke(255);
        strokeWeight(2);
        fill(this.Rcolor);




        //And draw an ellipse at the new location vector points
        ellipse(this.location.x, this.location.y, v.circleSize*2, v.circleSize*2);



    }


}
