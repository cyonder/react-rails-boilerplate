import { axiosInstance as axios } from '../constants/axiosInstance';

export const fetchUsers = () => {
    return (dispatch) => {
        axios.get(`/users`)
        .then(response => {
            console.log("Users: ", response);
        })
        .catch(error => {
            if(error.response.status == 401){
                console.error(error.response.data.error);
            }else{
                console.error('Something went wrong. Please refresh your page and try again.');
            }
        })
    };
};
