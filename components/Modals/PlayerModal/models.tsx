import { TeamPlayer } from '../../PlayerCard/models'

// player modal model
export type PlayerModalProps = {
    player: TeamPlayer
    visible: boolean
    onRequestClose: () => void
}
