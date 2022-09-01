import { Dispatch, SetStateAction } from 'react'

// error modal model
export type ErrorModalProps = {
    visible: boolean
    onRequestClose: Dispatch<SetStateAction<boolean>>
}
