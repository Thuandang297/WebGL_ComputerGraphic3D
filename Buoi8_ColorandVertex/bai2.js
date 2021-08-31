//Shader program
  var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
   'attribute float a_PointSize;\n' +
    'attribute vec4 a_Color;\n' +
    'varying vec4 v_Color;\n' +
    // 'uniform vec4 u_Translation;\n' +
    'void main() {\n' +
    ' gl_Position = a_Position;\n' +
    ' gl_PointSize = a_PointSize;\n' +
    ' v_Color = a_Color;\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  'precision mediump float;\n' +
     'varying vec4 v_Color;\n' +

  'void main() {\n' +
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
  var verticesSizePos = new Float32Array([
    0.0 ,  0.5  , 0.0 ,   10.0, 
   -0.5 , -0.5  , 0.0 ,   20.0,  
    0.5 , -0.5  , 0.0 ,   30.0, 
  ]);
  var n = 3; 
  var FSIZE=verticesSizePos.BYTES_PER_ELEMENT;
//Bộ đệm vị trí cho các đỉnh
  var sizePosBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, sizePosBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, verticesSizePos, gl.STATIC_DRAW);


  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
   var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');


  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE*4, 0);
  gl.vertexAttribPointer(a_PointSize,1,gl.FLOAT,false,FSIZE*4,FSIZE*3)


  gl.enableVertexAttribArray(a_Position);
  gl.enableVertexAttribArray(a_PointSize);



//Bộ đệm chứa kích thước cho các đỉnh




  return n;
}