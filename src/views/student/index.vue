<template>
  <div class="app-container">
    <el-form :inline="true" style="margin-top:30px;">
      <el-row>
        <el-col :span="12">
          <el-form-item label="请输入查询条件：">
            <el-input v-model="searchKeyword" placeholder="输入查询条件" style="width: 420px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" style="text-align: right;padding-right:10px;">
          <el-button-group>
            <el-button type="primary" icon="el-icon-search" @click="queryStudents()">查询</el-button>
            <el-button type="primary" icon="el-icon-tickets" @click="getAllStudents()">全部</el-button>
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addStudent()">添加</el-button>
          </el-button-group>
        </el-col>
        <el-col :span="2">
          <el-upload :show-file-list="false" :http-request="uploadExcelPost">
            <el-button type="primary">导入Excel</el-button>
          </el-upload>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="exportToExcel()">导出Excel</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- 表格 -->
    <el-table
      v-loading="tableLoading"
      element-loading-text="加载中"
      :data="pageStudents"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>
      <el-table-column prop="sno" label="学号" width="80"></el-table-column>
      <el-table-column prop="name" label="姓名" width="80"></el-table-column>
      <el-table-column prop="gender" label="性别" width="60"></el-table-column>
      <el-table-column prop="birthday" label="出生日期" align="center" width="100"></el-table-column>
      <el-table-column prop="mobile" label="电话" align="center" width="120"></el-table-column>
      <el-table-column prop="email" label="邮箱" align="center" width="220"></el-table-column>
      <el-table-column prop="address" label="地址" align="center"></el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button type="success" icon="el-icon-more" size="mini" circle @click="viewStudent(scope.row)"></el-button>
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            circle
            @click="updateStudent(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            circle
            @click="deleteStudent(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-row style="margin-top: 20px;">
      <el-col :span="8" style="text-align: left">
        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteStudents()">批量删除</el-button>
      </el-col>
      <el-col :span="16" style="text-align: right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getStudentList } from '@/api/student'

export default {
  name: 'StudentList',
  data() {
    return {
      tableLoading: true,
      students: [],
      pageStudents: [],
      searchKeyword: '',
      selectStudents: [],
      total: 0, // total number of data(students.length)
      currentPage: 1,
      pageSize: 10 // how many rows in each page
    }
  },
  created() {
    this.getAllStudents()
  },
  methods: {
    queryStudents() {
      this.tableLoading = true
      getStudentList({ keyword: this.searchKeyword }).then(res => {
        this.students = res.data.students
        this.total = res.data.students.length
        this.getPageStudents()
        this.tableLoading = false
      })
    },
    getAllStudents() {
      this.searchKeyword = ''
      this.queryStudents()
    },
    /**
     * Get current page students
     */
    getPageStudents() {
      this.pageStudents = []
      for (let i = (this.currentPage - 1) * this.pageSize; i < this.total; i++) {
        this.pageStudents.push(this.students[i])
        // judge if current page has enough data
        if (this.pageStudents.length === this.pageSize) break
      }
    },
    /**
     * Change the number of rows per page when paging
     */
    handleSizeChange(size) {
      // Modifies the number of data rows per page
      this.pageSize = size //
      // Data re-paging
      this.getPageStudents()
    },
    /**
     * Change the current page number
     * @param pageNumber
     */
    handleCurrentChange(pageNumber) {
      this.currentPage = pageNumber
      this.getPageStudents()
    },
    handleSelectionChange(data) {
      this.selectStudents = data
    }
  }
}
</script>
