// LookAtTriangles.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Color;\n' +
  'uniform mat4 u_ViewMatrix;\n' +
  'varying vec4 v_Color;\n' +
  'attribute vec4 a_Normal;\n' + 

  'uniform mat4 u_MvpMatrix;\n' +
  'uniform vec3 u_LightColor;\n' + 
  'uniform vec3 u_LightDirection;\n' + 

  'void main() {\n' +
  '  gl_Position = u_ViewMatrix * a_Position;\n' +
  '  v_Color = a_Color;\n' +
  ' vec3 normal = normalize(vec3(a_Normal));\n' +
  ' float nDotL = max(dot(u_LightDirection, normal), 0.0);\n' +
  ' vec3 diffuse = u_LightColor * vec3(a_Color) * nDotL;\n' +
  ' v_Color = vec4(diffuse, a_Color.a);\n' +


  '}\n';
// Fragment shader program
var FSHADER_SOURCE =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_FragColor = v_Color;\n' +
  '}\n';
function main() {
  var canvas = document.getElementById('webgl');
  var gl = getWebGLContext(canvas);
  initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)
  var n = initVertexBuffers(gl);
  gl.clearColor(0, 0, 0, 1);
  var u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
  var viewMatrix = new Matrix4();
  viewMatrix.setPerspective(30, 1, 1, 100);
  viewMatrix.lookAt(3, 3, 7, 0, 0, 0, 0, 1, 0);
  gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);
  gl.enable(gl.DEPTH_TEST);
  gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
  //gl.drawArrays(gl.TRIANGLES, 0, n);
  gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0)
}
function initVertexBuffers(gl) {
  var verticesColors = new Float32Array([
    // Vertex coordinates and color(RGBA)
     // Vertex coordinates and color
     1.0,  1.0,  1.0,     1.0,  1.0,  1.0,  // v0 White
    -1.0,  1.0,  1.0,     1.0,  1.0,  1.0,  // v1 Magenta
    -1.0, -1.0,  1.0,     1.0,  1.0,  1.0,  // v2 Red
     1.0, -1.0,  1.0,     1.0,  1.0,  1.0,  // v3 Yellow
     1.0, -1.0, -1.0,     1.0,  1.0,  1.0,  // v4 Green
     1.0,  1.0, -1.0,     1.0,  1.0,  1.0,  // v5 Cyan
    -1.0,  1.0, -1.0,     1.0,  1.0,  1.0,  // v6 Blue
    -1.0, -1.0, -1.0,     1.0,  1.0,  1.0,   // v7 Black 
  ]);
  var indices = new Uint8Array([
    0, 1, 2,   0, 2, 3,    // front
    0, 3, 4,   0, 4, 5,    // right
    0, 5, 6,   0, 6, 1,    // up
    1, 6, 7,   1, 7, 2,    // left
    7, 4, 3,   7, 3, 2,    // down
    4, 7, 6,   4, 6, 5     // back
 ]);

  //Định nghĩa tọa độ vector pháp tuyến
  var normals = new Float32Array([    
 0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,  
 1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,  
 0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,  
 -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  
 0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,  
 0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0
  ]);

  var n = 36;
  var vertexColorbuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorbuffer);
  gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);
  var FSIZE = verticesColors.BYTES_PER_ELEMENT;
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 6, 0);
  gl.enableVertexAttribArray(a_Position);
  var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
  gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
  gl.enableVertexAttribArray(a_Color);
  //index
  var indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);  
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  //Normal
  var normalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, normalBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, normals, gl.STATIC_DRAW);  

  gl.bindBuffer(gl.ARRAY_BUFFER, null);


  //u_LightColor
  var u_LightColor=gl.getUniformLocation(gl.program,'u_LightColor');
  gl.uniform3f(u_LightColor,1.0,1.0,1.0);

  //
  var lightDirection = new Vector3([0.5, 3.0, 4.0]);
  lightDirection.normalize();     // Normalize
  gl.uniform3fv(u_LightDirection, lightDirection.elements);



}
