
var gameOptions = {
  width: window.innerWidth,
  height: window.innerHeight,
  nEnemies: 10
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
     r: 40
    });
  }
  return enemyData;
};

var gameBoard = d3.select('.container').append('svg')
  .style('width', gameOptions.width)
  .style('height', gameOptions.height)

// Try making enemies with shuriken images
var enemies = gameBoard.selectAll('image').data(generateEnemies(gameOptions.nEnemies)).enter()
  .append('svg:image')
  .attr('class', 'shuriken')
  .attr('x', function(d) { return d.cx; })
  .attr('y', function(d) { return d.cy; })
  .attr('width', function(d) { return d.r; })
  .attr('height', function(d) { return d.r; })
  .attr('xlink:href', '9204-shuriken-clipart.png');

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
  enemies.
    transition().duration(1500)
  .attr('x', function(d){
    d.cx = Math.random() * gameOptions.width;
    return d.cx;
  })
  .attr('y', function(d){
    d.cy = Math.random() * gameOptions.height;
    return d.cy;
  });
}, 1000);

// Check for collisions
setInterval(function(){
  var collision = false;
  enemies.each(function(d, i){
    // Try just calculating distance between the center of the hero and enemy
    var heroX = Number(hero.attr('x'));
    var heroY = Number(hero.attr('y'));
    var heroWidth = Number(hero.attr('width'));
    var heroHeight = Number(hero.attr('height'));
    var heroCenterX = heroX + (heroWidth / 2);
    var heroCenterY = heroY + (heroHeight / 2);
    // Enemy Shurikens
    var enemyCenterX = this.getAttribute('x');
    var enemyCenterY = this.getAttribute('y');

    var distance = Math.sqrt(Math.pow(enemyCenterX - heroCenterX, 2) 
                             + Math.pow(enemyCenterY - heroCenterY, 2));
    if (distance < 30) {
      // We had a collision
      collision = true; 
    } 
  });

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
  
}, 30);

