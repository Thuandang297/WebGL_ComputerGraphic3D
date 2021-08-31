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
  'void main() {\n' +
  '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
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

//Bước 5 Gán giá trị cho biến thuộc tính
gl.vertexAttrib3f(a_Position,0.95,0.95,0.0);
gl.vertexAttrib1f(a_Size,5.0);

//Bước 6 Thiết lập màu nền
gl.clearColor(0.0,0.0,0.0,1.0);


// Bước 7 Xóa bộ nhớ màu đệm
gl.clear(gl.COLOR_BUFFER_BIT);

// //Vẽ hình
gl.drawArrays(gl.POINTS,0,1);

}