bsonMesh
========

a binary mesh format based on BSON

goals
+ lightweight
+ flexible
+ semantic

idea
--------

There are any number of formats for 3D geometry, but often it is still hard to find one to fit a target application. The simplest formats (STL, OBJ, PLY) can be great for representing basic meshes, but offer limited features and extensibility. More complex formats have a lot of bloat and many are based on XML or are proprietary. How XML became the defacto container format in the 90s, I don't know, but it has been the bane of developers ever since.

I propose a new format based on binary JSON (BSON). BSON provides nice qualities for a geometry container format since it is simple, efficient, and quickly traversable. The goal of this is to make a format that can be lightweight, but is also extensible and expressive with a semantic structure. The format would support quickly loading data and passing it directly to OpenGL without complex parsing. It could also potentially support detailed scenes, object instancing, and animation.
