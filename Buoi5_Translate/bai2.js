/*
Các bước thực hiện Quay cơ bản
Bước 1:Ở VSHADER và FSHADER ta cần thực hiện
      -Khai báo biến:Khai báo 2 biến đồng nhất có kiểu dữ liệu là float để lưu giá trị cos và sin của góc quay
      -Trong hàm main:Sử dụng công thức để tính toán gl_Position với
            +gl_Position.x=a_Position.x*u_Cos  -a_Postion.y.u_Sin
            +gl_Position.y=a_Position.y*u_Cos +a_Position.x*u_Sin
            +gl.Position.z=a_Position.z;
            +gl.Position.w=1.0;
Bước 2:Trong hàm main():
      -Khai báo một biến Alpha để lưu giá trị góc quay
      -Khai báo biến cos_alpha và sin_alpha để lưu hai giá trị cos và sin này
      -Lấy vị trí của hai biến u_Cos và u_Sin bằng hàm 
            +var u_Cos=gl.getUniformLocation(gl.program,'u_Cos');
            +var u_Sin=gl.getUniformLocation(gl.program,'u_Sin');
      -Gán giá trị biến đồng nhất u_Cos và u_Sin cho cos_alpha và sin_alpha
*/

  var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
   'uniform float u_Cos;\n' +
   'uniform float u_Sin;\n' +
  'void main() {\n' +
     // ' gl_Position = a_Position+u_Translation;\n' +

  ' gl_Position.x = a_Position.x*u_Cos -a_Position.y*u_Sin;\n' +
  ' gl_Position.y = a_Position.y*u_Cos + a_Position.x*u_Sin;\n' +
  ' gl_Position.z = a_Position.z;\n' +
  ' gl_Position.w = 1.0;\n' +
  ' gl_PointSize = 10.0;\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  'precision mediump float;\n' +
'uniform vec4 u_FragColor;\n'+
  'void main() {\n' +
   '  gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n' +
  '}\n';


function main()
{

  var ANGLE=30;

  var anpha=Math.PI*ANGLE/180;

  cos_anpha=Math.cos(anpha);
  sin_anpha=Math.sin(anpha);

  //Bước 1 khởi tạo canvas và shader
  var canvas =document.getElementById("webgl");
  var gl=getWebGLContext(canvas);
  initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE);


var u_Cos=gl.getUniformLocation(gl.program,'u_Cos');
gl.uniform1f(u_Cos,cos_anpha);


var u_Sin=gl.getUniformLocation(gl.program,'u_Sin');
gl.uniform1f(u_Sin,sin_anpha);

  var n=ititBuffer(gl);

  gl.clearColor(0.0,0.0,0.0,1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES,0,n);



}
function ititBuffer(gl)
{
  //Trong bộ đệm:Tạo ma trận lưu các đỉnh 
  var vertices=new Float32Array([
    0.25,0.0,
    -0.25,0.0,
    0.0,0.5
    ]);
  //n là số đỉnh
  var n=3;
//Lấy vị trí biến thuộc tính
   var a_Position=gl.getAttribLocation(gl.program,'a_Position');
  //Khởi tạo bộ dệm mới
    var vertextBuffer=gl.createBuffer();
    //Đưa bộ đệm vào đích là ARRAY_BUFFER giúp lưu các giá trị của đỉnh
    gl.bindBuffer(gl.ARRAY_BUFFER,vertextBuffer);
    //Bước 3:Gán giá trị tọa độ của các đỉnh vào trong bộ đệm
    gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);
    //Thực hiện gán cho biến thuộc tính
    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);
  //Bước 4:Chấp nhận gán
  gl.enableVertexAttribArray(a_Position);

return n;
}