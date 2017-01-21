<template>
    <div class="header">
      <div class="content-wrapper">
        <div class="avatar">
          <img :src="restaurant.avatar" alt="" width="64" height="64">
        </div>
        <div class="content">
          <div class="title">
            <span class="brand"></span>  
            <span class="name">{{restaurant.name}}</span>
          </div>
          <div class="description">
             {{restaurant.description}}/{{restaurant.deliveryTime}}分钟送达
          </div>  
          <div v-if="restaurant.supports" class="support">
            <span class="icon" :class="classMap[restaurant.supports[0].type]"></span>
            <span class="text">{{restaurant.supports[0].description}}</span>
          </div>
          <div class="support-count" v-if="restaurant.supports" @click="detailShow = true">
            <span class="count">{{restaurant.supports.length}}个</span>
            <i class="icon-keyboard_arrow_right"></i>
          </div>
        </div>
      </div>
      <div class="bullentin-wrapper" @click="detailShow = true">
        <span class="bulletin-title"></span><span class="bulletin-text">{{restaurant.bulletin}}</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
      <div class="background">
        <img :src="restaurant.avatar" width="100%" height="100%">
      </div>
      <transition name="fade">
         <detail :is-show="detailShow" v-show="detailShow" v-on:hideDetail="detailShow = false" ></detail>     
      </transition>
     
    </div>
</template>

<script>
  import detail from 'components/header/float/float'
  import {mapGetters} from 'vuex'
  
  export default {
    components: {
      detail
    },
    computed: {
      ...mapGetters({
        restaurant: 'restaurant',
        classMap: 'classMap'
      })
    },
    data() {
      return {
        detailShow: false
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import '../../common/sass/mixin.scss';
    .header {
      position: relative;
      color: #fff;
      background-color: rgba(7,17,27,0.5);
      overflow: hidden;
      .content-wrapper {
        padding: 24px 12px 18px 24px;
        font-size: 0;
        position: relative;
        .avatar {
          display: inline-block;
          vertical-align: top;
          img {
            border-radius: 5px;
          }
        }
        .content {
          display: inline-block;
          margin-left: 16px;
          font-size: 14px;
          .title {
            margin: 2px 0 8px 0;
            .brand {
              display: inline-block;
              width: 30px;
              height: 18px;
              @include bg-image('brand');
              background-size: 30px 18px;
              background-repeat: no-repeat;
              vertical-align: top;
            }
            .name {
              margin-left: 6px;
              font-size: 16px;
              line-height: 18px;
              font-weight: bold;
            }
          }
          .description {
            margin-bottom: 10px;
            line-height: 12px;
            font-size: 12px;
          }
          .support {
            .icon {
              @include icon(1);
            }
            .text {
              line-height: 12px;
              font-size: 12px;
              vertical-align: top;
            }
          }
        }
        .support-count {
          position: absolute;
          right: 12px;
          bottom: 14px;
          padding: 0 8px;
          height: 24px;
          line-height: 24px;
          border-radius: 14px;
          background-color: rgba(0,0,0,0.2);
          text-align: center;
          .counter {
            font-size: 10px;            
          }
          .icon-keyboard_arrow_right {
            margin-left: 2px;
            font-size: 10px;
            line-height: 24px;
          }
        }
      }
      .bullentin-wrapper {
        position: relative;
        height: 28px;
        line-height: 28px;
        padding: 0 22px 0 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;  
        background-color: rgba(7,17,27,0.2);
        .bulletin-title {
          display: inline-block;
          width: 22px;
          height: 12px;
          @include bg-image('bulletin');
          background-size: 22px 12px;
          background-repeat: no-repeat;
          vertical-align: top;
          margin-top: 8px;
        }
        .bulletin-text {
          vertical-align: top;
          font-size: 10px;
          margin: 0 4px;
        }
        .icon-keyboard_arrow_right {
          position: absolute;
          font-size: 10px;
          right: 12px;
          top: 8px;
        }
      }
      .background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        filter: blur(10px);
      }
    }
</style>