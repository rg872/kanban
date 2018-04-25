<template>
<div>
  <!-- setup ulang-->
  <button v-on:click="resetAll">Reset All</button>
  <!-- new task modal -->
  <button data-toggle="modal" data-target="#newtask">New task</button>
  <div class="modal fade" id="newtask" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">New Task</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div v-for="(list, index) in list_template" :key="index">
            <label>{{list.title}}</label>
            <div v-if="list.type === 'member'">
              <select v-model="new_task[index]">
                <option v-for="(person, index) in members" :value="person" :key="index">{{ person }}</option>
              </select>
            </div>
            <div v-else-if="list.type === 'textarea'">
              <textarea rows="4" cols="20" v-model="new_task[index]"></textarea>
            </div>
            <input v-else :type="list.type" v-model="new_task[index]">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="saveTask">Save changes</button>
        </div>
      </div>
    </div>
  </div>

  <!-- loop stage template -->
  <div v-for="(stage, index) in stage_template" :key="index">
    <div class="card">
      <div class="card-header" v-bind:style="{'background-color': stage.color}">
        <h4>{{stage.title}}</h4>
      </div>
      <div class="card-body">

        <!-- loop task -->
        <div v-for="(task, task_index) in lists" v-if="task[Object.keys(task).length - 1].Stage === stage.title" :key="task_index">
          <!-- detail modal -->
          <div class="modal fade" v-bind:id="task_index" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Detail</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div v-for="(value, index) in task" :key="index">
                    <h5 v-if="Object.keys(value)[0] === 'Name'">{{value['Name']}}</h5>
                    <p v-else-if="Object.keys(value)[0] !== 'Stage'">{{Object.keys(value)[0]}} : {{value[Object.keys(value)[0]]}}</p>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="toPreviousStage(task)">To Previous Stage</button>
                  <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="deleteTask(task)">Delete</button>
                  <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="toNextStage(task)">To Next Stage</button>
                </div>
              </div>
            </div>
          </div>
          <div class="card" style="width: 18rem;">
            <div class="card-body">
              <div v-for="(value, index) in task" :key="index">
                <h5 v-if="Object.keys(value)[0] === 'Name'">{{value['Name']}}</h5>
                <p v-else-if="Object.keys(value)[0] !== 'Stage'">{{Object.keys(value)[0]}} : {{value[Object.keys(value)[0]]}}</p>
              </div>
              <button data-toggle="modal" v-bind:data-target="'#' + task_index">Show Detail</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import { mapState } from 'vuex'

export default {
  name: 'home',
    data: function () {
        return {
            new_task:{},
        };
    },
    methods:{
        saveTask: function(){          
            for(let index in this.new_task){
                let key = this.list_template[index].title
                let value = this.new_task[index]   

                this.new_task[index] = {[key] : value} 
            }
            
            let length_new = Object.keys(this.new_task).length
            let length_list = Object.keys(this.lists).length

            this.new_task[length_new] = {Stage : this.stage_template[0].title}
            //this.$set(this.lists, length_list, this.new_task)
            this.$store.dispatch('saveLists', {data: {index: length_list, task: this.new_task, }, setAll: false})

            this.new_task = {}
            
        },
        toPreviousStage: function(task){  
            let stagetemplate_values = Object.values(this.stage_template);
            let lists_values = Object.values(this.lists);
                        

            let indexStage = stagetemplate_values.findIndex(function(checked){   
               return checked.title === task[Object.keys(task).length - 1]['Stage'];                
            })

            let indexTask = lists_values.findIndex(function(checked){   
                return checked === task;                
            })

            if(indexStage > 0){
                task[Object.keys(task).length - 1]['Stage'] = this.stage_template[indexStage -1].title

                //this.$set tidak mentriger reactivity jadi pakai object assign
                this.lists[indexTask] = task
                this.$store.dispatch('updateLists', {data: {lists: this.lists, index: indexTask, task: task}, setAll: true})
                //this.lists = Object.assign({}, this.lists, this.lists)
                 
            }
            
        },
        toNextStage: function(task){
            let stagetemplate_values = Object.values(this.stage_template);
            let lists_values = Object.values(this.lists);
                        

            let indexStage = stagetemplate_values.findIndex(function(checked){   
               return checked.title === task[Object.keys(task).length - 1]['Stage'];                
            })

            let indexTask = lists_values.findIndex(function(checked){   
                return checked === task;                
            })
            
            if(indexStage < Object.keys(this.stage_template).length - 1){
              task[Object.keys(task).length - 1]['Stage'] = this.stage_template[indexStage+1].title

              //this.$set tidak mentriger reactivity jadi pakai object assign
              this.lists[indexTask] = task
              this.$store.dispatch('updateLists', {data: {lists: this.lists, index: indexTask, task: task}, setAll: true})
              //this.lists = Object.assign({}, this.lists, this.lists)                
            }            
            
        },
        deleteTask: function(task){
            let lists_values = Object.values(this.lists);
          
            let indexTask = lists_values.findIndex(function(checked){   
                return checked === task;                
            })

            this.$delete(this.lists, indexTask)
        },

        resetAll : function(){
          localStorage.removeItem('isSet')
          this.$store.dispatch('reset')
          this.$router.push('/stage-number')
        }
         
    },

    beforeCreate: function () {  
       if(!localStorage.getItem('isSet')){
        this.$router.push('/stage-number')
      } else {
        this.$store.dispatch('getStageNumber')
        this.$store.dispatch('getStageTemplate')
        this.$store.dispatch('getListTemplate')
        this.$store.dispatch('getMember')
        this.$store.dispatch('getLists')
      }
    },

    computed: mapState([
      'stage_template',
      'list_template',
      'members',
      'lists'
    ])
}
</script>
