//Shader program

/*
Các bước thực hiện 
Bước 1:Thực hiện trong shader
    VSHADER_SOURCE
      -Khai báo biến thuộc tính a_TexCoord;
      -Khai báo biến trung gian v_TexCoord;
      -trong hàm main :gán v_TexCoord cho a_TexCoord
    FSHADER_SOURCE
      -Khai báo biến trung gian v_TexCoord
      -Khai báo biến đồng nhất u_Sampler có kiểu dữ liệu sample2D
      -Trong hàm main:
          Thực hiện gán gl_Color=texture2d(u_Sampler,v_TexCoord)
Bước 2:
*/
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute vec2 a_TexCoord;\n' +
  'varying vec2 v_TexCoord;\n' +
  'void main() {\n' +
  '  gl_Position = a_Position;\n' +
  '  v_TexCoord = a_TexCoord;\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'uniform sampler2D u_Sampler;\n' +
  'varying vec2 v_TexCoord;\n' +
  'void main() {\n' +
  '  gl_FragColor = texture2D(u_Sampler, v_TexCoord);\n' +
  '}\n';
function main()
{
var canvas=document.getElementById("webgl");
var gl=getWebGLContext(canvas);
initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE);

var n=initBuffer(gl);
gl.clearColor(0.0,0.0,0.0,1.0);
initTextures(gl,n);
}


//Thiết lập tạo độ kết cấu
function initBuffer(gl)
{
//Bước 1:Khởi tạo mảng chứa các giá trị kết cấu
  var vertices=new Float32Array([
     -0.5,  0.5,   0.0, 1.0,
    -0.5, -0.5,   0.0, 0.0,
     0.5,  0.5,   1.0, 1.0,
     0.5, -0.5,   1.0, 0.0
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
     //Gán biến thuộc tính cho bộ đệm
     gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,FSIZE*4,0);
     gl.enableVertexAttribArray(a_Position);

  //Thực hiện cho texcoord
     var a_TexCoord=gl.getAttribLocation(gl.program,'a_TexCoord');
     //Gán biến thuộc tính cho bộ đệm
     gl.vertexAttribPointer(a_TexCoord,2,gl.FLOAT,false,FSIZE*4,FSIZE*2);
     gl.enableVertexAttribArray(a_TexCoord);

return n;

}

//Thiết lập và tải hình ảnh
function initTextures(gl,n)
{
  //Bước 1:tạo đối tượng kết cấu để chứa ảnh
  var texture=gl.createTexture();
//
  var u_Sampler=gl.getUniformLocation(gl.program,'u_Sampler');

  var image=new Image();
  image.src = '../resources/sky.jpg';

  image.onload = function()
  {
    loadTexture(gl,n,texture,u_Sampler,image);
  };
  
 
}
//truyền ảnh sky vào sampler
function loadTexture(gl,n,texture,u_Sampler,image)
{
  //Bước 1:Lật trục tọa độ về dạng webgl
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis
  // Đồng ý khởi động texture0
  gl.activeTexture(gl.TEXTURE0);
  // Đưa bộ đệm texture vào mục tiêu là TEXTURE_2D
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Set giá trị tham chiếu,MIN_FILTER để co lại
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  // Thiết lập ảnh kết cấu
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
  
  // Thiết lập kết cấu đơn vị 0 vào
  gl.uniform1i(u_Sampler, 0);
  
  gl.clear(gl.COLOR_BUFFER_BIT);   // Clear <canvas>

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n); //VẼ hình chữ nhật

}