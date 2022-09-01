// player card models
export type TeamPlayer = {
    id: number
    name: string
    age: number
    number: number
    position: string
    photo: string
}

export type PlayerCardProps = {
    player: TeamPlayer
    handleTogglePlayerModal: (player: TeamPlayer) => void
}
