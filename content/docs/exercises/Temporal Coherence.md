# Temporal Coherence
>**Prompt:** Implement an animation with keyframes using the nub library for Processing (Java).
>
Even though **temporal coherence** is a physics term refering to the similarity of waves through time, it can be used as a analogy of animation and it´s coherent flow in the visual computing world.

Now, to really drive this point home it´s necessary to talk about a very important thing regarding animation and it´s implementation in visual computing: we´re talking about **keyframes**.

## Keyframes
As many of us may know, the term **keyframe** derives from the analog animation times in which the starting and finishing frames of an animation were called like this. This means that the keyframes were thw most important frames of an animation and the frames inbetween those were done with the **keyframes as templates.**
![undefined](https://what-when-how.com/wp-content/uploads/2012/07/tmpcd0074_thumb.png)

In computer graphics the process is pretty much the same. Keyframes are determined instances of the animtion that detail a broad idea of what the animation should behave, then the inbetween frames are interpolated automatically usign the keyframes as templates.

For this **Processing.JS** implementation of an animation that uses keyframes we´re prompted to use a library called **Nub**. This library adds a lot of functionality to the animation aspect of processing and really expands the posibilities for computer graphics animation.

## Nub Library for Processing.JS 
In the words of it´s authors, the library is:
>**"** nub is a simple, expressive, language-agnostic, and extensible visual computing library, featuring interaction, visualization and animation frameworks and supporting advanced (onscreen/offscreen) rendering techniques, such as view frustum culling **"**

This library add some new components that help in the animation process, one of the most important ones is the ***node***. This nodes act as objects wich can be transformed in either their position, magnitude or orientation and, only when the ***node*** has a shape asigned to it, it is rendered on the scene.

Another important part of the animation process is the aforementioned ***keyframes***. Keyframes in this library are the instances in time that determines a node´s position, orientation and magnitude in any given moment, thus being the building frame of the whole animation. For the inbetween frames, those are interpolated using the Catmull–Rom spline and the use of this interpolation technique results in really smooth movement of the object being animated.

There are also some other usefull functions in the library that I actually used in the following code: 

 - **node.enableHint(Node.KEYFRAMES):** This displays the axels that come out fo the shape´s keyframes.
 - **node.setAnimationRecurrence(true):** This loops the aniamtion once it lands in the final keyframe.
 - **node.addKeyFrame(Node.AXES | Node.SHAPE, i % 2 == 1 ? 1000 : 4000):**  This is the function that defines the keyframes, in the first part it´s declared that the keyframe will have the axes enabled and that it´ll take the shape declared before. In the second part it´s declared how far in between the keyframes are generated.

