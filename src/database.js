import mongoose from 'mongoose';

mongoose.connect('process.env.MONGO_URL')
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('Could not connect to MongoDB', error));

