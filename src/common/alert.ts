import Swal from 'sweetalert2'

export const handleError = (err: Error, allowEnterKey: boolean = true) => {
  // display error through a popup
  Swal.fire({
    title: 'Error',
    text: err.message,
    icon: 'error',
    allowEnterKey,
  })
}

export const handleWarning = (message: string, allowEnterKey: boolean = true) => {
  // display warning through a popup
  Swal.fire({
    title: 'Caution',
    text: message,
    icon: 'warning',
    allowEnterKey,
  })
}

export const handleSuccess = (message: string, allowEnterKey: boolean = true) => {
  // display success through a popup
  Swal.fire({
    title: 'Success',
    text: message,
    icon: 'success',
    allowEnterKey,
  })
}

export const handleQuestion = (message: string, allowEnterKey: boolean = true, title?: string) => {
  // display question through a popup
  Swal.fire({
    title: title ? title : 'Question',
    text: message,
    icon: 'question',
    allowEnterKey,
  })
}
