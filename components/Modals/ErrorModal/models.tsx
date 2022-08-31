import { Dispatch, SetStateAction } from 'react'

export type ErrorModalProps = {
    description: String
    visible: boolean
    onRequestClose: Dispatch<SetStateAction<boolean>>
}
