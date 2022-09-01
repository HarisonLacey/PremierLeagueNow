import { Dispatch, SetStateAction } from 'react'

// error modal model
export type ErrorModalProps = {
    errorModalType: string
    visible: boolean
    onRequestClose: Dispatch<SetStateAction<boolean>>
}
