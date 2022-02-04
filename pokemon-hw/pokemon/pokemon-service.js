const pokemons = [];
let _id = 0;

exports.getPokemon = () => pokemons;

exports.addPokemon = ({name, types}) => {  
    const pokemon = {
        id: _id++,
        name,
        types,
    };
    
    pokemons.push(pokemon);
    return pokemon;
} 

exports.getOnePokemon = (id) => {
    pokemons.find((pokemon => pokemon.id === id))
}
