# ConnectFour


## What is ConnectFour?

ConnectFour is a tic-tac-toe-like two-player game in which players
alternately place pieces on a vertical board 7 columns across and 6 rows high.
Each player uses pieces of a particular color (commonly black and red, or
sometimes yellow and red), and the object is to be the first to obtain four
pieces in a horizontal, vertical, or diagonal line. Because the board is
vertical, pieces inserted in a given column always drop to the lowest
unoccupied row of that column. As soon as a column contains 6 pieces, it is
full and no other piece can be placed in the column
[1](http://mathworld.wolfram.com/Connect-Four.html).

## What is this repository?

This is a ConnectFour clone implemented in [React](https://facebook.github.io/react/) using
[FLUX arhitecture](https://facebook.github.io/flux/docs/overview.html#content)
(to be more precise it uses [RefluxJS](https://github.com/spoike/refluxjs) implementation of FLUX architecture). It
uses [socket.io](http://socket.io/) and [redis](http://redis.io/) for real-time communication and [Laravel](http://laravel.com/) for REST API
(code can be found at
[ConnectFour-backend](https://github.com/nhenezi/connectfour-backend)).


## Requirements

- nodejs/npm
- redis

## Installation instructions

- install bower ang gulp globaly `npm install -g bower gulp`
- install bower dependencies `bower install`
- install npm dependencies `npm install`
- build front-end code `gulp`

You should now have compiled frontend code in `/build directory`
