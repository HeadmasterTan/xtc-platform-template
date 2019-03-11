<!--
    自定义穿梭框组件 transfer

    本组件左侧列表为滚动加载列表，开始只会显示 100 条数据，然后每次滚动到底部的时候加载 50 条数据

    不适用场景：左侧列表数据过多（几百条）并且需要全选左侧列表数据到右侧

    props: {
        data: Array<Object> 显示在左侧的数据数组，其中 Object.label 为显示内容，Object.value 为唯一值
        selection: Array<Object> 显示在右侧的数据数组，属性要求同 data
        styles: Object 就是样式
        titles: Array<String> 两个列表的标题
        reload: Boolean 是否重新加载穿梭框数据
    }

    event: {
        on-change: 当操作了左右移动的按钮后就会将右侧数据返回
        reload-finished: 穿梭框数据重新加载完毕
    }
-->

<template>
    <div class="transfer" :style="styles">
        <Row class="main-content">
            <!-- 右侧元数据列表 -->
            <Col class="left-list" span="10">
                <div class="content">
                    <div class="head">
                        <Checkbox class="title-wrap" v-model="leftAllCheck" @on-change="selectAllLeft">
                            <span class="title">{{ titles[0] }}</span>
                        </Checkbox>
                    </div>
                    <div class="search">
                        <Input v-model="leftSearchKey" size="small" placeholder="请输入搜索内容" suffix="ios-search" clearable />
                    </div>
                    <div ref="leftList" class="list">
                        <ul>
                            <li class="item" v-for="(i, index) in leftDatas" :key="i.value">
                                <Checkbox class="item-check" v-model="leftChecks[index]"><span class="item-name">{{ i.label }}</span></Checkbox>
                            </li>
                        </ul>
                    </div>
                </div>
            </Col>
            <!-- 中间操作按钮 -->
            <Col class="operate-content" span="4">
                <div class="btn-group">
                    <Button class="operate-btn" type="primary" size="small" :disabled="isSelectedRight" @click="moveRightToLeft"><Icon type="ios-arrow-back" /></Button>
                    <Button class="operate-btn" type="primary" size="small" :disabled="isSelectedLeft" @click="moveLeftToRight"><Icon type="ios-arrow-forward" /></Button>
                </div>
            </Col>
            <!-- 左侧被选中数据列表 -->
            <Col class="right-list" span="10">
                <div class="content">
                    <div class="head">
                        <Checkbox class="title-wrap" v-model="rightAllCheck" @on-change="selectAllRight">
                            <span class="title">{{ titles[1] }}</span>
                        </Checkbox>
                    </div>
                    <div class="search">
                        <Input v-model="rightSearchKey" size="small" placeholder="请输入搜索内容" suffix="ios-search" clearable />
                    </div>
                    <div class="list">
                        <ul>
                            <li class="item" v-for="(i, index) in rightDatas" :key="i.value">
                                <Checkbox class="item-check" v-model="rightChecks[index]"><span class="item-name">{{ i.label }}</span></Checkbox>
                            </li>
                        </ul>
                    </div>
                </div>
            </Col>
        </Row>
    </div>
</template>

<script>

