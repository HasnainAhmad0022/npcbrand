import Swal from 'sweetalert2';
import gs1Request from '../userRequest';

const deleteFunction = async (endpoint) => {
    try {
        const response = await gs1Request.delete(endpoint);  // Assuming `gs1Request` is defined and accessible or you might need to pass it as a parameter

        Swal.fire(
            'Deleted!',
            response?.data?.message || 'Data has been deleted.',
            'success'
        )
        return true;
    } catch (err) {
        console.log(err);
        Swal.fire(
            'Error!',
            err?.response?.data?.message || 'Something went wrong.',
            'error'
        )
        return false;
    }
}

export default deleteFunction;
