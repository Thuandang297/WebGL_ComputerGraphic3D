//Shader program
  var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
   'uniform vec4 u_Translation;\n' +
    // 'uniform vec4 u_Translation;\n' +
  'void main() {\n' +
  ' gl_Position = a_Position+ u_Translation;\n' +
    ' gl_PointSize = 10.0;\n' +
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
  var Tx=0.25,Ty=0.5,Tz=0.0;
var canvas=document.getElementById("webgl");
var gl=getWebGLContext(canvas);
initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE);


var n=initVertexBuffers(gl);
var u_Translation=gl.getUniformLocation(gl.program,'u_Translation');
gl.uniform4f(u_Translation,Tx,Ty,Tz,0.0);

gl.clearColor(0.0,0.0,0.0,1.0);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLES,0,n);
}
function initVertexBuffers(gl) {
  var vertices = new Float32Array([
    0, 0.5,   -0.5, -0.5,  0.5,-0.5
  ]);
  var n = 3; 

  var vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);

  return n;
}