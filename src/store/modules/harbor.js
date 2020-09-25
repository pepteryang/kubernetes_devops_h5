const state = {
  harborList: [],
  harborProjectList: [],
  harborProjectDetail: [],
  selectHarborId: "",
  harborRepoList: []
};

const mutations = {
  UPDATE_HARBOR_LIST: (state, harborList) => {
    state.harborList = harborList;
    // sessionStorage.setItem('harborList', JSON.stringify(state.harborList));
  },
  UPDATE_SELECT_HARBOR_ID: (state, selectHarborId) => {
    state.selectHarborId = selectHarborId;
    // sessionStorage.setItem('selectHarborId', JSON.stringify(state.selectHarborId));
  },
  UPDATE_HARBOR_PROJECT_Detail: (state, harborProjectDetail) => {
    state.harborProjectDetail = harborProjectDetail;
    // sessionStorage.setItem('harborProjectDetail', JSON.stringify(state.harborProjectDetail));
  },
  UPDATE_HARBOR_PROJECT_LIST: (state, harborProjectList) => {
    state.harborProjectList = harborProjectList;
    // sessionStorage.setItem('harborProjectList', JSON.stringify(state.harborProjectList));
  },
  UPDATE_HARBOR_REPO_LIST: (state, harborRepoList) => {
    state.harborRepoList = harborRepoList;
    // sessionStorage.setItem('harborRepoList', JSON.stringify(state.harborRepoList));
  }
};

const actions = {
  // async UPDATE_HARBOR_LIST({ commit }){
  //     const HARBOR_LIST = await getHarborList().then(response => {
  //         console.log(data)
  //         if (data){
  //             commit('UPDATE_HARBOR_LIST',HARBOR_LIST.data);
  //             sessionStorage.setItem('harborList', JSON.stringify(response.data));
  //         }
  //     })
  //     }
};

export default {
  namespace: true,
  state,
  actions,
  mutations
};
