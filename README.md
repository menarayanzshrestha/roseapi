# roseapi

A simple nodejs project.
It consist of 
1.User signup ..................localhost:8080/signup(POST)
2.User login ...................localhost:8080/login(POST)
3.Upload only jpg images that saves in server as webp............localhost:8080/images(POST)


To run this project:
1.clone the code
2.go to roseapi
3.npm install
4.npm start

As the database used (mongodb is hosted) no need to configure db.

For getting into /images route, user need a token as authorization header to get access to that route.We can get that token as we login.

