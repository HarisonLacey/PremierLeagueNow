const API_KEY = '19bf388045msh417cd2e0d111ee8p1eec85jsnc46e0facaf9a'

export const API_OPTIONS = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
    },
}

export const API_ONE =
    'https://api-football-v1.p.rapidapi.com/v3/players/squads?team=49'
export const API_TWO =
    'https://api-football-v1.p.rapidapi.com/v3/players/squads?team=42'

export const defaultApiErrorMessage = 'API call error'
export const limitReachedErrorMessage =
    'API limit reached. Please update API key in App config file'

export const POSITIONS = [
    { label: 'All positions', value: 'All positions' },
    { label: 'Goalkeeper', value: 'Goalkeeper' },
    { label: 'Defender', value: 'Defender' },
    { label: 'Midfielder', value: 'Midfielder' },
    { label: 'Attacker', value: 'Attacker' },
]
