
var gameOptions = {
  width: window.innerWidth,
  height: window.innerHeight,
  nEnemies: 2,
  padding: 20 // ???
};

var gameStats = {
  score: 0,
  bestScore: 0,
  collisions: 0
};

var generateEnemies = function(numEnemies){
  var enemyData = [];
  for(var i = 0; i<numEnemies; i++){
    enemyData.push(
    {cx: Math.random() * gameOptions.width,
     cy: Math.random() * gameOptions.height,
     r: 10
    });
  }
  return enemyData;
};

var gameBoard = d3.select('.container').append('svg')
  .style('width', gameOptions.width)
  .style('height', gameOptions.height)

var enemies = gameBoard.selectAll('circle').data(generateEnemies(10)).enter().append('circle')
  .attr('r', function(d) { return d.r; })
  .attr('cx', function(d){
    return d.cx;
  })
  .attr('cy', function(d){
    return d.cy;
  })
  .style('fill', 'black');

// Define drag callbacks for our hero!
var onDragDrop = function (dragHandler, dropHandler) {
  var drag = d3.behavior.drag();
  drag.on("drag", dragHandler);
  return drag;
};

// TODO: prevent hero from being dragged off the board
var dragmove = function (d) {
  d3.select(this)
  .attr("x", d.x = d3.event.x)
  .attr("y", d.y = d3.event.y);
};

var hero = d3.select('svg').append('rect').data([{x: gameOptions.width / 2, 
  y: gameOptions.height / 2 }])
  .attr('width', 20)
  .attr('height', 20)
  .attr('x', function (d) { return d.x; })
  .attr('y', function (d) { return d.y; })
.style('fill', 'orange')
.call(onDragDrop(dragmove));

setInterval(function() {
  // var enemies = d3.selectAll('circle');
  enemies.
    transition().duration(1000)
  .attr('cx', function(d){
    d.cx = Math.random() * gameOptions.width;
    return d.cx;
  })
  .attr('cy', function(d){
    d.cy = Math.random() * gameOptions.height;
    return d.cy;
  });
}, 1000);

// Check for collisions
setInterval(function(){

  // var enemies = d3.selectAll('circle');
  var collision = false;

  // console.log('collision set to false');
  //console.log("heroX: ", heroX, " heroY: ", heroY);
  //console.log(hero.getAttribute('x'));


  enemies.each(function(d, i){
    // var enemyMinX = d.cx - d.r;
    // var enemyMinX = this.getAttribute('cx') - d.r; 
    // var enemyMaxXX = this.getAttribute('cx') + d.r;
    // var enemyMinY = this.getAttribute('cy') - d.r;
    // var enemyMaxYY = this.getAttribute('cy') + d.r; 
    // var xIntersection = (enemyMinX > heroX && enemyMinX < heroX + heroWidth) || 
    //                     (enemyMaxXX > heroX && enemyMaxXX < heroX + heroWidth);
    // var yIntersection = (enemyMinY > heroY && enemyMinY < heroY + heroHeight) || 
    //                     (enemyMaxYY > heroY && enemyMaxYY < heroY + heroHeight);

    // console.log("enemyMinX: ", enemyMinX, " enemyMaxXX: ", enemyMaxXX, 
    //             " enemyMinY: ", enemyMinY, " enemyMaxYY: ", enemyMaxYY,
    //             " xIntersection: ", xIntersection, " yIntersection: ", yIntersection);


    // Try just calculating distance between the center of the hero and enemy
    var heroX = Number(hero.attr('x'));
    var heroY = Number(hero.attr('y'));
    var heroWidth = Number(hero.attr('width'));
    var heroHeight = Number(hero.attr('height'));
    var heroCenterX = heroX + (heroWidth / 2);
    var heroCenterY = heroY + (heroHeight / 2);
    var enemyCenterX = this.getAttribute('cx');
    var enemyCenterY = this.getAttribute('cy');


    var distance = Math.sqrt(Math.pow(enemyCenterX - heroCenterX, 2) 
                             + Math.pow(enemyCenterY - heroCenterY, 2));

    console.log("heroX: ", heroX, " heroY: ", heroY, 
                " heroWidth: ", heroWidth);
    console.log("heroCenterX: ", heroCenterX, " heroCenterY ", heroCenterY, 
                " enemyCenterX: ", enemyCenterX, " enemyCenterY: ", enemyCenterY,
                " distance: ", distance);

    // if(xIntersection && yIntersection){
    if (distance < 10) {
      // We had a collision
      collision = true; 
      console.log("collision"); 
    } 
  });

  // console.log("collision set to: ", collision);
  // Update scores for this iteration
  if (collision) {
    if(gameStats.score > gameStats.bestScore) {
      gameStats.bestScore = gameStats.score;
    }
    gameStats.score = 0;
  } else {
    gameStats.score++; 
  }
  $('.high span').html(gameStats.bestScore);
  $('.current span').html(gameStats.score);
  
}, 10);

