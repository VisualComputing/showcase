/**
 * 
 * The p5.EasyCam library - Easy 3D CameraControl for p5.js and WEBGL.
 *
 *   Copyright 2018-2020 by p5.EasyCam authors
 *
 *   Source: https://github.com/freshfork/p5.EasyCam
 *
 *   MIT License: https://opensource.org/licenses/MIT
 * 
 * 
 * explanatory notes:
 * 
 * p5.EasyCam is a derivative of the original PeasyCam Library by Jonathan Feinberg 
 * and combines new useful features with the great look and feel of its parent.
 * 
 * 
 */
 
 
//
// Simple Demo to get started.
//


// took from: https://github.com/freshfork/p5.EasyCam/blob/master/examples/QuickStart/QuickStart.js

var easycam;

function setup() {
  createCanvas(500, 500, WEBGL);
  setAttributes('antialias', true);

  easycam = createEasyCam();
} 

function draw(){
	rotateX(-0.5);
	rotateY(-0.5);
	scale(10);
  
  background(0);
	strokeWeight(1);

	fill(255, 64, 0);
	box(15);
  
	push();
	translate(0, 0, 20);
	fill(0, 64, 255);
	box(5);
	pop();
  
  push();
	translate(0, 0, -20);
	fill(64, 255, 0);
	box(5);
	pop();
}