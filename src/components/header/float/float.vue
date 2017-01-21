<template>
  <div class="detail">
    <div class="detail-wrapper clearfix">
      <div class="detail-main">
        <h1 class="name">{{restaurant.name}}</h1>
        <div class="star-wrapper">
           <star :size="48" :score="restaurant.score"></star>
        </div>       
         <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="restaurant.supports" class="supports">
            <li class="support-item" v-for="item in restaurant.supports">
              <span class="icon" :class="classMap[item.type]"></span>
              <span class="text">{{item.description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <div class="content">
              {{restaurant.bulletin}}
            </div>
          </div>

      </div>
    </div>
    <div class="detail-close">
      <i class="icon-close" @click="hideDetail"></i>
    </div>
  </div>
</template>

<script>
  import star from 'components/star/star'
  import {mapGetters} from 'vuex'

  export default {
    props: {
      isShow: {
        type: Boolean
      }
    },
    computed: {
      ...mapGetters({
        restaurant: 'restaurant',
        classMap: 'classMap'
      })
    },
    components: {
      star
    },
    methods: {
      hideDetail () {
        this.$emit('hideDetail')
      }
    }
  }
</script>

<style lang="scss">
    @import '../../../common/sass/mixin.scss';
    .detail {
      position: fixed;
      z-index: 100;
      width: 100%;
      height: 100%;
      overflow: auto;
      top: 0;
      left: 0;
      transition: all 0.5s;
      background: rgba(7, 17,27,0.8);
      backdrop-filter: blur(10px);
      &.fade-enter-active,&.fade-leave-active {
        transition: opacity .3s ease;
      }
      &.fade-enter,&.fade-leave-active {
        opacity: 0;
        // background: rgba(7,17,27,0);
      }
      .detail-wrapper {
        min-height: 100%;
        width: 100%;
        .detail-main {
          margin-top: 64px;
          padding-bottom: 64px;
          .name {
            line-height: 16px;
            text-align: center;
            font-size: 16px;
            font-weight: 700;
          }
          .star-wrapper {
            margin-top: 18px;
            padding: 2px 0;
            text-align: center;
          }
          .title {
            display: flex;
            width: 80%;
            margin: 28px auto 24px auto;            
            .line {
              flex: 1;
              position: relative;
              top: -6px;
              border-bottom: 1px solid rgba(255,255,255,0.2);
            }
            .text {
              padding: 0 12px;
              font-weight: 700;
              font-size: 14px;
            }
          }
          .supports {
            width: 80%;
            margin: 0 auto;
            .support-item {
              padding: 0 12px;
              margin-bottom: 12px;
              font-size: 0;
              &:last-child {
                margin-bottom: 0px;
              }
              .icon {
                display: inline-block;
                width: 16px;
                height: 16px;
                vertical-align: top;
                margin-right: 16px;
                background-size: 16px 16px;
                background-repeat: no-repeat;
                &.decrease {
                  @include bg-image('decrease_2');
                }
                &.discount {
                  @include bg-image('discount_2');
                }
                &.gurantee {
                  @include bg-image('guarantee_2');
                }
                &.invoice {
                  @include bg-image('invoice_2');
                }
                &.special {
                  @include bg-image('special_2');
                }
              }
              .text {
                line-height: 12px;
                font-size: 12px;
              }
            }
          }
          .bulletin {
            width: 80%;
            margin: 0 auto;
            .content {
              padding: 0 12px;
              line-height: 24px;
              font-size: 12px;
            }
          }
        }
      }
      .detail-close {
          position: relative;
          width: 32px;
          height: 32px;
          margin: -64px auto 0 auto;
          clear: both;
          font-size: 32px;
      }
    }    
</style>