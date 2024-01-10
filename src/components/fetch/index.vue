<template>
  <div class="fetch-wrapper mt-10">
    <div class="flex-wrap">
      <a-input placeholder="输入要获取的 id" v-model="appId" size="small"/>
      <a-button type="primary" @click="getTemplate" size="small">获取</a-button>
    </div>
    <div class="table" v-if="result">
      <p>fetch数据源读取时间 {{ time }}s, 共 {{ result.data.length }}条</p>
      <a-table :loading="result.loading" :columns="result.columns" :data-source="result.data">
      </a-table>
    </div>
  </div>
</template>

<script>
import fetchWorker from "@/workers/fetch";

export default {
  name: "app",
  data() {
    return {
      appId: '38',
      result: {
        data: [],
        loading: false
      },
      time: 0,
    };
  },
  created() {
    this.getTemplate()
    fetchWorker.onmessage = (event) => {
      // eslint-disable-next-line no-console
      console.log('event', event.data)
      this.result.data = event.data
      this.result.columns = Object.keys(event.data[0]).map(key => {
        const item = {
          title: key,
          dataIndex: key,
          key,
          rowKey: Date.now(),
        }
        if (key === 'dataSource') {
          item.maxWidth = '200px'
          item.filterMode = 'tree'
          item.filterSearch = true
          item.onFilter = (value, record) => {
            return record.dataSource.list.some(dataSource => {
              return dataSource.id.includes(value)
            })
          }
          item.customRender = (text, record) => {
            if (record.error) {
              return <a-tag color="red">{ record.error }</a-tag>
            } else {
              return <div class="tag-wrapper">
                {
                  record.dataSource.list.map(dataSource => {
                    return <a-tag
                        class="mt-5"
                        key={dataSource.id}
                        color={dataSource.method === 'post' ? 'geekblue' : 'green'}
                    >
                      {dataSource.id}
                    </a-tag>
                  })
                }
              </div>
            }
          }
        } else if (key === 'methods') {
          item.maxWidth = '300px'
          item.filterSearch = true
          item.filterMode = 'tree'
          item.onFilter = (value, record) => {
            return true
          }
          item.customRender = (text, record) => {
            if (record.error) {
              return <a-tag color="red">{ record.error }</a-tag>
            } else {
              return <div class="tag-wrapper">
                {
                  Object.keys(record.methods).map(method => {
                    return <a-tag
                        class="mt-5"
                        key={ method }
                        color={ record.methods[method].value.length > 100 ? 'geekblue' : 'green' }
                    >
                      { method }
                    </a-tag>
                  })
                }
              </div>
            }
          }
        }
        return item
      });
      this.time = (Date.now() - this.start) / 1000;
      this.result.loading = false;
    };
  },
  methods: {
    getTemplate() {
      if(this.appId === '') {
        this.$message.error('请输入要获取的 id');
        return
      }
      this.start = Date.now();
      this.result.loading = true;
      fetchWorker.postMessage(this.appId);
    },
  },
  destroyed() {
    fetchWorker.terminate();
  },
};
</script>
<style lang="less">
.tag-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  .ant-tag{
    margin-top: 5px;
  }
}
</style>
