import Swal from 'sweetalert2';


export class SwalFacade {

  static erro(titulo: string, texto: string): Promise<any> {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 5000,
      background: '#ff0000',
      color: '#ffffff',
      iconColor: '#ffffff',
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    return Toast.fire({
      icon: 'error',
      title: titulo,
      text: texto,
      confirmButtonColor: '#EDA900',
      confirmButtonText: 'Ok'
    })
  }

  static sucesso(titulo: string, texto?: string): Promise<any> {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
      background: '#00ac00',
      color: '#ffffff',
      iconColor: '#ffffff',
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    return Toast.fire({
      icon: 'success',
      title: titulo,
      text: texto
    })
  }

  static alerta(titulo: string, texto?: string): Promise<any> {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 5000,
      background: '#FF5F1F',
      color: '#ffffff',
      iconColor: '#ffffff',
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    return Toast.fire({
      icon: 'warning',
      title: titulo,
      text: texto
    })
  }

}