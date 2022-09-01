import { Dispatch, SetStateAction } from 'react'

// error modal model
export type ErrorModalProps = {
    description: String
    visible: boolean
    onRequestClose: Dispatch<SetStateAction<boolean>>
}
