#!/bin/bash

# Create MongoDB data directory
mkdir -p data/db

# Start MongoDB in the background
mongod --dbpath=data/db --bind_ip 0.0.0.0 --port 27017 --fork --logpath data/mongodb.log

# Wait for MongoDB to start
sleep 5

# Start the backend
cd backend && npm run start:dev
