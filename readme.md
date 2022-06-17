BEFORE YOU START CODING
========================

* make symfony up and running (up to you, using symfony CLI or lando - docker)
* connect to database (if you use lando use command 'lando info' to get database info)
* install symfony dependencies with composer (composer is already installed in lando)
* install node modules
* run server and watcher
* navigate to localhost

TASK
====
* make small YouTube app whereas admin you can add video links with a title and a description.
    * admin can be using twig templates
* the admin can see the reviews given by a user on a video on the admin page.
* add api url to dynamically add reviews

CLIENT SIDE
===========
* see the videos as anonymous user
* add a review on a chosen video
* make in react
* use API to add reviews


 NICE TO HAVE
 ============
 * use a css framework
 * add login page with security for admin
 * create wishlist
 * add a like button
 * search functionality
 * add extra data to video (thumbnail, ...)

 FYI
 ===
 * the documentation says a lot of symfony
 * you can use any package you like inside react and symfony
 * assets dir ==> everything for your react frontend
 * src dir ==> backend of your application
 * templates dir ==> twig templates ==> template\default\index.html.twig contains already the div "root" for the react part