//Shader program
  var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
    // 'uniform vec4 u_Translation;\n' +
  'void main() {\n' +
  ' gl_Position = a_Position;\n' +
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
var Tx=0.25,Ty=0.25,Tz=0.25;
//Su dung bo dem


//Bước 1:Lấy phần tử canvas
var canvas=document.getElementById("webgl");
//Buoc 2:Yeu cau ve hinh do hoa
var gl=getWebGLContext(canvas);
//Buoc 3: Khoi tao shader
initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE);
 //khoi tao bo dem


var n=initVertexBuffers(gl);
//Buoc 4 :Thiet lap mau
gl.clearColor(0.0,0.0,0.0,1.0);
//Buoc 5:Xoa bo dem chua mau sac
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLES, 0, n);

//Buoc 6: Ve hinh
}
function initVertexBuffers(gl) {
  var vertices = new Float32Array([
    0, 0.5,   -0.5, -0.5,   0.5, -0.5
  ]);
  var n = 3; // The number of vertices

  // Create a buffer object
  var vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');

  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);

  return n;
}
