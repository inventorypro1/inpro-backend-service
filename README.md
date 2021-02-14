## How to push a new image to docker hub
First you have to make sure that you are logged into the docker account of inventorypro1, do the following
 - `docker logout`
 - `docker login` (then enter your username and password)

Right now you're in. Now you have to build the image, tag it and push it like this:
 - Navigate to the root directory of the project
 - Remove all existing docker images for the inpro-backend-service with `docker rmi <image_id>`
 - Build the image: `docker build -t inpro-backend-service .`
 - Tag the image: `docker tag <image_id> inventorypro1/inventory_pro:inpro-backend-service`
 - Push the image: `docker push inventorypro1/inventory_pro`
 
## How to retrieve the docker image from the private repo
 - Login to the docker account (instructions above)
 - docker pull inventorypro1/inventory_pro:inpro-backend-service

## Testing
You can run the unit tests of the application by running `yarn test` in the root directory.

## Random notes
Followed this guide to implement the basic MERN application: 
https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669

Going to follow this blogpost: https://jasonwatmore.com/post/2019/11/18/react-nodejs-on-aws-how-to-deploy-a-mern-stack-app-to-amazon-ec2
(aka this video https://www.youtube.com/watch?v=FanoTGjkxhQ&ab_channel=JasonWatmore) to deploy the app on an AWS server.

It seems however that this guide assumes that you have the front end and backend as 2 separate running applications,
which is perfect as this is what I wanted... A separation of concerns with respect to the front and back end. So I am
going to have to split up the front and backend before following this guide I guess.

Mongo articles:
https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design-part-1

Token encryption on APIs https://www.freecodecamp.org/news/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52/