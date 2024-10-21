cd client 
npm start

cd ../server
npm start

build docker image:
docker build -t neurovista .

run docker container:
docker run -p 3000:3000 -p 3001:3001 --env-file .env neurovista