import Fastify from 'fastify'
import fastifySensible from '@fastify/sensible'
import pokemons from './routes/pokemons.js';

const fastify = Fastify({
    logger: true
});

// plugins
fastify.register(fastifySensible);

// custom routes
fastify.get('/', (request, reply) => {
    reply
        .type('text/html')
        .send(`<h1>Welcome to the ${process.env.POKEDEX_NAME} Pok&eacute;dex API!</h1>`);
});

fastify.register(pokemons);

/**
 * Run the server!
 */
const start = async () => {
    try {
        await fastify.listen({ host: "0.0.0.0",port: 3000 })  //normalement ces variables on les met dans des variables d'env
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()
