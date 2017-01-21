<template>
   <div class="foods">
    <div class="foods-type-wrapper">
      <ul>
        <li v-for="item in goods">
          <span class="text">
            <span v-show="item.type > 0" class="icon"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper"></div>  
   </div> 
   
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    props: {
      restaurant: {
        type: Object
      }
    },
    computed: {
      ...mapGetters({
        foods: 'foods'
      })
    },
    created() {
      this.$store.dispatch('getFoods')
    }
  }
</script>

<style lang="scss" scoped>
    .foods {
      display: flex;
      position: absolute;
      top: 174px;
      width: 100%;
      bottom: 46px;
      overflow: hidden;
      .foods-type-wrapper {
         flex: 0 0 80px;
         width: 80px;
         background: #f3f5f7;
      }
      .foods-wrapper {
         flex: 1;         
      }
    }
</style>