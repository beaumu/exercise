BEFORE YOU START CODING
========================
## Setup of project 
There are a couple of ways to setup this project (or any symfony project)
1. [Symfony CLI](https://symfony.com/download)
   * You'll need to install everything follow [this guide then](https://symfony.com/doc/current/setup.html)
2. [Docker using Lando](https://lando.dev/)
   * Everything will be inside the docker container

I suggest using lando and docker. This project is fully setup so that it work with lando and docker out of the box.

### Setup of lando
- You'll need to [install lando](https://docs.lando.dev/getting-started/installation.html)
- It explains it fully

**EXTRA INFO FOR LANDO**
- When using lando everything you'll do will be inside the container
- They made commands for that:
  - Lando start (To start the project)
  - Lando stop (To stop it)
  - Lando composer ... (Is instead of the normal composer command to install stuff)
  - Lando npm ... (Instead of the normal npm command)
  - Lando node ... (Instead of the normal node command)
  - Lando watch (To run your react watcher)
  - Lando info (Shows all the information of your containers like connection credentials)
- Your database is also inside of the container
  - To connect to it from your app, use the internal connection
  - To connect to it from outside, use the external connection

## Basic setup stuff
* connect to database (if you use lando use command `lando info` to get database info)
* install symfony dependencies with composer (composer is already installed in lando, so `lando composer i`)
* install node modules (Normally already done using lando start, otherwise `lando npm i`)
* run server and watcher (Watcher can be done by: `lando watch`)
* navigate to localhost (With lando it will be (https://exercise.lndo.site/))

TASK
====
* make small video app where as admin you can add video links (for example from youtube) with a title and a description.
    * admin can be using twig templates
    * It needs to be stored inside the database

CLIENT SIDE
===========
* see a list of all the video as anonymous user
  * With description and title
* make in react
* Getting data
  * You get the data via api (you'll need to make the api then)
  * Of you can give it to react props

 NICE TO HAVE
 ============
* the admin can see the reviews given by a user on a video on the admin page.
* add api url to dynamically add reviews
* add a review on a chosen video

* use API to add reviews
* use a css framework
* add login page with security for admin
* create wishlist
* add a like button
* search functionality
* add extra data to video (thumbnail, ...)

 FYI
 ===
 * the documentation of [symfony](https://symfony.com/doc/current/index.html) says a lot
 * We also use react [UX package for symfony](https://ux.symfony.com/react)
 * you can use any package you like inside react and symfony
 * assets dir ==> everything for your react frontend
 * src dir ==> backend of your application
 * templates dir ==> twig templates ==> template\default\index.html.twig contains already the start for your react page