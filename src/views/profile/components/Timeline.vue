<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item v-for="(item, index) of timeline" :key="index" :timestamp="item.timestamp" placement="top">
        <el-card>
          <h4>{{ item.title }}</h4>
          <p>{{ item.content }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeline: [
        {
          timestamp: '2020/12/06',
          title: 'Finish Template',
          content: 'Release Version on Dec 6, 2020'
        },
        {
          timestamp: '2020/11/26',
          title: 'Init Repository',
          content: 'First committed on Nov 26, 2020'
        }
      ]
    }
  }
}
</script>
