import Swal from 'sweetalert2'

const handleError = (err: Error, type: string = 'error') => {
  // display error through a popup
  Swal.fire({
    title: 'Error',
    text: err.message,
    icon: type === 'error' ? 'error' : 'warning',
  })
}

export default handleError
