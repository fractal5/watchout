// start slingin' some d3 here.

var w = window.innerWidth
var h = window.innerHeight

var gameOptions = {
  width: window.innerWidth* 3 / 4,
  height: window.innerHeight * 3 / 4,
  nEnemies: 2,
  padding: 20 // ???
};

var gameStats = {
  score: 0,
  bestScore: 0,
  collisions: 0
};



var gameBoard = d3.select('.container').append('svg')
  .style('width', gameOptions.width)
  .style('height', gameOptions.height)

var enemies = gameBoard.selectAll('circle').data(d3.range(2)).enter().append('circle')
  .attr('r', 10)
  .attr('cx', function(){
    return Math.random() * gameOptions.width
  })
  .attr('cy', function(){
    return Math.random() * gameOptions.height
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
  var enemies = d3.selectAll('circle');
  // console.log(enemies);

  enemies.
    transition().duration(1000)
  .attr('cx', function(d){
    return Math.random() * gameOptions.width
  })
  .attr('cy', function(){
    return Math.random() * gameOptions.height
  });
  //d3.selectAll('circle') {
    //console.log("circles selected");
  //}
  
  
}, 1000);
