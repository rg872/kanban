import './firebase'
import Vue from 'vue'
import Vuex from 'vuex'
import VueFire from 'vuefire'
import firebase from 'firebase'

Vue.use(VueFire)
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    stage_number: 1,
    stage_template: {},
    list_input_type: ['text', 'textarea', 'number', 'date', 'member'],
    list_template: {
      0: {
        title: 'Name',
        type: 'text'
      },
      1: {
        title: 'Description',
        type: 'textarea'
      },
      2: {
        title: 'Deadline',
        type: 'date'
      },
      3: {
        title: 'Assigned To',
        type: 'member'
      }
    },
    members: {},
    lists: {}

  },
  mutations: {
    setStageNumber: function (state, stageNum) {      
      state.stage_number = stageNum      
    },

    setStageTemplate: function (state, template) {
      state.stage_template = template
      
    },

    setListTemplate: function (state, payload) {
      
      if (payload.setAll) {
        state.list_template = payload.template
      } else {
        let length = Object.keys(state.list_template).length
        Vue.set(state.list_template, length, payload.template)
      }  
    },

    deleteListTemplate: function (state) {
      let length = Object.keys(state.list_template).length
      if (length > 4) {
        Vue.delete(state.list_template, (length - 1))
      }
    },

    setMember: function (state, payload, setAll) {
      if (payload.setAll) {
        state.members = payload.member
      } else {
        let length = Object.keys(state.members).length
        Vue.set(state.members, length, payload.member)
      }  
    },

    deleteMember: function (state) {
      let length = Object.keys(state.members).length
      Vue.delete(state.members, (length - 1))
    },

    setLists: function (state, payload, setAll) {
      if (payload.setAll) {
        //state.lists = payload.data.lists
        state.lists = Object.assign({}, state.lists, payload.data.lists)
        
      } else {
        Vue.set(state.lists, payload.data.index, payload.data.task)
      }  
    }

  },
  actions: {
    saveStageNumber: function (context, stageNum) {
      firebase.database().ref('/stagenumber').set(stageNum)

      context.commit('setStageNumber', stageNum)
    },

    saveStageTemplate: function (context, template) {
      firebase.database().ref('/stagetemplate').set(template)

      context.commit('setStageTemplate', template)
    },

    saveListTemplate: function (context, payload) {
      if (typeof payload !== 'undefined') {
        firebase.database().ref('/listtemplate').set(payload.template)
        context.commit('setListTemplate', payload)
      } else {
        firebase.database().ref('/listtemplate').set(context.state.list_template)
      }
      
    },

    saveMember: function (context, member) {
      firebase.database().ref('/members').set(context.state.members)
    },

    getStageNumber: function (context) {
      firebase.database().ref('/stagenumber').on('value', function (snapshot) {
        context.commit('setStageNumber', snapshot.val())
      })
    },

    getStageTemplate: function (context) {
      firebase.database().ref('/stagetemplate').on('value', function (snapshot) {
        let template = {}
        let result = snapshot.val()
        for (let index in result) {
          template[index] = result[index]
        }
        context.commit('setStageTemplate', template)
      })
    },

    getListTemplate: function (context) {
      firebase.database().ref('/listtemplate').on('value', function (snapshot) {
        let template = {}
        let result = snapshot.val()
        for (let index in result) {
          template[index] = result[index]
        }
        context.commit('setListTemplate', {template: template, setAll: true})
      })
    },

    getMember: function (context) {
      firebase.database().ref('/members').on('value', function (snapshot) {
        let member = {}
        let result = snapshot.val()
        for (let index in result) {
          member[index] = result[index]
        }
        context.commit('setMember', {member: member, setAll: true})
      })
    },

    getLists: function (context) {
      firebase.database().ref('/lists').on('value', function (snapshot) {
        let lists = {}
        let result = snapshot.val()
        for (let index in result) {
          lists[index] = result[index]
        }
        context.commit('setLists', {data: {lists: lists}, setAll: true})
      })
    },

    saveLists: function (context, payload) {

      firebase.database().ref('/lists').update({
        [payload.data.index]: payload.data.task
      })

      context.commit('setLists', payload)
    },

    updateLists: function (context, payload) {  
      console.log(payload.data.index);
          
      firebase.database().ref().child(`/lists/${payload.data.index}/${Object.keys(payload.data.task).length - 1}`).update(
        payload.data.task[Object.keys(payload.data.task).length - 1]
              
      )

      context.commit('setLists', payload)
    },

    reset: function (context) {
      firebase.database().ref('/').remove()
      context.commit('setLists', {data: {lists: {}}, setAll: true})
      context.commit('setStageNumber', 1)
      context.commit('setStageTemplate', {})          
      context.commit('setMember', {member: {}, setAll: true})   
      context.commit('setListTemplate', { template: {
        0: {
          title: 'Name',
          type: 'text'
        },
        1: {
          title: 'Description',
          type: 'textarea'
        },
        2: {
          title: 'Deadline',
          type: 'date'
        },
        3: {
          title: 'Assigned To',
          type: 'member'
        }
      },
      setAll: true})
    }
  }
})
