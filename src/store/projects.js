import projectsApi from '../api/projects.js';

export default {
    namespaced: true,
    state: {
        all: [],
        project: {}
    },
    getters: {
        getProjectById: (state) => (id) => {
            return state.all.find(project => project.id == id);
        }
    },
    actions: {
        getAllProjects ({ commit }) {
            return projectsApi.getProjects()
                .then(function (response) {
                    commit('setProjects', response.data);
                })
                .catch(function () {
                    commit('setProjects', []);
                });
        },
        getProjectById({ commit }, id) {
            return projectsApi.getProject(id)
                .then(function (response) {
                    commit('setProject', response.data);
                    return response.data;
                })
                .catch(function () {
                    commit('setProject', {});
                    return null;
                });
        },
        createProject({ dispatch, commit }, project) {
            return new Promise((resolve, reject) => {
                projectsApi.postCreateProject(project)
                    .then(function (response) {
                        commit('setProject', response.data);
                        dispatch('getAllProjects');
                        resolve(response.data);
                    })
                    .catch(function (err) {
                        commit('setProject', {});
                        reject(err);
                    })
            })
        },
        updateProject({commit}, id, project) {
            return projectsApi.putEditProject(id, project)
                .then(function (response) {
                    commit('setProject', response)
                })
                .catch(function () {
                    commit('setProject', {});
                })
        },
        deleteProject({dispatch, commit}, id) {
            return new Promise((resolve, reject) => {
                projectsApi.postDeleteProject(id)
                    .then(function (response) {
                        commit('setProject', {});
                        dispatch('getAllProjects');
                        resolve(response);
                    })
                    .catch(function (err) {
                        commit('setProject', {});
                        reject(err);
                    })
            });
        }
    },
    mutations: {
        setProjects (state, projects) {
            state.all = projects
        },
        setProject(state, project) {
            state.project = project
        }
    }
}
