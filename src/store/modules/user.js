import {getInfo, userLogin} from "@/api/user";
import {removeToken, setRoles, setToken} from "@/utils/auth";

const state = {
    token: "",
    username: "",
    name: "",
    roles: []
};

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles;
        localStorage.setItem("roles", state.roles);
    },
    SET_USERNAME: (state, username) => {
        state.username = username;
        localStorage.setItem("username", state.username);
    },
    SET_NAME: (state, name) => {
        state.name = name;
    }
};

const actions = {
    // user login
    userLogin({commit}, userInfo) {
        const {username, password} = userInfo;
        return new Promise((resolve, reject) => {
            userLogin({username: username, password: password})
                .then(response => {
                    const {data} = response;
                    commit("SET_TOKEN", data.token);
                    commit("SET_USERNAME", data.username);
                    setToken(data.token);
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    
    // get user info
    getInfo({commit}) {
        return new Promise((resolve, reject) => {
            getInfo(localStorage.getItem("token")).then(response => {
                const {data} = response
                
                if (!data) {
                    reject('Verification failed, please Login again.')
                }
                
                const { roles } = data
                
                // roles must be a non-empty array
                if (!roles || roles.length <= 0) {
                    reject('getInfo: roles must be a non-null array!')
                }
                
                commit('SET_ROLES', roles)
                setRoles(JSON.stringify(roles))
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    
    // // user logout
    logout({commit}) {
        commit("SET_TOKEN", "");
        removeToken();
    },
    
    
    
    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resolve()
        })
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
