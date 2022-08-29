import { TeamPlayer } from '../../PlayerCard/models'

export type PlayerModalProps = {
    player: TeamPlayer
    visible: boolean
    onRequestClose: () => void
}
