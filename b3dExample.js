//require(bson);

/**
 * Make a B3D file from vertices and triangle indices
 *
 * @param {Float32Array} vertexData vertex positions in float triplets (x,y,z)
 * @param {UintArray} indexData triangle indices
 */
function saveB3D(vertexData, indexData) {
  var b3d = {};
  b3d.objectName = {};
  b3d.objectName.type = "mesh";
  b3d.objectName.numVertices = vertexData.length/3;
  b3d.objectName.numIndices = indexData.length;
  
  //Silly Binary object used by the MongoDB BSON api. It should just work with ArrayBuffers
  b3d.objectName.vertices = new Binary(new Uint8Array(vertexData.buffer,vertexData.byteOffset,vertexData.length*4));
  b3d.objectName.indexType = vbo.indexData instanceof Uint16Array ? 16 : 32;
  b3d.objectName.indices = new Binary(new Uint8Array(indexData.buffer,vbo.indexData.byteOffset,indexData.length*(vbo.indexData instanceof Uint16Array ? 2 : 4)));
  var buffer = BSON.serialize(b3d, false, true, false);
  return buffer;
}

/**
 * Load b3d meshes as VBOs from an ArrayBuffer
 *
 * @param {ArrayBuffer} buffer bson document stored in an ArrayBuffer
 */
function loadB3DAsVbo(buffer) {
  var vbos = [];
  var doc = BSON.deserialize(req.response);
  var obj;
  for(obj in doc) {
    if(obj.type == "mesh") {
      vbos.push(parseB3DMesh(obj));
    }
  }
}

//pretend there is a magic gl object in the sky
function parseB3DMesh(bsonMesh) {
  var vbo = {};
  vbo.indexBuffer = gl.createBuffer();
  vbo.vertexBuffer = gl.createBuffer();
  vbo.vertexData = new Float32Array(bsonMesh.vertices);
  if(bsonMesh.indexType == 16) {
    vbo.indexData = new Uint16Array(bsonMesh.indices);
  } else {
    vbo.indexData = new Uint32Array(bsonMesh.indices);
  }
  gl.bindBuffer(gl.ARRAY_BUFFER,vbo.vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER,vbo.vertexData,gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,vbo.indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,vbo.indexData,gl.STATIC_DRAW);
  return vbo;
}