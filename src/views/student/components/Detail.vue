<template>
  <div class="student-detail-container">
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="50%" @close="closeDialogForm('studentForm')">
      <el-form
        :model="studentForm"
        :rules="rules"
        ref="studentForm"
        :inline="true"
        style="margin-left: 20px;"
        label-width="110px"
        label-position="right"
        size="mini"
      >
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :http-request="uploadPicturePost"
          :disabled="isView"
          style="text-align: center;margin:20px;"
        >
          <img v-if="studentForm.image" :src="studentForm.imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-form-item label="学号：" prop="sno">
          <el-input v-model="studentForm.sno" :disabled="isEdit || isView" suffix-icon="el-icon-edit"></el-input>
        </el-form-item>
        <el-form-item label="姓名：" prop="name">
          <el-input v-model="studentForm.name" :disabled="isView" suffix-icon="el-icon-edit"> </el-input>
        </el-form-item>
        <el-form-item label="性别：" prop="gender">
          <el-select v-model="studentForm.gender" :disabled="isView" placeholder="请选择性别">
            <el-option value="男"></el-option>
            <el-option value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期：" prop="birthday">
          <el-date-picker
            v-model="studentForm.birthday"
            value-format="yyyy-MM-dd"
            :disabled="isView"
            type="date"
            placeholder="选择日期"
            style="width:93% "
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="手机号码：" prop="mobile">
          <el-input v-model="studentForm.mobile" :disabled="isView" suffix-icon="el-icon-edit"></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址：" prop="email">
          <el-input v-model="studentForm.email" :disabled="isView" suffix-icon="el-icon-edit"> </el-input>
        </el-form-item>
        <el-form-item label="家庭住址：" prop="address">
          <el-input
            v-model="studentForm.address"
            :disabled="isView"
            suffix-icon="el-icon-edit"
            style="width:262%"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" v-show="!isView" @click="submitStudentForm('studentForm')">确定</el-button>
        <el-button type="info" size="mini" @click="closeDialogForm('studentForm')">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'StudentDetail',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'view' // ['view', 'edit', 'add']
    },
    studentInfo: {
      type: Object,
      // Props with type Object/Array must use a factory function to return the default value.
      default: () => ({
        sno: '',
        name: '',
        gender: '',
        birthday: '',
        mobile: '',
        email: '',
        address: '',
        image: '',
        imageUrl: ''
      })
    }
  },
  data() {
    const validateSNo = (rule, value, callback) => {
      if (['admin'].indexOf(value.trim()) < 0) {
        callback(new Error('学号已存在'))
      } else {
        callback()
      }
    }
    return {
      dialogTitle: '',
      isView: '',
      isEdit: '',
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
  methods: {
    //添加学生时打开表单
    addStudent() {
      //修改标题
      this.dialogTitle = "添加学生明细";
      //弹出表单
      this.dialogVisible = true;
    },
    //根据Id获取image
    getImageBySno(sno) {
      //遍历
      for (oneStudent of this.students) {
        //判断
        if (oneStudent.sno == sno) {
          return oneStudent.image;
        }
      }
    },
    //查看学生的明细
    viewStudent(row) {
      //修改标题
      this.dialogTitle = "查看学生明细";
      //修改isView变量
      this.isView = true;
      //弹出表单
      this.dialogVisible = true;
      //深拷贝方法：
      this.studentForm = JSON.parse(JSON.stringify(row))
      //获取照片
      this.studentForm.image = this.getImageBySno(row.sno);
      //获取照片URL
      this.studentForm.imageUrl = this.baseURL + 'media/' + this.studentForm.image;

    },
    //修改学生的明细
    updateStudent(row) {
      //修改标题
      this.dialogTitle = "修改学生明细";
      //修改isEdit变量
      this.isEdit = true;
      //弹出表单
      this.dialogVisible = true;
      //深拷贝方法：
      this.studentForm = JSON.parse(JSON.stringify(row))
      //获取照片
      this.studentForm.image = this.getImageBySno(row.sno);
      //获取照片URL
      this.studentForm.imageUrl = this.baseURL + 'media/' + this.studentForm.image;

    },
    //提交学生的表单（添加、修改）
    submitStudentForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //校验成功后，执行添加或者修改？
          if (this.isEdit) {
            //修改
            this.submitUpdateStudent();
          } else {
            //添加
            this.submitAddStudent();
          }

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //添加到数据库的函数
    submitAddStudent() {
      //定义that
      let that = this;
      //执行Axios请求
      axios
        .post(that.baseURL + 'student/add/', that.studentForm)
        .then(res => {
          //执行成功
          if (res.data.code === 1) {
            //获取所有学生的信息
            that.students = res.data.data;
            //获取记录条数
            that.total = res.data.data.length;
            //获取分页信息
            that.getPageStudents();
            //提示：
            that.$message({
              message: '数据添加成功！',
              type: 'success'
            });
            //关闭窗体
            this.closeDialogForm('studentForm');
          } else {
            //失败的提示！
            that.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          //执行失败
          console.log(err);
          that.$message.error("获取后端查询结果出现异常！");
        })
    },
    //修改更新到数据库
    submitUpdateStudent() {
      //定义that
      let that = this;
      //执行Axios请求
      axios
        .post(that.baseURL + 'student/update/', that.studentForm)
        .then(res => {
          //执行成功
          if (res.data.code === 1) {
            //获取所有学生的信息
            that.students = res.data.data;
            //获取记录条数
            that.total = res.data.data.length;
            //获取分页信息
            that.getPageStudents();
            //提示：
            that.$message({
              message: '数据修改成功！',
              type: 'success'
            });
            //关闭窗体
            this.closeDialogForm('studentForm');
          } else {
            //失败的提示！
            that.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          //执行失败
          console.log(err);
          that.$message.error("修改时获取后端查询结果出现异常！");
        })

    },
    //删除一条学生记录
    deleteStudent(row) {
      //等待确认
      this.$confirm('是否确认删除学生信息【学号：' + row.sno + '\t姓名：' + row.name + '】信息？',
        '提示', {
          confirmButtonText: '确定删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        //确认删除响应事件
        let that = this
        //调用后端接口
        axios.post(that.baseURL + 'student/delete/', { sno: row.sno })
          .then(res => {
            if (res.data.code === 1) {
              //获取所有学生信息
              that.students = res.data.data;
              //获取记录数
              that.total = res.data.data.length;
              //分页
              that.getPageStudents();
              //提示
              that.$message({
                message: '数据删除成功！',
                type: 'success'
              });
            } else {
              that.$message.error(res.data.msg);
            }
          })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    deleteStudents() {
      //等待确认
      this.$confirm("是否确认批量删除" + this.selectStudents.length + "个学生信息吗？",
        '提示', {
          confirmButtonText: '确定删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        //确认删除响应事件
        let that = this
        //调用后端接口
        axios.post(that.baseURL + 'students/delete/', { student: that.selectStudents })
          .then(res => {
            if (res.data.code === 1) {
              //获取所有学生信息
              that.students = res.data.data;
              //获取记录数
              that.total = res.data.data.length;
              //分页
              that.getPageStudents();
              //提示
              that.$message({
                message: '数据批量删除成功！',
                type: 'success'
              });
            } else {
              that.$message.error(res.data.msg);
            }
          })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //关闭弹出框的表单
    closeDialogForm(formName) {
      //重置表单的校验
      this.$refs[formName].resetFields();
      //清空
      this.studentForm.sno = "";
      this.studentForm.name = "";
      this.studentForm.gender = "";
      this.studentForm.birthday = "";
      this.studentForm.mobile = "";
      this.studentForm.email = "";
      this.studentForm.address = "";
      this.studentForm.image = "",
        this.studentForm.imageUrl = "",
        //关闭
        this.dialogVisible = false;
      //初始化isView和isEdit值
      this.isEdit = false;
      this.isView = false;

    },
    //选择学生头像后点击确定后触发的事件
    uploadPicturePost(file) {
      //定义that
      let that = this;
      //定义一个FormData类
      let fileReq = new FormData();
      //把照片穿进去
      fileReq.append('avatar', file.file);
      //使用Axios发起Ajax请求
      axios(
        {
          method: 'post',
          url: that.baseURL + 'upload/',
          data: fileReq
        }
      ).then(res => {
        // 根据code判断是否成功
        if (res.data.code === 1) {
          //把照片给image
          that.studentForm.image = res.data.name;
          //拼接imageurl
          that.studentForm.imageUrl = that.baseURL + "media/" + res.data.name;
        } else {
          //失败的提示！
          that.$message.error(res.data.msg);
        }

      }).catch(err => {
        console.log(err);
        that.$message.error("上传头像出现异常！");
      })

    },
    uploadExcelPost(file) {
      let that = this
      //实例化一个formdata
      //定义一个FormData类
      let fileReq = new FormData();
      //把照片穿进去
      fileReq.append('excel', file.file);
      //使用Axios发起Ajax请求
      axios(
        {
          method: 'post',
          url: that.baseURL + 'excel/import/',
          data: fileReq
        }
      ).then(res => {
        // 根据code判断是否成功
        if (res.data.code === 1) {
          //把照片给image
          that.students = res.data.data;
          //计算总共多少条
          that.total = res.data.data.length;
          //分页
          that.getPageStudents();
          //弹出框体显示结果
          this.$alert('本次导入完成! 成功：' + res.data.success +'失败：'+ res.data.error
            , '导入结果展示', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'info',
                  message: "本次导入失败数量为：" + res.data.error + ",具体的学号："+res.data.errors,
                });
              }
            });
          //把失败明细打印
          console.log("本次导入失败数量为：" + res.data.error + ",具体的学号：");
          console.log(res.data.errors);
        } else {
          //失败的提示！
          that.$message.error(res.data.msg);
        }

      }).catch(err => {
        console.log(err);
        that.$message.error("上传Excel出现异常！");
      })

    }
  }
}
</script>

<style scoped></style>
