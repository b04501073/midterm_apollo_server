const express = require("express")
// const { ApolloServer, gql } = require("apollo-server-express")
const { ApolloServer, gql } = require("apollo-server")

const PalleteModel = require('./confg')
const typeDefs = gql`
    input PalleteInput {
        title: String
        author: [String]
        image: String
        colors: [String]
        tags: [String]
        create_at: String
        last_modified_at: String
        comments: [String]
    }
    input PalleteupdateInput {
        _id: String
        title: String
        author: [String]
        image: String
        colors: [String]
        tags: [String]
        create_at: String
        last_modified_at: String
        comments: [String]
    }
    type Pallete {
        _id: String
        title: String
        author: [String]
        image: String
        colors: [String]
        tags: [String]
        create_at: String
        last_modified_at: String
        comments: [String]
    }
    type Query {
		getPalletes: [Pallete]
    }

    type Mutation {
        createPallete( input: PalleteInput ): Pallete
        deletePallete( id: String! ): Pallete
        updatePallete( input: PalleteupdateInput ): Pallete
	}
`;
const resolvers = {
    Query: {
        // getPalletes_inorder: () => PalleteModel.getPalletes_inorder(),

		getPalletes: () => PalleteModel.getPalletes()
        
    },
    Mutation: {
        createPallete: (_, {input}) => {
            PalleteModel.createPallete(input);
        },
        deletePallete: (_, {id}) => (
            PalleteModel.deletePallete(id)
        ),
        updatePallete: (_, {input}) => (
            PalleteModel.updatePallete(input)
        )
    }

};

const app = express()

const server = new ApolloServer({
	typeDefs,
    resolvers,
    introspection: true,
    playground: true,
})

const port = process.env.PORT || 5000
// const port = 5000

// server.applyMiddleware({ app })

// app.listen(port, () =>
// 	console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
// )
server.listen(port).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
  });
