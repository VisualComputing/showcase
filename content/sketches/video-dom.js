let vid;
function setup() {
  noCanvas();

  vid = createVideo(
    ['/go-vc/sketches/fingers.mov', '/go-vc/sketches/fingers.webm'],
    vidLoad
  );

  vid.size(320, 240);
}

// This function is called when the video loads
function vidLoad() {
  vid.loop();
  vid.volume(0);
}