import cors from 'cors';
import express from 'express';
import expressJwt from 'express-jwt';
import jwt from 'jsonwebtoken';
import { ApolloServer } from 'apollo-server-express';

import db from './db.js';
import { typeDefs } from './graphql/schema.js';
import { resolvers } from './graphql/resolvers.js';

const port = 9000;
const jwtSecret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');

const app = express();
app.use(
  cors(),
  express.json(),
  expressJwt({
    secret: jwtSecret,
    credentialsRequired: false
  })
);

const context = ({ req }) => ({
  user: db.users.get(req.user?.sub)
});

const apolloServer = new ApolloServer({ typeDefs, resolvers, context });
await apolloServer.start();
apolloServer.applyMiddleware({ app, path: '/graphql' });

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = db.users.list().find((user) => user.email === email);
  if (!(user && user.password === password)) {
    res.sendStatus(401);
    return;
  }
  const token = jwt.sign({ sub: user.id }, jwtSecret);
  res.send({ token });
});
app.listen(port, () => console.info(`Server started on port ${port}`));
