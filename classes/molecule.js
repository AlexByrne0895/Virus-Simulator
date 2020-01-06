class Molecule {
    constructor(
      _x = random(0 + v.circleSize*4, width - v.circleSize*4)
      , _y = random(0,height)
      , _vx = random(-3, 1)
      , _vy = random(3,-1)
      , _checked = false)

   {
     this.location = createVector(_x, _y);
     this.velocity = createVector(_vx, _vy);
     this.acceleration = createVector(0,0);
     this.Rcolor = color(0, 128, 128);
     this.mass = random(200, 1000);
     this.checked = _checked;
     this.counter = 0;


  }

    update() {

        //let mouse = createVector(mouseX,mouseY)
        //this.acceleration = p5.Vector.sub(mouse,this.location)
        //this.acceleration.setMag(0.2)

        this.velocity.add(this.acceleration);
        this.velocity.limit(100)
        this.location.add(this.velocity);
        // this.acceleration.mult(0);
    }

    display() {
        //pick a brush
        stroke(150);
        strokeWeight(2);
        fill(0, 128, 128);

        //And draw an ellipse at the new location vector points

        ellipse(this.location.x, this.location.y, v.circleSize*2, v.circleSize*2);

        // stroke(150);
        // strokeWeight(1);
        // noFill()
        //
        // ellipse(this.location.x, this.location.y, this.circleSize+20+extraRad, this.circleSize+20+extraRad);

    }

    

    checkEdges() {
        if (this.location.x > width || this.location.x < 0) {
            this.velocity.x = this.velocity.x * -1;
              // colorChange();
        }
        if (this.location.y > height || this.location.y < 0) {
            this.velocity.y = this.velocity.y * -1;
              // colorChange()
        }
    }


}
