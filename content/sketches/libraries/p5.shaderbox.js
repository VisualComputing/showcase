/***************************************************************************************
* p5.shaderbox.js
* @author Jean Pierre Charalambos, https://github.com/VisualComputing/p5.shaderbox/
* Released under the terms of the GPLv3, refer to: http://www.gnu.org/licenses/gpl.html
***************************************************************************************/

// See:
// https://github.com/processing/p5.js/blob/main/contributor_docs/creating_libraries.md
// https://github.com/processing/p5.js/blob/main/src/core/README.md
// https://github.com/processing/p5.js/blob/main/contributor_docs/webgl_mode_architecture.md
(function () {
  p5.prototype.readShader = function (fragFilename,
    { color = 'vVertexColor',
      texcoord = 'vTexCoord'
    } = {}) {
    let shader = new p5.Shader();
    shader._vertSrc = _vertexShader(color, texcoord);
    this.loadStrings(
      fragFilename,
      result => {
        shader._fragSrc = result.join('\n')
      }
    );
    return shader;
  }

  p5.prototype.makeShader = function (fragSrc,
    { color = 'vVertexColor',
      texcoord = 'vTexCoord'
    } = {}) {
    let shader = new p5.Shader();
    shader._vertSrc = _vertexShader(color, texcoord);
    shader._fragSrc = fragSrc;
    return shader;
  }

  p5.prototype.cover = function ({
    graphics = this,
    texture = false,
    x = -graphics.width / 2,
    y = -graphics.height / 2,
    w = graphics.width,
    h = graphics.height,
    pattern0 = null,
    pattern1 = pattern0,
    pattern2 = pattern0,
    pattern3 = pattern0 } = {}) {
    if (!(graphics._renderer instanceof p5.RendererGL)) {
      throw new Error(`WEBGL is required to use shaderbox.cover`);
    }
    this.beginHUD(graphics);
    graphics.beginShape();
    let color = this.color(255);
    if (texture) {
      graphics.textureMode = this.NORMAL;
    }
    graphics.fill(pattern0 ?? color);
    graphics.vertex(x, y, 0, 0, 0);
    graphics.fill(pattern1 ?? color);
    graphics.vertex(x + w, y, 0, texture ? 1 : 0, 0);
    graphics.fill(pattern2 ?? color);
    graphics.vertex(x + w, y + h, 0, texture ? 1 : 0, texture ? 1 : 0);
    graphics.fill(pattern3 ?? color);
    graphics.vertex(x, y + h, 0, 0, texture ? 1 : 0);
    graphics.endShape(this.CLOSE);
    this.endHUD(graphics);
  }

  // gl handling took from p5.Easycam (https://github.com/freshfork/p5.EasyCam)
  p5.prototype.beginHUD = function (graphics = this) {
    let renderer = graphics._renderer;
    if (!(renderer instanceof p5.RendererGL)) {
      throw new Error(`WEBGL is required to use shaderbox.beginHUD`);
    }
    this._cacheModelView = renderer.uMVMatrix.copy();
    this._cacheProjection = renderer.uPMatrix.copy();
    this._rendererState = renderer.push();
    let gl = renderer.drawingContext;
    gl.flush();
    gl.disable(gl.DEPTH_TEST);
    let z = Number.MAX_VALUE;
    renderer.resetMatrix();
    renderer._curCamera.ortho(-renderer.width / 2, renderer.width / 2, -renderer.height / 2, renderer.height / 2, -z, z);
  }

  p5.prototype.endHUD = function (graphics = this) {
    let renderer = graphics._renderer;
    if (!(renderer instanceof p5.RendererGL)) {
      throw new Error(`WEBGL is required to use shaderbox.endHUD`);
    }
    let gl = renderer.drawingContext;
    gl.flush();
    gl.enable(gl.DEPTH_TEST);
    renderer.pop(this._rendererState);
    renderer.uPMatrix.set(this._cacheProjection);
    renderer.uMVMatrix.set(this._cacheModelView);
  }

  p5.prototype.emitMousePosition = function (shader, {
    graphics = this,
    mouseX = this.mouseX,
    mouseY = this.mouseY,
    uniform = 'u_mouse' } = {}) {
    shader.setUniform(uniform, [mouseX * this.pixelDensity(), (graphics.height - mouseY) * this.pixelDensity()]);
  }

  p5.prototype.emitResolution = function (shader, {
    graphics = this,
    uniform = 'u_resolution' } = {}) {
    shader.setUniform(uniform, [graphics.width * this.pixelDensity(), graphics.height * this.pixelDensity()]);
  }

  p5.prototype.emitTexOffset = function (shader, image, uniform = 'u_texoffset') {
    shader.setUniform(uniform, [1 / image.width, 1 / image.height]);
  }

  function _vertexShader(color, texcoord) {
    return `precision highp float;
            attribute vec3 aPosition;
            attribute vec2 aTexCoord;
            attribute vec4 aVertexColor;
            uniform mat4 uProjectionMatrix;
            uniform mat4 uModelViewMatrix;
            varying vec4 ${color};
            varying vec2 ${texcoord};
            void main() {
              ${color} = aVertexColor;
              ${texcoord} = aTexCoord;
              gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
            }`;
  }
})();