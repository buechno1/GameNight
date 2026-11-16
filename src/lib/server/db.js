import { MongoClient } from 'mongodb';
import { DB_URI } from '$app/env/private';

const client = new MongoClient(DB_URI);

export const db = client.db('GameNight');