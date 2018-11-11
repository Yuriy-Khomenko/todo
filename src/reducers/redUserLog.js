import { ADD_TOVAR, DEL_TOVAR, USER_LOG, USER_UNLOG } from '../actions/actions'

const user_default = {
    userName: "user undefined",
    login: "",
    pass: "",
    admin: false
};

export default function reducUserLog(state = user_default, action) {

    console.log(action);
    switch (action.type) {

        case USER_LOG:
            {
                if (action.name === 'admin' && action.pass === "123") {
                    return {
                        userName: "ADMIN",
                        login: "admin",
                        pass: "123",
                        admin: true
                    }
                }
            }
            return state;

        case USER_UNLOG:
            return user_default;

        default:
            return state
    }
}