<template>
  <div class="app-container">
    <!-- table form -->
    <el-form :inline="true" style="margin-top:30px;">
      <el-row>
        <el-col :span="12" style="text-align: left">
          <el-form-item label="请输入查询条件：">
            <el-input v-model="searchKeyword" placeholder="输入查询条件" style="width: 420px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" style="text-align: right; padding-right: 10px;">
          <el-button-group>
            <el-button type="primary" icon="el-icon-search" @click="handleStudentsQuery">查询</el-button>
            <el-button type="primary" icon="el-icon-tickets" @click="handleStudentsQueryAll">全部</el-button>
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleStudentAdd">添加</el-button>
          </el-button-group>
        </el-col>
        <el-col :span="2">
          <el-upload action="" :show-file-list="false" :http-request="handleExcelUpload">
            <el-button type="primary">导入Excel</el-button>
          </el-upload>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="handleExcelDownload">导出Excel</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- table body -->
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
          <el-button type="success" icon="el-icon-more" size="mini" circle @click="handleStudentDetail(scope.row)">
          </el-button>
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            circle
            @click="handleStudentUpdate(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            circle
            @click="handleStudentDelete(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- table pagination -->
    <el-row style="margin-top: 20px;">
      <el-col :span="8" style="text-align: left">
        <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleStudentsDelete">批量删除</el-button>
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
    <!-- table row detail -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="50%" @close="handleDialogClose('studentForm')">
      <el-form
        :model="studentForm"
        :rules="rules"
        ref="studentForm"
        label-width="110px"
        label-position="right"
        size="mini"
        style="margin: 10px 20px;"
      >
        <el-upload
          class="avatar-uploader"
          style="text-align: center; margin: 20px;"
          action=""
          :show-file-list="false"
          :disabled="isView"
          :before-upload="beforeAvatarUpload"
          :http-request="handleAvatarUpload"
        >
          <img v-if="studentForm.image" :src="studentForm.imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-row>
          <el-col :span="12">
            <el-form-item label="学号：" prop="sno">
              <el-input v-model="studentForm.sno" :disabled="isEdit || isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名：" prop="name">
              <el-input v-model="studentForm.name" :disabled="isView" suffix-icon="el-icon-edit"> </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="性别：" prop="gender">
              <el-select
                v-model="studentForm.gender"
                :disabled="isView"
                placeholder="请选择性别"
                style="display: block;"
              >
                <el-option value="男"></el-option>
                <el-option value="女"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出生日期：" prop="birthday">
              <el-date-picker
                v-model="studentForm.birthday"
                value-format="yyyy-MM-dd"
                :disabled="isView"
                type="date"
                placeholder="选择日期"
                style="width: 100% !important;"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="手机号码：" prop="mobile">
              <el-input v-model="studentForm.mobile" :disabled="isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱地址：" prop="email">
              <el-input v-model="studentForm.email" :disabled="isView" suffix-icon="el-icon-edit"> </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="家庭住址：" prop="address">
              <el-input v-model="studentForm.address" :disabled="isView" suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" v-show="!isView" @click="submitStudentForm('studentForm')">
          确定
        </el-button>
        <el-button type="info" size="mini" @click="handleDialogClose('studentForm')">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getStudentList,
  addStudent,
  updateStudent,
  deleteStudent,
  deleteStudents,
  checkSNoExist,
  uploadAvatar,
  uploadExcel,
  downloadExcel
} from '@/api/student-mock' // FIXME...replace student-mock with student in production（这句有道词典可能会翻译错误）

