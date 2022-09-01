// app config file
const API_KEY = '96624406243cb4d7a2a86e156e127d69'
const FALLBACK_API_KEY = '19bf388045msh417cd2e0d111ee8p1eec85jsnc46e0facaf9a'

// fallback options
export const API_OPTIONS = {
    method: 'GET',
    headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': API_KEY,
    },
}

export const FALLBACK_API_OPTIONS = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': FALLBACK_API_KEY,
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
    },
}

// apis
export const API_ONE =
    'https://v3.football.api-sports.io/players/squads?team=49'
export const API_TWO =
    'https://v3.football.api-sports.io/players/squads?team=42'

// fallback apis
export const FALLBACK_API_ONE =
    'https://api-football-v1.p.rapidapi.com/v3/players/squads?team=49'
export const FALLBACK_API_TWO =
    'https://api-football-v1.p.rapidapi.com/v3/players/squads?team=42'

// player positions
export const POSITIONS = [
    { label: 'All positions', value: 'All positions' },
    { label: 'Goalkeeper', value: 'Goalkeeper' },
    { label: 'Defender', value: 'Defender' },
    { label: 'Midfielder', value: 'Midfielder' },
    { label: 'Attacker', value: 'Attacker' },
]
