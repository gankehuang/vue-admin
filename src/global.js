import env from './env'


//const Domain = env.Domain;

const Domain = {
  // 服务器环境
  
  'api': 'http://10.123.56.198:8012',   
  'resource': 'http://10.123.56.198:8012/File', //资源服务器地址    //api.facisp.cn

}

const API = {
  'UserManageService': {
      'Login': Domain.api + '/UserManageService.asmx/Login',     //登录
      'LogOff': Domain.api + '/UserManageService.asmx/LogOff',      //退出登录
  },

  'UploadManageService': {
      'UploadExcel': Domain.api + '/UploadManageService.asmx/UploadExcel',
      'UploadAll': Domain.api + '/UploadManageService.asmx/UploadAll'
  },
  'RecipeManageService': {
      'GetWeekRecipe': Domain.api + '/RecipeManageService.asmx/GetWeekRecipe',
      'GetMenuType': Domain.api + '/RecipeManageService.asmx/GetMenuType',
      'GetAllRecipe': Domain.api + '/RecipeManageService.asmx/GetAllRecipe',
      'AddorEditRecipe': Domain.api + '/RecipeManageService.asmx/AddorEditRecipe',  //添加食谱
      'DelRecipe': Domain.api + '/RecipeManageService.asmx/DelRecipe',   //删除
  }

}

// 返回上一页
function goBack(e){
  e.preventDefault();
  window.history.back();
}

// h5+环境检测
function checkPlus(){
  if(window.plus){
    return true;
  }
  else{
    alert('当前环境不支持硬件及系统相关操作，请使用APP完成相关操作！');
    return false;
  }
}

// 自定义alert
function alert_custom(str){
  if(window.plus){
    window.plus.nativeUI.alert(str);
  }
  else{
    alert(str);
  }
}

// 自定义confirm
function confirm_custom(str, callback_ok){
  if(window.plus){
    window.plus.nativeUI.confirm(str, function(e){
      if(e.index == 0){
        callback_ok();
      }
    });
  }
  else{
    let conf = window.confirm(str);
    if(conf == true){
      callback_ok();
    }
  }
}

// 自定义toast
function toast(str){
  if(window.plus){
    window.plus.nativeUI.toast(str);
  }
  else{
    alert(str);
  }
}
  
// 获取cookie
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');    //把cookie分割成组    
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];                      //取得字符串    
        while (c.charAt(0) == ' ') {          //判断一下字符串有没有前导空格    
            c = c.substring(1, c.length);      //有的话，从第二位开始取    
        }
        if (c.indexOf(nameEQ) == 0) {       //如果含有我们要的name    
            return unescape(c.substring(nameEQ.length, c.length));    //解码并截取我们要值    
        }
    }
    return false;
}

//清除cookie    
function clearCookie(name) {
    setCookie(name, "", 0);
}

//设置cookie  名 值  秒
function setCookie(name, value, seconds) {   
    var expires = "";
    // if (seconds != 0) {      //设置cookie生存时间    
        var date = new Date();
        date.setTime(date.getTime() + (seconds * 1000));
        expires = "; expires=" + date.toGMTString();
    // }
    document.cookie = name + "=" + escape(value) + expires + "; path=/";   //转码并赋值    
}

export default {
  'Domain': Domain,
  'API': API,


  // 发送ajax POST请求；参数option包含项：_this, url, data, f_resolve
  '$post': function(option){
    let prommise = new Promise(function(resolve, reject){

      /*$.ajaxSetup({
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('PlatForm', 'front');   
        }
      });*/


      $.ajax({
        'url': option.url,
        'type': 'POST',
        'data': option.data,
        'success': function(data, status){
          if(typeof data == 'string') {
             data = JSON.parse(data);
          }
          if('origin' in option){
            resolve(data);
          }
          else if(status == 'success' && data.success == 1){
            if(typeof data.resultData == 'string')
              resolve(JSON.parse(data.resultData));
            else
              resolve(data.resultData);
          }
          else{
            //reject(data.message);
          }
        },
          'error': function(err){
          //reject(err.responseText);
        }
        });



      });

    prommise
    .then(data => {
      option.f_resolve(data);
    })
    .catch(err => {
      /*option._this.$Message.error({
        content: err,
        closable: true
      });*/
    });

    return prommise;
  },


  // 补全服务器资源访问路径
  'normalResourceUrl': function(url, type){
    if (url==null || url=='null' || url==undefined || url.length==0) {
      let img_tmp = '/static/img/img_tmp.jpg';
      if(typeof type == 'string' && type){
        switch(type){
          case 'product': img_tmp = '/static/img/tmp/product_tmp.jpg';break;
          default: img_tmp = '/static/img/tmp/img_tmp.jpg';
        }
      }
      //return img_tmp;
      return "";
    }
    else if(url.indexOf('http://')===0 || url.indexOf('https://')===0){
      return url;
    }
    else{
      return Domain.resource + (url[0]=='/'?'':'/') + url;
    }
  },
  'parseStringToArray': function(arr){
    if(arr instanceof Array){
      return arr;
    }
    else{
      return JSON.parse(arr);
    }
  },

  'getCookie': getCookie,
  'setCookie': setCookie,
  'clearCookie': clearCookie,

  'goBack': goBack,
  'checkPlus': checkPlus,
  'alert': alert_custom,
  'confirm': confirm_custom,
  'toast': toast,
  'toCNKI': function(){
      if(localStorage.getItem('url_cnki')){
        setTimeout(window.open(localStorage.getItem('url_cnki')), 800);
        
      }
      else{
        // _this.$router.push({path: '/home'}); 
        return;
      }
  },
  'toCNKIDetail': function(_this, sysid){
      if(localStorage.getItem('url_cnki')){
        let url_cnki = localStorage.getItem('url_cnki').split('?')
        let url = url_cnki[0] + '/ArticleDetails?'+window.encodeURIComponent('sysid=' + sysid + (url_cnki.length>1?'&'+window.decodeURIComponent(url_cnki[1]):''))
        console.log(url);
        window.open(url);
      }
      else{
        const prommise_getCurrentUser = this.$post({
          '_this': _this,
          'url': this.API.UserManageService.GetCurrentUser,
          'data': {
            'SId': secret_AES.Decrypt_ECB(localStorage.getItem('SId')) || ''
          },
          'origin': true,
          'f_resolve': function(data){
            let resultData = JSON.parse(data.resultData);
            if(data.success==1){
              _this.$root.login = true;
              _this.$root.name = resultData.Name;
              sessionStorage.setItem('loginBS', 'ok');
              sessionStorage.setItem('name', resultData.Name);
              localStorage.setItem('url_cnki', resultData.url+'?'+ window.encodeURIComponent('token='+ localStorage.getItem('SId')));
            }
            else{
              _this.$root.login = false;
              _this.$root.name = "";
              sessionStorage.removeItem('loginBS');
              localStorage.setItem('SId', null);
              if(!localStorage.getItem('url_cnki')){
                localStorage.setItem('url_cnki', resultData.url);
              }
            }
            let url_cnki = localStorage.getItem('url_cnki').split('?')
            let url = url_cnki[0] + '/ArticleDetails?'+window.encodeURIComponent('sysid=' + sysid + (url_cnki.length>1?'&'+window.decodeURIComponent(url_cnki[1]):''))
            console.log(url);
            window.open(url);
          }
        });
      }
  }
}