export default {
    props: {
        styles: { // 就是样式
            type: Object,
            default: () => ({
                width: '100%',
                height: '500px'
            })
        },
        selection: { // 已选数据
            type: Array,
            default: () => []
        },
        data: { // 待选数据
            type: Array,
            default: () => []
        },
        titles: { // 表头
            type: Array,
            default: () => ['源列表', '目的列表']
        },
        reload: { // 是否重新加载
            type: Boolean
        }
    },
    data() {
        return {
            leftAllCheck: false, // 是否全选 / 清空左边选项
            leftChecks: [], // 左侧数据选择情况
            leftSearchKey: '', // 左侧搜索关键字

            rightAllCheck: false, // 是否全选 / 清空右边选项
            rightChecks: [], // 右侧数据选择情况
            rightSearchKey: '', // 右侧搜索关键字

            curShowCount: 100, // 当前显示条数

            // 直接使用父组件传入的值会导致数据错误，这里需要直接拷贝一份到子组件
            selectedData: [], // 已选项
            selectData: [] // 待选项
        };
    },
    created() {
    },
    mounted() {
        this.setScrollLoading();
    },
    computed: {
        /**
         * 实时根据搜索内容过滤显示左侧数据
         */
        leftDatas() {
            let count = this.curShowCount;
            return this.selectData.filter(item => {
                return item.label.indexOf(this.leftSearchKey) > -1 && (count-- > 0);
            });
        },
        /**
         * 实时根据搜索内容过滤显示右侧数据
         */
        rightDatas() {
            let count = this.curShowCount;
            return this.selectedData.filter(item => {
                return item.label.indexOf(this.rightSearchKey) > -1 && (count-- > 0);
            });
        },
        /**
         * 是否选中了左侧列表
         */
        isSelectedLeft() {
            for (let i = 0; i < this.leftChecks.length; i++) {
                if (this.leftChecks[i]) {
                    return false;
                }
            }
            return true;
        },
        /**
         * 是否选中了右侧列表
         */
        isSelectedRight() {
            for (let i = 0; i < this.rightChecks.length; i++) {
                if (this.rightChecks[i]) {
                    return false;
                }
            }
            return true;
        }
    },
    methods: {
        /**
         * 选中全部左侧数据
         */
        selectAllLeft(val) {
            for (let i = 0; i < this.leftChecks.length; i++) {
                this.leftChecks.splice(i, 1, val);
            }
        },
        /**
         * 将左侧选中数据移动到右侧
         */
        moveLeftToRight() {
            for (let i = 0; i < this.leftChecks.length; i++) {
                if (this.leftChecks[i]) {
                    // 右侧数据增加
                    this.selectedData.push(this.leftDatas[i]);
                    // 左侧数据减少
                    for (let j = 0; j < this.selectData.length; j++) {
                        if (this.selectData[j].value === this.leftDatas[i].value) {
                            this.selectData.splice(j, 1);
                            break;
                        }
                    }
                    this.leftChecks.splice(i--, 1);
                }
            }
            this.leftAllCheck = false;
            this.$emit('on-change', this.selectedData);
        },
        /**
         * 选中全部右侧数据
         */
        selectAllRight(val) {
            for (let i = 0; i < this.rightChecks.length; i++) {
                this.rightChecks.splice(i, 1, val);
            }
        },
        /**
         * 将右侧选中数据移动到左侧
         */
        moveRightToLeft() {
            for (let i = 0; i < this.rightChecks.length; i++) {
                if (this.rightChecks[i]) {
                    // 左侧数据增加
                    this.selectData.push(this.rightDatas[i]);
                    // 右侧数据减少
                    for (let j = 0; j < this.selectedData.length; j++) {
                        if (this.selectedData[j].value === this.rightDatas[i].value) {
                            this.selectedData.splice(j, 1);
                            break;
                        }
                    }
                    this.rightChecks.splice(i--, 1);
                }
            }
            this.rightAllCheck = false;
            this.$emit('on-change', this.selectedData);
        },
        /**
         * 设置滚动事件，当且仅当 div 滚动条滚动到底部时加载新的内容
         */
        setScrollLoading() {
            this.$nextTick(() => {
                const el = this.$refs.leftList;
                // 因为拿不到 offsetHeight，所以只能将就了
                const offsetHeight = Number(this.styles.height.slice(0, this.styles.height.length - 2));

                el.onscroll = () => {
                    const scrollTop = el.scrollTop;
                    const scrollHeight = el.scrollHeight;
                    if ((offsetHeight + scrollTop) - scrollHeight >= -1) {
                        // 搜索和当前数据长度不足的情况下不触发，且保留现场
                        if (this.leftSearchKey === '' && this.curShowCount < this.data.length) {
                            this.curShowCount += 50; // 每次滚动到底部多加载 50 条数据
                        }
                    }
                };
            });
        },
        /**
         * 过滤掉 data 中的已选项
         */
        filterDataSelected() {
            for (let i = 0; i < this.selectedData.length; i++) {
                for (let j = 0; j < this.selectData.length; j++) {
                    if (this.selectData[j].value === this.selectedData[i].value) {
                        this.selectData.splice(j, 1);
                        break;
                    }
                }
            }
        },
    },
    watch: {
        /**
         * 重新加载子组件数据
         */
        reload(newVal) {
            if (newVal) {
                // 已选数据和可选数据
                this.selectedData = [].concat(this.selection);
                this.selectData = [].concat(this.data);
                this.filterDataSelected();

                // 查询关键字
                this.leftSearchKey = '';
                this.rightSearchKey = '';

                // 全选按钮
                this.leftAllCheck = false;
                this.rightAllCheck = false;

                // 选择集合
                this.leftChecks = [];
                this.rightChecks = [];

                // 左侧列表滚动情况
                this.curShowCount = 100;
                this.$refs.leftList.scrollTop = 0;

                this.$emit('reload-finished', true);
            }
        },
        /**
         * 监听传入的 selection，然后过滤 data 中与 selection 相同的部分
         */
        selection(newVal) {
            this.selectedData = [].concat(newVal);
            this.filterDataSelected();
        },
        /**
         * 同上
         */
        data(newVal) {
            this.selectData = [].concat(newVal);
            this.filterDataSelected();
        },
        /**
         * 监听左侧数据变更时改变左侧选择状态数组
         */
        leftDatas() {
            this.leftChecks.length = this.leftDatas.length;
        },
        /**
         * 监听左侧状态选择数组，变更全选状态
         */
        leftChecks() {
            if (this.leftChecks.length < 1) {
                return false;
            }
            let temp = true;
            for (let i = 0; i < this.leftChecks.length; i++) {
                if (!this.leftChecks[i]) {
                    temp = false;
                    break;
                }
            }
            this.leftAllCheck = temp;
        },
        /**
         * 监听右侧数据变更时改变右侧选择状态数组
         */
        rightDatas() {
            this.rightChecks.length = this.rightDatas.length;
        },
        /**
         * 监听右侧状态选择数组，变更全选状态
         */
        rightChecks() {
            if (this.rightChecks.length < 1) {
                return false;
            }
            let temp = true;
            for (let i = 0; i < this.rightChecks.length; i++) {
                if (!this.rightChecks[i]) {
                    temp = false;
                    break;
                }
            }
            this.rightAllCheck = temp;
        }
    }
};

