//Shader program
	var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
    'attribute float a_Size;\n' +
  'void main() {\n' +
  // ' gl_Position = a_Position;\n' +
   ' gl_Position = vec4(0.9,0.9,0.0,1.0);\n' +
  // 'gl_PointSize = a_Size;\n' +
  'gl_PointSize = 10.0;\n' +
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
// //Bước 4


// //Thiết lập màu nền
gl.clearColor(0.0,0.0,0.0,1.0);


// //Xóa bộ nhớ màu đệm
gl.clear(gl.COLOR_BUFFER_BIT);

// //Vẽ hình
gl.drawArrays(gl.POINTS,0,1);

}