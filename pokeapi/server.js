import Fastify from 'fastify'
import fastifySensible from '@fastify/sensible'
import pokemons from './routes/pokemons.js';


const HEALTHCHECK_ENDPOINT = process.env.HEALTHCHECK_ENDPOINT || "/health"; //toujours bien d'avoir des valeurs par defaut
const POKEDEX_NAME = process.env.POKEDEX_NAME;
if(typeof POKEDEX_NAME === "undefined"){
    throw new Error('POKEDEX_NAME must be set');
}

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

// utilisation de la variable d'env avec une varibale par defaut

fastify.get(HEALTHCHECK_ENDPOINT, {logLevel : 'silent'}, (request, reply) => {
    reply
        .send({status: "Healthy"});
});
// pouvoir etre utiliser dans le deploiement
// ce endpojt on va egalement le rendre configurable

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
