  //trong bài tập này ta sử dụng công thức

  var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
   'uniform mat4 uxform_Matrix;\n' +

  'void main() {\n' +
' gl_Position = uxform_Matrix*a_Position;\n' +
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
  var Tx=0.95,Ty=0.45,Tz=0.25;

var ANGLE=60;
  var anpha=Math.PI*ANGLE/180;

  cos_anpha=Math.cos(anpha);
  sin_anpha=Math.sin(anpha);


  //Buoc 1
  var canvas =document.getElementById("webgl");
  var gl=getWebGLContext(canvas);
  initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE);
//Cách sử dụng Matrix4()
/*
      Bước 1:Khai bảo một biến đồng nhất có dạng matrix4  có tên uxform_Matrix
      Bước 2:Gán gl_position =uxformMatrix*a_Position
      Bước 3:Trong hàm main tạo một biến dạng Matrix4 để lưu ma trận thay đổi:var xformMatrix=new Matrix4();
      Bước 4:Xác định kiểu dịch chuyển-(Dịch chuyển,co dãn, quay)
      Bước 5:Lấy vị trí của biến uxformMatrix trong vertexShader:getuniformLocation();
      Bước 6:Gán biến uxformMatrix cho xformMatrix.elements
*/
  var xformMatrix=new Matrix4();

xformMatrix.setTranslate(0.0,0.5,0.0,1.0);


 //  xformMatrix.setTranslate(0.5,0,0);
 // xformMatrix.rotate(90,0,0,1.0);
var uxform_Matrix=gl.getUniformLocation(gl.program,'uxform_Matrix');
gl.uniformMatrix4fv(uxform_Matrix,false,xformMatrix.elements);



  var n=ititBuffer(gl);

  gl.clearColor(0.0,0.0,0.0,1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES,0,n);



}
function ititBuffer(gl)
{
  var vertices=new Float32Array([
    0.5,0.0,
    0.0,0.5,
    0.0,0.0
    ]);
  var n=3;
   var a_Position=gl.getAttribLocation(gl.program,'a_Position');
  //Khoi tao buffer
    var vertextBuffer=gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,vertextBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);
  //Enable
  gl.enableVertexAttribArray(a_Position);

return n;
}