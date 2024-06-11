import http from "../httpUser";

const checkUserID = email => {
    return http.get('/user/validation/userCheck?email='+email);
};

const checkPass = data => {
    return http.get('/user/validation/passCheck?email='+data.email+"&password="+data.password);
};

const userOTP = email => {
    return http.get('/user/validation/userOTP?email='+email);
};

const UserServices = {
    checkUserID,
    checkPass,
    userOTP
};

export default UserServices;