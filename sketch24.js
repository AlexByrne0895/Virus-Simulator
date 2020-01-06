//LIST OF VARIABLES
let v = new Variables();

let numHealthy = 10;

let numInfected = 10;

let numImmune = 1;

let numCure = 1;

let molecules = [];

let counter = 0;
let counterMax = 60;
let counterDirection = true


function setup() {
    let sketch = createCanvas(1250, 700);
    sketch.parent('canvasHolder');

     // bg = loadImage('assets/earth.jpg');

    //CALLS THE GUI FUNCTION
    let gui = new dat.GUI();

    let f1 = gui.addFolder('Controller');
    f1.add(v, 'circleSize', 1, 80)
    .step(1);

    //GUI IS USED TO CREATE A CONTROLLER ON THE BROWSER
    //THIS CONTROLLER IS USED TO CHANGE THE CIRCLE SIZE, AND THE AMOUNT OF DIFFERENT TYPES OF MOLECULES
    let f2 = gui.addFolder('Infection Spreader');
    f2.add(v,'numHealthy', 1, 30)
    .step(1);
    f2.add(v,'numInfected', 1, 30)
    .step(1);
    f2.add(v, 'numImmune', 0, 30)
    .step(1);
    f2.add(v, 'numCure', 0, 30)
    .step(1);

    f2.add(v, 'update');

    makeMolecules();

}

function makeMolecules() {

  molecules=[];

    //THIS CODE BELOW IS A LOOP USED TO CREATE OUR DIFFERENT TYPES OF MOLECULES

    //Creates and Loads Healthy Molecule
    for (let i = 0; i < v.numHealthy; i++) {
        molecules.push(new Healthy());
    }

    //Creates and loads Infected Molecule
    for (let i = 0; i < v.numInfected; i++) {
        molecules.push(new Infected());
    }

    //Creates and loads Immune Molecule
    for (let i = 0; i < v.numImmune; i++) {
        molecules.push(new Immune());
    }

    //Creates and loads Cure Molecule
    for (let i = 0; i < v.numCure; i++) {
        molecules.push(new Cure());
    }

}

function update() {

}


