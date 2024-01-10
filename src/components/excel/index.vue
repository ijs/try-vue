<template>
  <div id="excel">
    <input
      class="upload"
      type="file"
      accept=".xlsx,.csv,.xls"
      name=""
      id=""
      @change="upload"
    />
    <div class="table" v-if="excelData">
      <p>Excel读取时间 {{ time }}s, 共 {{ data.length }}条</p>
      <a-table :columns="columns" :data-source="data"></a-table>
    </div>
  </div>
</template>

<script>
import excelWorker from "@/workers/excel";

export default {
  name: "app",
  data() {
    return {
      excelData: null,
      start: null,
      time: 0,
      columns: [],
      data: null,
      count: 0,
    };
  },
  created() {
    excelWorker.onmessage = (event) => {
      this.excelData = event.data;
      if (this.excelData[0] && this.excelData[0][0]) {
        this.columns = Object.keys(this.excelData[0][0])
          .filter((x) => x !== "key")
          .map((x) => ({ title: x, key: x, dataIndex: x }));
        this.data = this.excelData[0];
      }
      this.time = (Date.now() - this.start) / 1000;
    };
  },
  methods: {
    upload(e) {
      this.start = Date.now();
      excelWorker.postMessage(e.target.files);
      e.target.value = "";
    },
  },
  destroyed() {
    excelWorker.terminate();
  },
};
</script>

<style>
</style>
