const getters = {
    harborList: state => state.harbor.harborList,
    harborProjectList: state => state.harbor.harborProjectList,
    selectHarborId: state => state.harbor.selectHarborId,
    harborProjectDetail: state => state.harbor.harborProjectDetail,
    harborRepoList: state => state.harbor.harborRepoList,
    token: state => state.user.token,
    name: state => state.user.name,
    username: state => state.user.username,
    roles: state => state.user.roles,
};

export default getters;
