  //trong bài tập này ta sử dụng công thức

  var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'uniform mat4 u_ModelMatrix;\n' +
    'void main() {\n' +
      ' gl_Position = u_ModelMatrix*a_Position;\n' +
      ' gl_PointSize = 10.0;\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  'precision mediump float;\n' +
  'uniform vec4 u_FragColor;\n'+
    'void main() {\n' +
      '  gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n' +
  '}\n';

var ANGLE=90;
var currentAngle=0.0;

function main()
{

//Tạo ma trận biến đổi mới
var modelMatrix=new Matrix4();
  //Buoc 1:Khởi tạo canvas và shader
  var canvas =document.getElementById("webgl");
  var gl=getWebGLContext(canvas);
  initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE);
  var u_ModelMatrix=gl.getUniformLocation(gl.program,'u_ModelMatrix');


//Bước 2: Xử lí hoạt cảnh

 


  var n=ititBuffer(gl);
  var tick=function()
{
  currentAngle=animate(currentAngle);
  draw(gl,n,currentAngle,modelMatrix,u_ModelMatrix);
  requestAnimationFrame(tick);
};
//Gọi hàm ẩn danh tick()
tick();
//Kết thúc và vẽ tam giác
  gl.clearColor(0.0,0.0,0.0,1.0);
  // gl.clear(gl.COLOR_BUFFER_BIT);
  // gl.drawArrays(gl.TRIANGLES,0,n);



}
function ititBuffer(gl)
{//Tạo ma trận chứa tọa độ các đỉnh
  var vertices=new Float32Array([
    0.5,0.0,
    0.0,0.5,
    0.0,0.0
    ]);
  var n=3;
   var a_Position=gl.getAttribLocation(gl.program,'a_Position');
  //Khởi tạo bộ đệm
    var vertextBuffer=gl.createBuffer();
    //Đưa bộ đệm vào đích
    gl.bindBuffer(gl.ARRAY_BUFFER,vertextBuffer);
    //Đưa giá trị các đỉnh vào cho bộ đệm
    gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);
    //
    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);
  //Chấp nhận để gán biến a_Position
  gl.enableVertexAttribArray(a_Position);

return n;
}
//Hàm draw này dùng để vẽ tam giác
function draw(gl,n,currentAngle,modelMatrix,u_ModelMatrix)
{
  //Bước 1:Thiết lập ma trận chuyển đổi cho hình,ở đây là phép quay với góc quay currentAngle
  modelMatrix.setRotate(currentAngle,0.0,0.0,1.0);
  //Bước 2:Gán biến đồng nhất của ma trận chuyển đổi cho ma trận vừa tạo
  gl.uniformMatrix4fv(u_ModelMatrix,false,modelMatrix.elements);
  //Bước 3:Xóa bộ đệm đi để vẽ hình mới
  gl.clear(gl.COLOR_BUFFER_BIT);
  //Bước 4:Vẽ một tam giác mới
  gl.drawArrays(gl.TRIANGLES,0,n);



}
//Lấy ra thời gian lần cuối gọi hàm này
var g_last=Date.now();
//Hàm animate giúp đưa ra một góc mới với góc đầu vào là góc hiện tại của vật trước khi thay đổi
function animate(angle)
{
  //Lẩy ra thời điểm hiện tại
  var now=Date.now();
  //Lấy ra khoảng thời gian giữa 2 lần gọi hàm
  var elapsed=now-g_last;
  //Gán thời biến glast bằng thời gian hiện tại để sử dụng cho lần gọi hàm sau
  g_last=now;
  //Tính góc mới bằng cách cộng góc cũ với
    //AGLE*elapsed/1000 trả về góc mà hình quay được sau khoảng thời gian eslapsed
  var newAngle=angle+(ANGLE*elapsed)/1000.0;

  return newAngle %360;
}
