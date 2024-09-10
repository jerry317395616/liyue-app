<template>
  <view class="pagination-container">
    <u-icon 
      name="arrow-left"
      :color="currentPage === 1 ? '#ccc' : '#000'" 
      @click="prevPage" 
    />
    <input 
      class="page-input" 
      type="number" 
      v-model="inputPage" 
      @change="changePage" 
    />
    <text class="total-pages">/ {{ totalPages }}</text>
    <u-icon 
      name="arrow-right" 
      :color="currentPage === totalPages ? '#ccc' : '#000'" 
      @click="nextPage" 
    />
  </view>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    totalItems: {
      type: Number,
      required: true
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.pageSize);
    },
    inputPage: {
      get() {
        return this.currentPage;
      },
      set(newValue) {
        this.$emit('update:currentPage', newValue);
      }
    }
  },
  methods: {
    prevPage() {
      if (this.currentPage > 1) {
        this.$emit('update:currentPage', this.currentPage - 1);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.$emit('update:currentPage', this.currentPage + 1);
      }
    },
    changePage(event) {
      let page = parseInt(event.target.value);
      if (page >= 1 && page <= this.totalPages) {
        this.$emit('update:currentPage', page);
      } else {
        event.target.value = this.currentPage;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 60rpx 0;
  .u-icon {
    cursor: pointer;
    &:hover {
      color: #007aff;
    }
  }
  
  .total-pages {
	  margin: 0 20rpx 0 10rpx;
  }

  .page-input {
    width: 80rpx;
	height: 50rpx;
    text-align: center;
    margin-left: 20rpx;
    padding: 4rpx;
    border: 1rpx solid #ccc;
    border-radius: 8rpx;
    outline: none;
    -webkit-appearance: none;
    
    &:focus {
      border-color: #007aff;
    }
  }
}
</style>
