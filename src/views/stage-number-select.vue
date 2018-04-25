<template>
<div>
    <div>
        <h1>Welcome to PManage</h1>
        <h3>How many Stage does your project have ?</h3>
        <input type="number" min="1" max="5" v-model="stageNumber">
        <button v-on:click="setStageTotal">NEXT</button>
    </div>
</div>
</template>

<script>

export default {
    name: 'stage-number-select',
    data: function () {
        return {
            stageNumber: '1'
        }
    },
    methods: {
        setStageTotal: function() {       

            let isWordExist = this.stageNumber.search(/[\D]/g)
            let stageTotal = Number(this.stageNumber)

            if(isWordExist !== -1 || stageTotal > 5 || stageTotal < 1){
                alert('Please insert only 1-5')
            }else {
                this.$store.dispatch('saveStageNumber', Number(stageTotal))
                this.$router.push('/stage-setup')
            }
            
        }
    }
}
</script>

<style>

</style>
