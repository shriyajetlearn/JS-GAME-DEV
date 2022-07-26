let engine = Matter.Engine.create();

let render = Matter.Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: 1600,
    height: 800,
    wireframes: false
  }
});


let ground = Matter.Bodies.rectangle(1280, 500, 400, 20, { isStatic: true });

let ball = Matter.Bodies.circle(400, 200, 20);
let sling = Matter.Constraint.create({
  pointA: { x: 400, y: 200 },
  bodyB: ball,
  stiffness: 0.05
});

let mouse = Matter.Mouse.create(render.canvas);
let mouseConstraint = Matter.MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    render: { visible: false }
  }
});
render.mouse = mouse;

let firing = false;
Matter.Events.on(mouseConstraint, 'enddrag', function (e) {
  if (e.body === ball) firing = true;
});
Matter.Events.on(engine, 'afterUpdate', function () {
  if (firing && Math.abs(ball.position.x - 400) < 20 && Math.abs(ball.position.y - 200) < 20) {
    ball = Matter.Bodies.circle(400, 200, 20);
    Matter.World.add(engine.world, ball);
    image(towerImage,tower.position.x, tower.position.y, 160, 310);
    sling.bodyB = ball;
    firing = false;
  }
});

let stack = Matter.Composites.pyramid(1100, 270, 9, 7, 0, 0, function (x, y) {
  vertices = [
    {x : 0 , y : 40},
    {x : 20 , y : 40},
    {x : -10 , y : 0},
    {x : 30 , y : 0},
]
  return Matter.Bodies.fromVertices(x, y, vertices);
});

Matter.World.add(engine.world, [stack, ground, ball, sling, mouseConstraint]);
Matter.Engine.run(engine);
Matter.Render.run(render);
