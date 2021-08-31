//Shader program
  var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
    'attribute float a_Size;\n' +
  'void main() {\n' +
  ' gl_Position = a_Position;\n' +
  'gl_PointSize = a_Size;\n' +

  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  'precision mediump float;\n' +
'uniform vec4 u_Color;\n'+
  'void main() {\n' +
  '  gl_FragColor = u_Color;\n' +
  '}\n';

function main()
{
//Bước 1:Lấy phần tử canvas
var canvas=document.getElementById("webgl");
//Bước 2:yêu cầu dựng hình
var gl=getWebGLContext(canvas);
//Bước 3:Khởi tạo shader
initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE);
// //Bước 4:Lấy vị trí biến thuộc tính
var a_Position=gl.getAttribLocation(gl.program,'a_Position');
var a_Size=gl.getAttribLocation(gl.program,'a_Size');
var u_Color=gl.getUniformLocation(gl.program,'u_Color');
//Đăng kí sự kiện click chuột
canvas.onmousedown=function(ev)
{
  click(ev,gl,canvas,a_Position,a_Size,u_Color);
};

//Xử lí sự kiện click chuột

// //Thiết lập màu nền
gl.clearColor(0.0,0.0,0.0,1.0);


// //Xóa bộ nhớ màu đệm
gl.clear(gl.COLOR_BUFFER_BIT);



}
 var g_points =[];
 var g_color=[];

function click(ev,gl,canvas,a_Position,a_Size,u_Color)
{
  //Bước 1:Lấy vị trí con trỏ chuột
  var x=ev.clientX;
  var y=ev.clientY;

  var rect=ev.target.getBoundingClientRect();
//Lấy giá trị của click trong canvas
  x=((x-rect.left)-canvas.width/2)/(canvas.width/2);
  y=((canvas.height/2)-(y-rect.top))/(canvas.height/2);

  g_points.push(x);
  g_points.push(y);

  if(x>0|| y>0)
  {
    g_color.push([1.0,0.0,0.0,1.0]);
  }
    if(x>0|| y<0)
  {
    g_color.push([0.0,1.0,0.0,1.0]);
  }

  if(x<0|| y<0)
  {
    g_color.push([1.0,1.0,0.0,1.0]);
  }

  if(x<0|| y>0)
  {
    g_color.push([0.0,0.0,1.0,1.0]);
  }


//Bước 2:Xóa bộ đệm màu sắc

  gl.clear(gl.COLOR_BUFFER_BIT);

// Bước 3 Vẽ từng điểm
var len=g_points.length;
 for (var i=0;i<len;i=i++)
{
     gl.vertexAttrib3f(a_Position, x, y, 0.0);
  gl.vertexAttrib3f(a_Position,g_points[i],g_points[i+1],0.0);
  gl.vertexAttrib1f(a_Size,10.0);
  gl.uniform4f(u_Color,g_color[0*i],g_color[1*i],g_color[2*i],g_color[3*i]);

  //vẽ
  gl.drawArrays(gl.POINTS,0,1);
}




}

// var g_colors = [];  // The array to store the color of a point
// function click(ev, gl, canvas, a_Position,a_Size, u_FragColor) {
//   var x = ev.clientX; // x coordinate of a mouse pointer
//   var y = ev.clientY; // y coordinate of a mouse pointer
//   var rect = ev.target.getBoundingClientRect();

//   x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
//   y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);


//     g_colors.push([1.0, 0.0, 0.0, 1.0]);  // Red
//     g_points.push(x);
//   g_points.push(y);


//   // Clear <canvas>
//   gl.clear(gl.COLOR_BUFFER_BIT);

//   // var len = g_points.length;
//   for (var i=0;i<10;i=i+2){
//     var rgba = g_colors[i];

//     // Pass the position of a point to a_Position variable
//     gl.vertexAttrib3f(a_Position, x, y, 0.0);
//     gl.vertexAttrib1f(a_Size,10.0);
//     // Pass the color of a point to u_FragColor variable
//     gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
//     // Draw
//     gl.drawArrays(gl.POINTS, 0, 1);
    
//       // g_points.shift();
  
//   }

//     gl.clearColor(1.0, 1.0, 0.0, 1.0);
//      gl.clear(gl.COLOR_BUFFER_BIT);
  
// }