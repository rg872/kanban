<template>
  <div>
        <div class="row">
            <div class="col-5">
                <h4>Masukan member yang akan bergabung untuk proyek ini</h4>
                <input type="text" v-model="member">
                <button v-on:click="addMember">Add member</button>
                <button v-on:click="deleteMember">Delete member</button>
                <button v-on:click="nextPage">NEXT</button>
            </div>
            <div class="col-7">
                <H1>Members</H1>
                <h4 v-for="(person, index) in members" :key="index">{{person}}</h4>
            </div>
        </div>        
    </div>
</template>

<script>
export default {
    name: 'member-setup',
    data:function(){
        return {
            member: '',
            members: this.$store.state.members
        };
    },
    methods:{
        addMember: function(){
            if(this.member.replace(/\s/g, '').length === 0){
                alert('Please insert the member name')                
            }else {
                this.$store.commit('setMember', {member: this.member, setAll: false})
            }
            
        },

        deleteMember: function(){
            this.$store.commit('deleteMember')
        },

        nextPage: function () {
            if(Object.keys(this.members).length > 0){
                localStorage.setItem('isSet', true)
                this.$store.dispatch('saveMember')
                this.$router.push('/')
            }else {
                alert('Please add at least one member name')
            }
            
        }
    }
}
</script>

<style>

</style>
