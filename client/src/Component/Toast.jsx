import { Alert, Snackbar } from '@mui/material'
import React from 'react'

const Toast = ({ open, msg, severity, setOpenToast, setToastMessage }) => {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={() => { setOpenToast(false); setToastMessage("") }} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert variant="filled" severity={severity}>
                {msg}
            </Alert>
        </Snackbar>
    )
}

export default Toast
