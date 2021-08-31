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
  //Buoc 1 khoi tao canvas
  var canvas=document.getElementById("webgl");
//Buoc 2 lay phan tu canvas
  var gl=getWebGLContext(canvas);
  //Buoc 3 Khoi tao shader
  initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE);


//Buoc 4 Goi bo dem doi tuong
var n=initVertexBuffer(gl);

  //Buoc 5 Xoa bo dem
  gl.clearColor(0.0,0.0,0.0,1.0);
  //Buoc 6 xoa bo dem
  gl.clear(gl.COLOR_BUFFER_BIT);

  //Buoc 7 ve hinh
gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
}
function initVertexBuffer(gl)
{
  var vertices=new Float32Array([
    0.5,0.5,
    -0.5,0.5,

    0.5,-0.5,
        -0.5,-0.5,
    ]);
  var n=4;
  //Buoc 1:Khoi tao buffer
  var vertexBuffer=gl.createBuffer();
  //Buoc 2 gan dich cho bo dem voi ARRAY_BUFFER
  gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
  //Buoc 3:Dua du lieu vao bo dem doi tuong
  gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);
  //Buoc 4:gan bo dem cho bien thuoc tinh
  var a_Position=gl.getAttribLocation(gl.program,'a_Position');
  gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);

  //Buoc 5:Kich hoat lenh gan
  gl.enableVertexAttribArray(a_Position);
  return n;

}