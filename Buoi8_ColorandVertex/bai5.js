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
   '  gl_FragColor = v_Color;\n' +
  '}\n';

function main()
{
var canvas=document.getElementById("webgl");
var gl=getWebGLContext(canvas);
initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE);

var n=initBuffer(gl);


gl.clearColor(0.0,0.0,0.0,1.0);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLE_FAN,0,n);
}



function initBuffer(gl)
{
//Bước 1:Khởi tạo mảng chứa các giá trị gồm kích thước,size,màu sắc của các điểm
  var vertices=new Float32Array([
      0.5,  0.5,  0.0,  40.0,  1.0, 0.0,  0.0, 
      0.5,  -0.5,  0.0,  10.0,  0.0, 0.0,  1.0,  
      -0.5,  -0.5,  0.0,  20.0,  1.0, 1.0,  0.0, 
      -0.5,  0.5,  0.0,  10.0,  1.0, 0.0,  1.0, 
     
        

    ]);
  //Lấy biến FSIZE để tác động vào các phần tử trong mảng
  var FSIZE=vertices.BYTES_PER_ELEMENT;
  var n=4;
  //Bước 2:Tạo bộ đệm
  var buffer=gl.createBuffer();
  //Bước 3:Gán bộ đệm vào một đích có dạng ARRAY_BUFFER để lưu các giá trị cho các đỉnh
  gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
  //Bước 4:Ghi dữ liệu từ mảng vertices vào cho bộ đệm
  gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);
//Bước 5:Lấy các vị trí của các biến thuộc tính
 var a_Position=gl.getAttribLocation(gl.program,'a_Position');
 var a_PointSize=gl.getAttribLocation(gl.program,'a_PointSize');
  var a_Color=gl.getAttribLocation(gl.program,'a_Color');
//Bước 6:Gán các biến thuộc tính cho các giá trị trong bộ đệm

  gl.vertexAttribPointer(a_Position,3,gl.FLOAT,false,FSIZE*7,0);
  gl.vertexAttribPointer(a_PointSize,1,gl.FLOAT,false,FSIZE*7,FSIZE*3);
  gl.vertexAttribPointer(a_Color,3,gl.FLOAT,false,FSIZE*7,FSIZE*4);
//Bước 7:Chấp nhận lệnh gán
  gl.enableVertexAttribArray(a_Position);
  gl.enableVertexAttribArray(a_PointSize);
  gl.enableVertexAttribArray(a_Color);

return n;

}