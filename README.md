bsonMesh (B3D)
========

a binary mesh format based on BSON

goals
+ lightweight
+ flexible
+ semantic

idea
--------

There are any number of formats for 3D geometry, but often it is still hard to find one to fit a target application. The simplest formats (STL, OBJ, PLY) can be great for representing basic meshes, but offer limited features and extensibility. More complex formats have a lot of bloat and many are based on XML or are proprietary. How XML became the defacto container format in the 90s, I don't know, but it has been the bane of developers ever since.

I propose a new format based on binary JSON (BSON). [BSON](bsonspec.org) provides nice qualities for a geometry container format since it is simple, efficient, and quickly traversable. The goal of this is to make a format that can be lightweight, but is also extensible and expressive with a semantic structure. The format would support quickly loading data and passing it directly to OpenGL without complex parsing. It could also potentially support detailed scenes, object instancing, and animation.

draft
--------

The format consists of a BSON document containing objects of differing type. The fundamental type is a "mesh". The idea of the mesh object is to mimic the structure of a Vertex Buffer Object (VBO). This provides a way to store 3D assests in a compact way that can be passed directly to the GPU. A mesh is represented as an array object in BSON with flexible members.

mesh =:  
  type => "mesh"  
  numVertices => int32  
  numIndices => int32  
  vertices => binary (represents the vertex positions)  
  indices => binary (represents the indices of the triangles)  
  indexType => int32 (optional flag to designate type of indices: 16-bit or 32-bit)  

The mesh type is meant to be flexible, so it may optionally contain normals, texture coordinates or other custom data.
