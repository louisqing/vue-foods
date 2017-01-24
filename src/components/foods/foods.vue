<template>
   <div class="foods">
    <div class="foods-type-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in foods" class="foods-type-item" :class="{'current': currentIndex === index}" @click="selectFoods(index,$event)">
          <span class="text border-1px">
            <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in foods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <food-item :food="food" v-for="food in item.foods"></food-item>            
          </ul>
        </li >
      </ul>
    </div> 
    <cart></cart>    
   </div> 
   
</template>

<script>
  import {mapGetters} from 'vuex'
  import foodItem from './food_item'
  import cart from 'components/foods/cart/cart'
  import BScroll from 'better-scroll'

  export default {
    props: {
      restaurant: {
        type: Object
      }
    },
    components: {
      foodItem,
      cart
    },
    computed: {
      ...mapGetters({
        foods: 'foods',
        classMap: 'classMap',
        listHeight: 'listHeight',
        scrollY: 'scrollY'
      }),
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      }
    },
    created() {
      this.$store.dispatch('getFoods', {
        scroll: this._initScroll,
        calHeight: this._calHeight
      })
    },
    methods: {
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        })
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        })
        this.foodsScroll.on('scroll', (pos) => {
          this.$store.dispatch('scrollFoodsY', Math.abs(Math.round(pos.y)))
        })
      },
      _calHeight() {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        let height = 0
        this.$store.dispatch('foodsHeightPush', height)
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.$store.dispatch('foodsHeightPush', height)
        }
      },
      selectFoods(index, event) {
        if (!event._constructed) {
          return
        }
        let foodsList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        let el = foodsList[index]
        this.foodsScroll.scrollToElement(el, 300)
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import '../../common/sass/mixin.scss';
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
         .foods-type-item {
           display: table;
           height: 54px;
           width: 56px;
           line-height: 14px;
           padding: 0 12px;
           &.current {
            position: relative;
            z-index: 10;
            font-weight: 700;
            background: #fff;
            margin-top: -1px;
            text {
              @include border-none();
            }
           }
           .icon {
              @include icon(3);
           }
           .text {
             display: table-cell;
             font-size: 12px;             
             vertical-align: middle;
             width: 56px;
             @include border-1px(rgba(7,17,27,0.1));
           }

         }
      }
      .foods-wrapper {
         flex: 1;   
         .title {
           padding-left: 14px;
           height: 26px;
           line-height: 26px;
           border-left: 2px solid #d9dde1;
           font-size: 12px;
           color: rgb(147,153,159);
           background: #f3f5f7;
         }      
      }
    }
</style>