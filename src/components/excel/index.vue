<template>
    <div id="excel">
        <input class="upload" type="file" accept=".xlsx,.csv,.xls" name="" id="" @change="upload">
        <div class="table" v-if="excelData">
            <p>Excel读取时间 {{ time }}s, 共 {{ data.length }}条</p>
            <a-table :columns="columns" :data-source="data"></a-table>
        </div>
    </div>

</template>

<script>
  import excelWorker from '@/excelWorker'
  import Table from 'ant-design-vue/lib/table';
  import 'ant-design-vue/lib/table/style/index.css'
  import 'ant-design-vue/lib/pagination/style/index.css'


  export default {
    name: 'app',
    components: {
      'a-table': Table
    },
    data () {
      return {excelData: null, start: null, time: 0, columns: [], data: null, count: 0}
    },
    created() {
      excelWorker.worker.onmessage = event => {
        this.excelData = JSON.parse(event.data)
        if (this.excelData[0] && this.excelData[0][0]) {
          this.columns = Object.keys(this.excelData[0][0]).map(x => ({title: x, key: x, dataIndex: x}))
          this.data = this.excelData[0]
        }
        this.time = (Date.now() - this.start) / 1000
      }
    },
    methods: {
      upload (e) {
        this.start = Date.now()
        excelWorker.worker.postMessage(e.target.files)
        e.target.value = ''
      }
    },
    destroyed() {
      excelWorker.worker.terminate()
    }
  }
</script>

<style>
    .upload {

    }
</style>
