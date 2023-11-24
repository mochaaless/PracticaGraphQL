// main.ts
import { ApolloServer } from "@apollo/server";
import mongoose from "mongoose"
import { typeDefs } from "./graphSchema.ts";
import { Query } from "./resolvers/query.ts";
import { Mutation } from "./resolvers/mutation.ts";
import { startStandaloneServer } from "@apollo/server/standalone";

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";

const env = await load();

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

await mongoose.connect(MONGO_URL);

// Data
const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
  },
});

const {url} = await startStandaloneServer(server);

console.log(`Server ready at ${url}`);