<!--
    由于 iView 函数调用的弹框 Modal 会相互冲突，所以在使用 confirm Modal 时请使用这个组件

    props: {
        show: Boolean 显示与否
        title: String 标题
        content: String 内容
    }

    event: {
        on-ok: 点击确认
        on-cancel: 点击取消
    }
-->

<template>
    <Modal class="confirm-modal" v-model="confirmModal" width="420" :mask-closable="false" :closable="false" @on-ok="onOk" @on-cancel="onCancel">
        <div class="confirm-header" slot="header"><Icon type="ios-help-circle" /><span ref="title"></span></div>
        <p ref="content" class="confirm-content"></p>
    </Modal>
</template>

<script>
    export default {
        props: {
            title: {
                type: String
            },
            content: {
                type: String
            },
            show: {
                type: Boolean
            }
        },
        data() {
            return {
                confirmModal: false
            };
        },
        methods: {
            onOk() {
                this.$emit('on-ok');
            },
            onCancel() {
                this.$emit('on-cancel');
            }
        },
        watch: {
            show() {
                this.confirmModal = this.show;
                if (this.show) {
                    this.$refs.title.innerHTML = this.title;
                    this.$refs.content.innerHTML = this.content;
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .confirm-header {
        margin-top: 10px;
        span {
            font-size: 16px;
            color: #17233d;
            font-weight: 700;
            margin-left: 12px;
        }
        i {
            color: #f90;
            font-size: 28px;
            margin-bottom: 3px;
        }
    }
    .confirm-content {
        padding-left: 42px;
        font-size: 14px;
        color: #515a6e;
    }
</style>

<style lang="scss">
    .confirm-modal .ivu-modal-header {
        border-bottom: none;
        padding: 16px 16px 10px 16px;
    }
    .confirm-modal .ivu-modal-body {
        padding: 0px 16px 16px 16px;
    }
    .confirm-modal .ivu-modal-footer {
        border-top: none;
    }
</style>
