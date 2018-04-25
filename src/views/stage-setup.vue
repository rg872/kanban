<template>
  <div>
       <div v-if="currentStage <= stageNumber">
        <h1>Stage {{ currentStage }}</h1>
        <div class="d-flex justify-content-start">
            <h4>Stage name</h4>
            <input type="text" v-model="currentTitle">
        </div>
        <div class="d-flex justify-content-start">
            <h4>Stage background color</h4>
            <input type="color" v-model="currentColor">
        </div>
       </div>
       <button v-on:click="nextStage">NEXT</button> 
    </div>
</template>

<script>
export default {
    name:'stage-setup',
    data: function () {
        return {
            currentTitle: '',
            currentColor: '#888888',
            stageNumber: this.$store.state.stage_number,
            currentStage: 1,
            template: {}
        }
    },
    methods:{
        nextStage: function(){
            if(this.currentTitle.replace(/\s/g, '').length === 0){

                alert('Please insert the stage name')
                
            } else {

                this.template[this.currentStage - 1] = { title: this.currentTitle, color: this.currentColor };
                this.currentTitle='';
                this.currentColor='#888888'
                this.currentStage++;

                if( this.currentStage > this.stageNumber){
                    this.$store.dispatch('saveStageTemplate', this.template)
                    this.$router.push('/list-setup')
                }  
            }        
        }
    }
}
</script>

<style>

</style>