</script>

<style lang="less" scoped>
.transfer {
  width: 100%;
  height: 500px;
  .main-content {
    width: 100%;
    height: 100%;
    .right-list {
      height: 100%;
      border: solid 1px #dcdee2;
      border-radius: 4px;
    }
    .operate-content {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .btn-group {
        .operate-btn {
          display: block;
          margin: 10px 0px;
        }
      }
    }
    .left-list {
      height: 100%;
      border: solid 1px #dcdee2;
      border-radius: 4px;
    }
    .content {
      height: 100%;
      .head {
        height: 30px;
        padding-left: 5px;
        background-color: #f9fafc;
        border-bottom: solid 1px #ccc;
        border-radius: 5px 5px 0px 0px;
        .title-wrap {
          line-height: 30px;
          .title {
            margin-left: 10px;
            font-size: 14px;
          }
        }
      }
      .search {
        height: 30px;
        padding: 5px;
      }
      .list {
        overflow-y: auto;
        overflow-x: hidden;
        height: -moz-calc(~"100% - 60px"); // ~ 解决 less 编译时导致的 calc 计算错误
        height: -webkit-calc(~"100% - 60px");
        height: calc(~"100% - 60px");
        ul {
          list-style: none;
          .item {
            line-height: 30px;
            padding: 0px 5px;
            cursor: pointer;
            &:hover {
              background-color: #f3f3f3;
            }
            .item-check {
              width: 100%;
            }
            .item-name {
              margin-left: 10px;
            }
          }
        }
      }
    }
  }
}
</style>