export default {
  name: 'Student',
  data() {
    const validateSNo = (rule, value, callback) => {
      if (this.isEdit) {
        callback()
      }
      // Ajax validate
      checkSNoExist({ sno: value })
        .then(res => {
          if (res.data.exists) {
            callback(new Error('学号已存在！'))
          } else {
            callback()
          }
        })
        .catch(error => {
          console.log('校验学号后端出现异常：')
          console.log(error)
        })
    }
    return {
      tableLoading: true,
      students: [],
      pageStudents: [],
      searchKeyword: '',
      selectStudents: [],

      // ====  pagination related variables ====
      total: 0, // total number of data(students.length)
      currentPage: 1,
      pageSize: 5, // how many rows in each page

      // ====  dialog related variables ====
      dialogVisible: false,
      dialogTitle: '',
      isView: false,
      isEdit: false,
      studentForm: {
        sno: '',
        name: '',
        gender: '',
        birthday: '',
        mobile: '',
        email: '',
        address: '',
        image: '',
        imageUrl: ''
      },
      rules: {
        sno: [
          { required: true, message: '学号不能为空', trigger: 'blur' },
          { pattern: /^[9][5]\d{3}$/, message: '学号必须是95开头的五位数', trigger: 'blur' },
          { validator: validateSNo, trigger: 'blur' }
        ],
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' },
          { pattern: /^[\u4e00-\u9fa5]{2,5}$/, message: '姓名必须是2-5个汉字', trigger: 'blur' }
        ],
        gender: [{ required: true, message: '性别不能为空', trigger: 'change' }],
        birthday: [{ required: true, message: '出生日期不能为空', trigger: 'change' }],
        mobile: [
          { required: true, message: '手机号码不能为空', triggler: 'blur' },
          { pattern: /^[1][35789]\d{9}$/, message: '手机号码必须要符合规范', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱地址不能为空', trigger: 'blur' },
          {
            pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            message: '邮箱地址必须要符合规范',
            trigger: 'blur'
          }
        ],
        address: [{ required: true, message: '家庭住址不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.handleStudentsQueryAll()
  },
  methods: {
    handleStudentsQuery() {
      this.tableLoading = true
      getStudentList({ keyword: this.searchKeyword }).then(res => {
        this.students = res.data.students
        this.total = res.data.students.length
        this.getPageStudents()
        this.tableLoading = false
      })
    },
    handleStudentsQueryAll() {
      this.searchKeyword = ''
      this.handleStudentsQuery()
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
    },
    handleStudentDetail(row) {
      this.dialogTitle = '查看学生详情'
      this.isView = true
      this.dialogVisible = true
      this.studentForm = JSON.parse(JSON.stringify(row))
    },
    handleStudentAdd() {
      this.dialogTitle = '添加学生信息'
      this.dialogVisible = true
    },
    handleStudentUpdate(row) {
      this.dialogTitle = '修改学生明细'
      this.isEdit = true
      this.dialogVisible = true
      this.studentForm = JSON.parse(JSON.stringify(row))
    },
    handleDialogClose(formName) {
      this.$refs[formName].resetFields()
      // clear form data
      this.studentForm.sno = ''
      this.studentForm.name = ''
      this.studentForm.gender = ''
      this.studentForm.birthday = ''
      this.studentForm.mobile = ''
      this.studentForm.email = ''
      this.studentForm.address = ''
      this.studentForm.image = ''
      this.studentForm.imageUrl = ''
      // close
      this.dialogVisible = false
      // init: isView and isEdit
      this.isEdit = false
      this.isView = false
    },
    handleExcelUpload(file) {
      let fileReq = new FormData()
      fileReq.append('excel', file.file)
      uploadExcel(fileReq)
        .then(res => {
          this.students = res.data.students
          this.total = res.data.students.length
          this.getPageStudents()
          this.$alert('本次导入完成! 成功：' + res.data.success + '失败：' + res.data.error, '导入结果展示', {
            confirmButtonText: '确定',
            callback: () => {
              this.$message({
                type: 'info',
                message: '本次导入失败数量为：' + res.data.error + ',具体的学号：' + res.data.errors
              })
            }
          })
          console.log('本次导入失败数量为：' + res.data.error + ',具体的学号：')
          console.log(res.data.errors)
        })
        .catch(error => {
          console.log('上传 Excel 时出现异常：')
          console.log(error)
        })
    },
    handleExcelDownload() {
      downloadExcel()
        .then(res => {
          let filePath = res.data['file_path']
          window.open(filePath)
        })
        .catch(error => {
          console.log('导出 Excel 出现异常：')
          console.log(error)
        })
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt1M = file.size / 1024 / 1024 < 1

      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!')
      }
      if (!isLt1M) {
        this.$message.error('上传头像图片大小不能超过 1MB!')
      }
      return (isJPG || isPNG) && isLt1M
    },
    handleAvatarUpload(file) {
      // define a FormData class
      let fileReq = new FormData()
      fileReq.append('avatar', file.file)
      // Ajax request
      uploadAvatar(fileReq)
        .then(res => {
          this.studentForm.image = res.data['image_name']
          this.studentForm.imageUrl = res.data['image_url']
          this.$message({
            message: '头像上传成功！',
            type: 'success'
          })
        })
        .catch(error => {
          console.log('上传学生头像时出现异常：')
          console.log(error)
        })
    },
    // validate before add / update
    submitStudentForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.isEdit) {
            this.submitUpdateStudent()
          } else {
            this.submitAddStudent()
          }
        } else {
          return false
        }
      })
    },
    submitAddStudent() {
      addStudent(this.studentForm)
        .then(res => {
          this.students = res.data.students
          this.total = res.data.students.length
          this.getPageStudents()
          this.$message({
            message: '数据添加成功！',
            type: 'success'
          })
          this.handleDialogClose('studentForm')
        })
        .catch(error => {
          console.log('添加学生信息时出现异常：')
          console.log(error)
        })
    },
    submitUpdateStudent() {
      updateStudent(this.studentForm)
        .then(res => {
          this.students = res.data.students
          this.total = res.data.students.length
          this.getPageStudents()
          this.$message({
            message: '数据修改成功！',
            type: 'success'
          })
          this.handleDialogClose('studentForm')
        })
        .catch(error => {
          console.log('更新学生信息时出现异常：')
          console.log(error)
        })
    },
    // single delete
    handleStudentDelete(row) {
      this.$confirm('是否确认删除学生信息【学号：' + row.sno + '\t姓名：' + row.name + '】信息？', '提示', {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteStudent({ sno: row.sno }).then(res => {
            this.students = res.data.students
            this.total = res.data.students.length
            this.getPageStudents()
            this.$message({
              message: '数据删除成功！',
              type: 'success'
            })
          })
        })
        .catch(error => {
          this.$message({
            message: '数据删除时出现异常！',
            type: 'success'
          })
          console.log('删除学生信息时出现异常：')
          console.log(error)
        })
    },
    // bulk delete
    handleStudentsDelete() {
      this.$confirm('是否确认批量删除' + this.selectStudents.length + '个学生信息吗？', '提示', {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteStudents({ students: this.selectStudents })
          .then(res => {
            this.students = res.data.students
            this.total = res.data.students.length
            this.getPageStudents()
            this.$message({
              message: '数据批量删除成功！',
              type: 'success'
            })
          })
          .catch(error => {
            this.$message({
              message: '数据删除时出现异常！',
              type: 'success'
            })
            console.log('批量删除学生信息时出现异常：')
            console.log(error)
          })
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>

<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
