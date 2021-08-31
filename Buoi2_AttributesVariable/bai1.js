//Shader program
	var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'void main() {\n' +
  '  gl_Position = a_Position;\n' +
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
var ctx=canvas.getContext('2d');
ctx.fillStyle='rgba(0,0,255,1.0)';
ctx.fillRect(120,100,150,150);
var gl=getWebGlContext(canvas);
//Bước 3:Khởi tạo shader
// initShader(gl,VSHADER_SOURCE,FSHADER_SOURCE);
// //Bước 4


// //Thiết lập màu nền
// gl.clearColor(1.0,1.0,1.0,1.0);


// //Xóa bộ nhớ màu đệm
// gl.clear(gl.COLOR_BUFFER_BIT);

// //Vẽ hình
// // gl.drawArrays(gl.POINTS,0,1);

}