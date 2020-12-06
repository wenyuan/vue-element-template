<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">
        <el-col :span="6" :xs="24">
          <user-card :user="user"></user-card>
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="Account" name="account">
                <account :user="user"></account>
              </el-tab-pane>
              <el-tab-pane label="Timeline" name="timeline">
                <timeline></timeline>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import Account from './components/Account'
import Timeline from './components/Timeline'

export default {
  name: 'Profile',
  components: { UserCard, Account, Timeline },
  data() {
    return {
      user: {},
      activeTab: 'account'
    }
  },
  computed: {
    ...mapGetters('user', ['name', 'avatar'])
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.user = {
        name: this.name,
        role: 'admin',
        email: 'wenyuan.xu@vip.163.com',
        avatar: this.avatar
      }
    }
  }
}
</script>
