//Import các thư viện cần dùng
const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const {buildSchema} = require('graphql');
const morgan = require('morgan');
const {MongoClient} = require('mongodb');
const username = encodeURIComponent('thanhjang2k');
const password = encodeURIComponent('123456tT');
const cluster = 'cluster0.cz1sb80.mongodb.net';
const authSource = 'retryWrites=true';
const authMechanism = 'w=majority';

let uri = `mongodb+srv://${username}:${password}@${cluster}/?${authSource}&${authMechanism}`;

const client = new MongoClient(uri);
let users = null;
let user = null;
async function run() {
  try {
    await client.connect();
    const database = client.db('home_service');
    users = database.collection('user');
    user = users.find();
    await user.forEach(doc => console.log(doc));
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

const schema = buildSchema(`
  type Query {
    _id: String
    email: String
    password: String
  }
`);

// Root cung cấp chức năng phân giải cho mỗi endpoint API
const root = {
  hello: () => {
    return 'Hello world!';
  },
};

//Tạo server với express
const app = express();

app.use(morgan('combined'));
//Khai báo API graphql
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: user,
    graphiql: true, //sử dụng công cụ GraphiQL để đưa ra các query GraphQL theo cách thủ công
  }),
);

// Khởi tạo server tại port 4000
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
