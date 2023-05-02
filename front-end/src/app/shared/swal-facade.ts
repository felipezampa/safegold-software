import Swal from 'sweetalert2';


export class SwalFacade {

    static erro(titulo: string, texto: string): Promise<any> {
        return Swal.fire({
            icon: 'error',
            title: titulo,
            text: texto,
            confirmButtonColor: '#EDA900',
            confirmButtonText: 'Ok'
        });
    }
    
    static sucesso(titulo: string, texto?: string): Promise<any> {
        return Swal.fire({
            icon: 'success',
            title: titulo,
            text: texto,
            timer: 1000,
            showConfirmButton: false
        });
    }

    static alerta(titulo: string, texto?: string): Promise<any> {
        return Swal.fire({
            icon: 'warning',
            title: titulo,
            text: texto,
            confirmButtonColor: '#EDA900',
            confirmButtonText: 'Ok'
        });
    }
}