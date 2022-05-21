import Swal from 'sweetalert2'

const handleError = (err: Error) => {
  // display error through a popup
  Swal.fire({
    title: 'Error',
    text: err.message,
    icon: 'error',
  })
}

export default handleError
