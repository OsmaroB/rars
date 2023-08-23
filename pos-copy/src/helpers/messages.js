import { NotificationManager } from 'components/common/react-notifications';
import Swal from "sweetalert2";

 export const successMessage = (title, body) => {
    NotificationManager.primary(
        title,
        body,
        3000,
        null,
        null,
        'primay'
    );
};

export const errorMessage = (title, body) => {
    NotificationManager.error(
        title,
        body,
        3000,
        null,
        null,
        'error'
    );
};

export const warningMessage = (title, body) => {
    NotificationManager.warning(
        title,
        body,
        3000,
        null,
        null,
        'warning'
    );
};

export const swMessage = (title, body, type, time) =>{
    Swal.fire({
        title: title,
        text: body,
        icon: type,
        showCancelButton: true,
        cancelButtonColor: '#d33',
        timer: time
    })
}

export default successMessage;