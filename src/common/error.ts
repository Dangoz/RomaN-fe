import Swal from 'sweetalert2'

export const handleError = (err: Error) => {
  // display error through a popup
  Swal.fire({
    title: 'Error',
    text: err.message,
    icon: 'error',
  })
}

export const handleWarning = (message: string) => {
  // display warning through a popup
  Swal.fire({
    title: 'Caution',
    text: message,
    icon: 'warning',
  })
}
