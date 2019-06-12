<template>
    <div>
        <el-divider content-position="left">上传本周食谱</el-divider>
        <el-upload
          class="upload-demo"
          :action="url"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :limit="1"
          :on-success="success"
          :on-exceed="handleExceed"
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>

        <el-divider content-position="left" class="title">职工餐</el-divider>
        <el-card class="box-card" >
          <div slot="header" class="clearfix">
            <span>{{monday}}</span>
          </div>
          <el-divider content-position="left">早餐</el-divider>
          <div v-for="item in datalist" v-if="item.Week=='星期一'&& item.Type=='职工餐'" :key="item.Id" class="text item">
            {{item.Name}}
          </div>
          <el-divider content-position="left">中餐</el-divider>
          <div class="text item"></div>
          <el-divider content-position="left">晚餐</el-divider>
          <div class="text item"></div>
        </el-card>
        
        <el-card class="box-card" >
          <div slot="header" class="clearfix">
            <span>{{tuesday}}</span>
          </div>
          <el-divider content-position="left">早餐</el-divider>
          <div v-for="item in datalist" v-if="item.Week=='星期二'&& item.Type=='职工餐'" :key="item.Id" class="text item">
            {{item.Name}}
          </div>
          <el-divider content-position="left">中餐</el-divider>
          <div class="text item"></div>
          <el-divider content-position="left">晚餐</el-divider>
          <div class="text item"></div>
        </el-card>

        <el-card class="box-card" >
          <div slot="header" class="clearfix">
            <span>{{wednesday}}</span>
          </div>
          <el-divider content-position="left">早餐</el-divider>
          <div v-for="item in datalist" v-if="item.Week=='星期三'&& item.Type=='职工餐'" :key="item.Id" class="text item">
            {{item.Name}}
          </div>
          <el-divider content-position="left">中餐</el-divider>
          <div class="text item"></div>
          <el-divider content-position="left">晚餐</el-divider>
          <div class="text item"></div>
        </el-card>

        <el-card class="box-card" >
          <div slot="header" class="clearfix">
            <span>{{thursday}}</span>
          </div>
          <el-divider content-position="left">早餐</el-divider>
          <div v-for="item in datalist" v-if="item.Week=='星期四'&& item.Type=='职工餐'" :key="item.Id" class="text item">
            {{item.Name}}
          </div>
          <el-divider content-position="left">中餐</el-divider>
          <div class="text item"></div>
          <el-divider content-position="left">晚餐</el-divider>
          <div class="text item"></div>
        </el-card>

        <el-card class="box-card" >
          <div slot="header" class="clearfix">
            <span>{{friday}}</span>
          </div>
          <el-divider content-position="left">早餐</el-divider>
          <div v-for="item in datalist" v-if="item.Week=='星期五'&& item.Type=='职工餐'" :key="item.Id" class="text item">
            {{item.Name}}
          </div>
          <el-divider content-position="left">中餐</el-divider>
          <div class="text item"></div>
          <el-divider content-position="left">晚餐</el-divider>
          <div class="text item"></div>
        </el-card>
        
        <el-divider content-position="left" class="title">老年餐</el-divider>

        <el-card class="box-card" >
          <div slot="header" class="clearfix">
            <span>{{monday}}</span>
          </div>
          <el-divider content-position="left">早餐</el-divider>
          <div v-for="item in datalist" v-if="item.Week=='星期一'&& item.Type=='老年餐'" :key="item.Id" class="text item">
            {{item.Name}}
          </div>
          <el-divider content-position="left">中餐</el-divider>
          <div class="text item"></div>
          <el-divider content-position="left">晚餐</el-divider>
          <div class="text item"></div>
        </el-card>

        <el-card class="box-card" >
          <div slot="header" class="clearfix">
            <span>{{tuesday}}</span>
          </div>
          <el-divider content-position="left">早餐</el-divider>
          <div v-for="item in datalist" v-if="item.Week=='星期二'&& item.Type=='老年餐'" :key="item.Id" class="text item">
            {{item.Name}}
          </div>
          <el-divider content-position="left">中餐</el-divider>
          <div class="text item"></div>
          <el-divider content-position="left">晚餐</el-divider>
          <div class="text item"></div>
        </el-card>

        <el-card class="box-card" >
          <div slot="header" class="clearfix">
            <span>{{wednesday}}</span>
          </div>
          <el-divider content-position="left">早餐</el-divider>
          <div v-for="item in datalist" v-if="item.Week=='星期三'&& item.Type=='老年餐'" :key="item.Id" class="text item">
            {{item.Name}}
          </div>
          <el-divider content-position="left">中餐</el-divider>
          <div class="text item"></div>
          <el-divider content-position="left">晚餐</el-divider>
          <div class="text item"></div>
        </el-card>

        <el-card class="box-card" >
          <div slot="header" class="clearfix">
            <span>{{thursday}}</span>
          </div>
          <el-divider content-position="left">早餐</el-divider>
          <div v-for="item in datalist" v-if="item.Week=='星期四'&& item.Type=='老年餐'" :key="item.Id" class="text item">
            {{item.Name}}
          </div>
          <el-divider content-position="left">中餐</el-divider>
          <div class="text item"></div>
          <el-divider content-position="left">晚餐</el-divider>
          <div class="text item"></div>
        </el-card>

        <el-card class="box-card" >
          <div slot="header" class="clearfix">
            <span>{{friday}}</span>
          </div>
          <el-divider content-position="left">早餐</el-divider>
          <div v-for="item in datalist" v-if="item.Week=='星期五'&& item.Type=='老年餐'" :key="item.Id" class="text item">
            {{item.Name}}
          </div>
          <el-divider content-position="left">中餐</el-divider>
          <div class="text item"></div>
          <el-divider content-position="left">晚餐</el-divider>
          <div class="text item"></div>
        </el-card>

        <el-divider content-position="left" class="title">相关人员</el-divider>
        <el-card class="box-card" >
          <div class="text item">主管：{{datalist[0].Satrap}}</div>
        </el-card>
        <el-card class="box-card" >
          <div class="text item">厨师长：{{datalist[0].Chef}}</div>
        </el-card>

        
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        name: 'dashboard',
        data() {
            return {
                url: this.global.API.UploadManageService.UploadExcel,
                fileList: [],
                datalist: [{Satrap: '', Chef: ''}],

                monday: '',
                tuesday: '',
                wednesday: '',
                thursday: '',
                friday: ''
            }
        },
        computed: {
            role() {
                return this.name === 'admin' ? '超级管理员' : '普通用户';
            }
        },
        created(){
            this.getData();
        },
        activated(){
            
        },
        deactivated(){
            
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            success(response, file, fileList) {
                //console.log(response);
                if(response.success == 0) {
                    this.$message.warning(response.message);
                    this.fileList = [];
                }
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            getData() {
                this.$axios.get( this.global.API.RecipeManageService.GetWeekRecipe, {
                    params: {"draw": 1, 'start': 0, 'length': 100000, 'retrievalInfo': JSON.stringify({})}
                })
                .then( (response) => {
                    //console.log(response);
                    if(response.data.success == 1) {
                        let getDataList = JSON.parse(response.data.resultData);
                        this.datalist = JSON.parse(getDataList.data);
                        let allDataList = JSON.parse(getDataList.data);
                        for(let i=0; i<allDataList.length; i++) {
                            if(allDataList[i].Week == '星期一') {
                                this.monday = `${allDataList[i].Week}(${allDataList[i].Date})`
                            }else if(allDataList[i].Week == '星期二') {
                                this.tuesday = `${allDataList[i].Week}(${allDataList[i].Date})`
                            }else if(allDataList[i].Week == '星期三') {
                                this.wednesday = `${allDataList[i].Week}(${allDataList[i].Date})`
                            }else if(allDataList[i].Week == '星期四') {
                                this.thursday = `${allDataList[i].Week}(${allDataList[i].Date})`
                            }else if(allDataList[i].Week == '星期五') {
                                this.friday = `${allDataList[i].Week}(${allDataList[i].Date})`
                            }
                        }
                        //console.log(this.monday)
                        //console.log(JSON.parse(getDataList.data));
                    } else {
                        
                    }
                    
                    
                })
                .catch( (error) => {
                    console.log(error);
                });
            }
        }
    }

</script>


<style scoped>
    .el-divider__text{ font-size: 20px; background-color: #F0F0F0}
    .box-card{ width: 18%; display: inline-block; margin: 10px; vertical-align: top; }
    .clearfix span{ font-weight: bold }
</style>
<style>
    .el-upload--text {height: 40px; width: 100px; border: none; line-height: 40px; background-color: #F0F0F0}
</style>