function draw() {
    // background(bg);
     background(255, 153, 153);

     if (counter < counterMax && counterDirection == true) {
       counter++;
       if (counter > counterMax){
         counterDirection = false;
       }
     }
     else {
       counterDirection = false;
       counter--;
       if (counter == 0) {
         counterDirection=true;
       }
     }


     fill(255);
     stroke(0);
     textSize(20);

     //SHOWS THE FRAMERATE AT THE TOP LEFT HAND SIDE
    let fps = frameRate();
    text("Framerate: " + fps.toFixed(2), 10, 40);

    for (let i = 0; i < molecules.length; i++) {
      for (let j = i + 1; j < molecules.length; j++) {

        let ax =molecules[i].location.x;
        let ay =molecules[i].location.y;
        let bx =molecules[j].location.x;
        let by =molecules[j].location.y;
        let dia =v.circleSize*2;






        if(collideCircleCircle(ax, ay, dia, bx, by, dia)){
           // console.log("collide?");


           //THE CODE BELOW WAS USED TO FIX MY INTERSECTING OBJECT
           //THE FIRST THING WE DID WAS TO FIND THE ANGLE BETWEEN TWO OF THE OBJECTS, THIS WOULD HELP WITH GETTING THEM TO BOUNCE OFF EACH OTHER AND CONTINUE THEIR PATH
           let angleI = Math.atan2(-molecules[i].velocity.x,-molecules[i].velocity.y)* 180 / Math.PI;;
           let angleJ = Math.atan2(-molecules[j].velocity.x,-molecules[j].velocity.y)* 180 / Math.PI;;

           let dx = ax-bx;
           let dy = ay-by;
           let dist = Math.sqrt(dx*dx + dy*dy);

           //WORKS OUT HOW THE 2 OBJECTS INTERACT WHEN CONTACT IS MADE BETWEEN 2 OBJECTS

           if (dist < v.circleSize*2 -2 ){

            //FINDS THE GAP BETWEEN THE 2 OBJECTS

             let gap= (v.circleSize*2)-dist


              molecules[i].location.x += (gap/2)*(Math.cos(angleI))
              molecules[i].location.y += (gap/2)*(Math.sin(angleI))
              molecules[j].location.x += (gap/2)*(Math.cos(angleJ))
              molecules[j].location.y += (gap/2)*(Math.sin(angleJ))



           }

           let num = random(1);

          if(num < v.infectionProb) {
              // console.log("infection");


           	//HEALTHY TURN TO INFECTED WHEN CONTACT IS MADE WITH INFECTED
           if(molecules[i].constructor.name == "Healthy" && molecules[j].constructor.name == "Infected"){
              let tempObj = new Infected(molecules[j].location.x,molecules[j].location.y,molecules[j].velocity.x,molecules[j].velocity.y)
                molecules.splice(j, 1, tempObj);
             // console.log ("check")
           }

            //HEALTHY TURN TO INFECTED WHEN CONTACT IS MADE WITH INFECTED
           if(molecules[i].constructor.name == "Healthy" && molecules[j].constructor.name == "Infected"){
              let tempObj = new Infected(molecules[i].location.x,molecules[i].location.y,molecules[i].velocity.x,molecules[i].velocity.y)
                molecules.splice(i, 1, tempObj);
           }



           //INFECTED TURN TO HEALTHY WHEN CONTACT IS MADE WITH IMMUNE
          if(molecules[i].constructor.name == "Infected" && molecules[j].constructor.name == "Immune"){
             let tempObj = new Healthy(molecules[j].location.x,molecules[j].location.y,molecules[j].velocity.x,molecules[j].velocity.y)
               molecules.splice(j, 1, tempObj);
            // console.log ("check")
          }

           //INFECTED TURN TO HEALTHY WHEN CONTACT IS MADE WITH IMMUNE
          if(molecules[i].constructor.name == "Infected" && molecules[j].constructor.name == "Immune"){
             let tempObj = new Healthy(molecules[i].location.x,molecules[i].location.y,molecules[i].velocity.x,molecules[i].velocity.y)
               molecules.splice(i, 1, tempObj);
          }



         // //INFECTED TURNS TO IMMUNE WHEN CONTACT IS MADE WITH CURE
         // if(molecules[i].constructor.name == "Infected" && molecules[j].constructor.name == "Cure"){
         //    let tempObj = new Immune(molecules[j].location.x,molecules[j].location.y,molecules[j].velocity.x,molecules[j].velocity.y)
         //      molecules.splice(j, 1, tempObj);
         //   // console.log ("check")
         // }
         //
         //  //HEALTHY TURNS TO CURE WHEN CONTACT IS MADE WITH IMMUNE
         // if(molecules[i].constructor.name == "Infected" && molecules[j].constructor.name == "Infected"){
         //    let tempObj = new Immune(molecules[i].location.x,molecules[i].location.y,molecules[i].velocity.x,molecules[i].velocity.y)
         //      molecules.splice(i, 1, tempObj);
         // }



         //HEALTHY TURNS TO CURE WHEN CONTACT IS MADE WITH IMMUNE
         if(molecules[i].constructor.name == "Immune" && molecules[j].constructor.name == "Immune"){
            let tempObj = new Cure(molecules[j].location.x,molecules[j].location.y,molecules[j].velocity.x,molecules[j].velocity.y)
              molecules.splice(j, 1, tempObj);
           // console.log ("check")
         }

          //HEALTHY TURNS TO CURE WHEN CONTACT IS MADE WITH IMMUNE
         if(molecules[i].constructor.name == "Immune" && molecules[j].constructor.name == "Immune"){
            let tempObj = new Cure(molecules[i].location.x,molecules[i].location.y,molecules[i].velocity.x,molecules[i].velocity.y)
              molecules.splice(i, 1, tempObj);
         }


       }
         else {
           // console.log("immune");
         }





           //CALCULATE THE NORMALS(PERCENTAGE OF DIFFERENCE)
          let normalX = dx/dist;
          let normalY = dy/dist;

          //FIND THE MIDPOINT
          let midpointX = (ax+bx)/2;
          let midpointY = (ay+by)/2;

          let dVector = (molecules[i].velocity.x - molecules[j].velocity.x)*normalX;
          dVector += (molecules[i].velocity.y - molecules[j].velocity.y)*normalY;

          let dvx = dVector * normalX;
          let dvy = dVector * normalY;

          //VX = VELOCITY
          molecules[i].velocity.x -= dvx;
          molecules[i].velocity.y -= dvy;

          molecules[j].velocity.x += dvx;
          molecules[j].velocity.y += dvy;

    }
  }
}



  for (let i = 0; i < molecules.length; i++) {
        molecules[i].update();
        molecules[i].display();
        molecules[i].checkEdges();
    }

}
