// app config file
const API_KEY = '96624406243cb4d7a2a86e156e127d69'

export const API_OPTIONS = {
    method: 'GET',
    headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': API_KEY,
    },
}

export const API_ONE =
    'https://v3.football.api-sports.io/players/squads?team=49'
export const API_TWO =
    'https://v3.football.api-sports.io/players/squads?team=42'

export const defaultApiErrorMessage = 'API call error'
export const limitReachedErrorMessage =
    'API limit reached. Please update API key in App config file.'

export const POSITIONS = [
    { label: 'All positions', value: 'All positions' },
    { label: 'Goalkeeper', value: 'Goalkeeper' },
    { label: 'Defender', value: 'Defender' },
    { label: 'Midfielder', value: 'Midfielder' },
    { label: 'Attacker', value: 'Attacker' },
]
