<template>
  <div>
        <div class="row">
            <div class="col-5">
                <div>
                    <div>
                        <label>Item name</label>
                        <input type="text" v-model="name">
                    </div>
                    <div>
                        <label>Item type</label>                
                        <select v-model="type">
                            <option v-for="(list_type, index) in list_types" :value="list_type" :key="index">{{list_type}}</option>
                        </select>
                    </div>                
                    <button v-on:click="addItem">Add Item</button>
                    <button v-on:click="deleteItem">Delete Item</button>
                    <button v-on:click="nextPage">NEXT</button>
                </div>
            </div>
            <div class="col-7">
                <div v-for="(list_template, index) in list_templates" :key="index">
                    <h4>{{list_template.title}}</h4>
                    <div v-if="list_template.type === 'member'">
                        <select>
                            <option value="volvo">Roni</option>
                            <option value="saab">Toni</option>
                            <option value="opel">Doni</option>
                            <option value="audi">Broni</option>
                        </select>
                    </div>
                    <div v-else-if="list_template.type === 'textarea'">
                        <textarea rows="4" cols="20"></textarea>
                    </div>
                    <input v-else v-bind:type="list_template.type">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name:'list-setup',
    data:function(){
        return {
            name:'',
            type:''
        };
    },
    methods:{
        addItem: function () {
            this.$store.commit('setListTemplate', {template: { title:this.name, type:this.type }, setAll: false})
        },

        deleteItem: function () {
            this.$store.commit('deleteListTemplate', Object.keys(this.list_templates).length - 1)                      
        },

        nextPage: function () {
            this.$store.dispatch('saveListTemplate')
            this.$router.push('/member-setup')
        }
    },

    computed: mapState({
        list_templates: 'list_template',
        list_types: 'list_input_type'
    })
}
</script>

<style>

</style>
