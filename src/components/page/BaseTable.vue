<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item style="font-size: 20px; font-weight: bold"><i class="el-icon-lx-cascades"></i>&nbsp;&nbsp;{{type}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
                <el-input v-model="select_word" placeholder="菜名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
                <el-button type="primary" icon="el-icon-plus" @click="add">添加</el-button>
                <el-button type="primary" @click="all">全部</el-button>
            </div>


            <el-table :data="tableData" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="Name" label="菜名" sortable width="150"></el-table-column>
                <el-table-column prop="Price" label="价格(元)" width="120"></el-table-column>
                <el-table-column prop="Unit" label="单位"></el-table-column>

                <el-table-column label="图片" width="180" align="center">
                    <template slot-scope="scope">
                        <el-image v-if="scope.row.Picture"
                          style="width: 100px;"
                          :src="scope.row.Pic"
                          ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="Indent" label="是否允许下单" width="120" :formatter="formatter"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="title">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="40%">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="菜名">
                    <el-input v-model="form.Name"></el-input>
                </el-form-item>
                <el-form-item label="单位">
                    <el-select v-model="form.Unit" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="价格">
                    <!-- <el-input v-model="form.Price"></el-input> -->
                    <el-input-number v-model="form.Price" :precision="1" :step="1" ></el-input-number>
                </el-form-item>
                <el-form-item label="允许下单">
                    <el-radio v-model="form.Indent" label="true">是</el-radio>
                    <el-radio v-model="form.Indent" label="false">否</el-radio>
                </el-form-item>

                <el-form-item label="图片上传">
                    <el-upload
                      class="upload-demo"
                      :action="uploadUrl"
                      :limit="1"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :file-list="fileList"
                      :on-success="uploadSuccess"
                      list-type="picture">
                      <el-button size="small" type="primary">点击上传</el-button>
                      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
                

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        name: 'basetable',
        data() {
            return {
                type: '',
                title: 10,
                fileList: [],  //上传图片
                uploadUrl: this.global.API.UploadManageService.UploadAll + '?type=1&oldPath=""', //图片上传路径
                tableData: [],  //表格数据
                cur_page: 0,    //翻页页码
                multipleSelection: [],
                select_word: '',  //菜名
                del_list: [],
                editVisible: false,
                delVisible: false,
                form: {
                    Id: '',
                    Picture: '',
                    Name: '',
                    Unit: '',
                    Price: '',
                    Indent: true
                },
                options: [
                    { value: '个', label: '个' }, 
                    { value: '15个', label: '15个' }, 
                    { value: '3个', label: '3个' }, 
                    { value: '根', label: '根' }, 
                    { value: '杯', label: '杯' }, 
                    { value: '份', label: '份' }, 
                    { value: '斤', label: '斤' }, 
                    { value: '瓶', label: '瓶' }, 
                    { value: '听', label: '听' }, 
                    { value: '两', label: '两' }, 
                    { value: '包', label: '包' }, 
                    { value: '包/10个', label: '包/10个' }, 
                    { value: '袋', label: '袋' }, 
                    { value: '盒', label: '盒' }, 
                    { value: '只', label: '只' }, 
                    { value: '半只', label: '半只' }, 
                    { value: '3只', label: '3只' }, 
                    { value: '串', label: '串' }, 
                    { value: '块', label: '块' }, 
                    { value: '张', label: '张' }, 
                ],
                idx: -1,
                delId: '',
            }
        },
        created() {
            bus.$on('type', msg => {
                this.type = msg
            })
            if(this.fileList[0].url){
                this.uploadUrl = this.global.API.UploadManageService.UploadAll + '?type=1&oldPath=' + this.fileList[0].url;
            } else{
                this.uploadUrl = this.global.API.UploadManageService.UploadAll + '?type=1&oldPath=""';
            }
            
            this.getData();
        },
        computed: {
            data() {
                return this.tableData.filter((d) => {
                    
                })
            }
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            uploadSuccess(response, file, fileList) {  //上传成功回调
                console.log(JSON.parse(response.resultData)[0].Url);
                this.form.Picture = JSON.parse(response.resultData)[0].Url
            },

            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = (val-1)*10;
                console.log((val-1)*10+1);
                this.getData();
            },
            // 获取数据
            getData() {
               
                this.$axios.get( this.global.API.RecipeManageService.GetAllRecipe, 
                    { params: { "draw": 0, 'start': this.cur_page, 'length': 10, 'retrievalInfo': JSON.stringify({'Type': this.type, 'Name': this.select_word}) }}
                ).then((res) => {
                    let resData = JSON.parse(JSON.parse(res.data.resultData).data);
                    this.title = JSON.parse(res.data.resultData).recordsTotal;

                    for(let i=0; i<resData.length; i++) {
                        if(resData[i].Picture){
                            //resData[i].Pic = resData[i].Picture;
                            resData[i].Pic = this.global.Domain.resource + resData[i].Picture;
                        }
                    }
                    this.tableData = resData;
                    console.log(resData);
                })
            },
            search() {
                this.getData();
            },
            all() {
                this.select_word = '';
                this.getData();
            },
            formatter(row, column) {
                if(row.Indent == 'true') {
                    return '是'
                }else {
                    return '否'
                }
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.form = {
                    Id: item.Id,
                    Name: item.Name,
                    Unit: item.Unit,
                    Price: item.Price,
                    Indent: item.Indent
                }
                this.fileList = [{name: item.Picture, url: item.Pic}]
                this.editVisible = true;
            },
            add() {
                this.fileList = [];
                this.form = {
                    Id: '',
                    Name: '',
                    Unit: '',
                    Price: '',
                    Indent: ''
                }
                
                this.editVisible = true;
            },
            handleDelete(index, row) {
                this.delId = row.Id;
                this.idx = index;
                this.delVisible = true;
            },
            delAll() {  //批量删除
                const length = this.multipleSelection.length;
                let str = '';
                this.del_list = this.del_list.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].Id + ',';
                }
                str = str.slice(0,str.length-1); 
                //console.log(str); 

                this.$axios.get( this.global.API.RecipeManageService.DelRecipe, {
                    params: {"id": str }
                }).then(res => {
                    console.log(res);
                    if(res.data.success == 1) {
                        this.$message.success('删除成功');
                        this.getData();
                        this.multipleSelection = [];
                    }
                }).catch(error => {
                    console.log(error);
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            saveEdit() {
                //this.$set(this.tableData, this.idx, this.form);
                
                let sendData = this.form;
                sendData.Type = this.type;

                this.$axios.get( this.global.API.RecipeManageService.AddorEditRecipe, {
                    params: {"ID": this.form.Id, 'jsonStr': JSON.stringify(sendData)}
                }).then(res => {
                    console.log(res);
                    if(res.data.success == 1) {
                        this.editVisible = false;
                        this.$message.success(res.data.message);
                        this.getData();
                    }
                }).catch(error => {
                    console.log(error);
                })
            },
            // 确定删除
            deleteRow(){
                this.$axios.get( this.global.API.RecipeManageService.DelRecipe, {
                    params: {"id": this.delId }
                }).then(res => {
                    console.log(res);
                    if(res.data.success == 1) {
                        this.tableData.splice(this.idx, 1);
                        this.$message.success('删除成功');
                        this.delVisible = false;
                    }
                }).catch(error => {
                    console.log(error);
                })

                
            }
        },
        watch: {
            type: function(){
                this.cur_page = 0;
                this.select_word = '';
                this.getData();

            },
            select_word: function() {
                this.getData();
            }
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
    .mr10{
        margin-right: 10px;
    }
</style>
