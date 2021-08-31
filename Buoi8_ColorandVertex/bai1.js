//Shader program
  var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
   'attribute float a_PointSize;\n' +
    // 'uniform vec4 u_Translation;\n' +
  'void main() {\n' +
  ' gl_Position = a_Position;\n' +
    ' gl_PointSize = a_PointSize;\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  'precision mediump float;\n' +
'uniform vec4 u_FragColor;\n'+
  'void main() {\n' +
  // '  gl_FragColor = u_FragColor;\n' +
   '  gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n' +
  '}\n';

function main()
{
var canvas=document.getElementById("webgl");
var gl=getWebGLContext(canvas);
initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE);


var n=initVertexBuffers(gl);


gl.clearColor(0.0,0.0,0.0,1.0);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.POINTS,0,n);
}
function initVertexBuffers(gl) {
  var vertices = new Float32Array([
    0, 0.5, 
   -0.5, -0.5, 
    0.5,0.5
  ]);
  var n = 3; 
//Bộ đệm vị trí cho các đỉnh
  var vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);



//Bộ đệm chứa kích thước cho các đỉnh
  var sizeVertices =new Float32Array([
    10.0,20.0,30.0
  ]);

  var sizeBuffer=gl.createBuffer();
  var a_PointSize=gl.getAttribLocation(gl.program,'a_PointSize');
  gl.bindBuffer(gl.ARRAY_BUFFER,sizeBuffer);
  gl.bufferData(gl.ARRAY_BUFFER,sizeVertices,gl.STATIC_DRAW);
  gl.vertexAttribPointer(a_PointSize,1,gl.FLOAT,false,0,0);
  gl.enableVertexAttribArray(a_PointSize);



  return n;
}