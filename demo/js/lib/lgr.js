'use strict';
(function(){


var $pwLoginForm = $('#pwLoginForm'),
    $pwLoginError = $('#pwLoginError'),
    $msgLoginForm = $('#msgLoginForm'),
    $msgLoginError = $('#msgLoginError'),
    /* 个人注册 */
    $perRegForm = $('#perRegForm'),
    $perRegError = $('#perRegError'),
    $regCodeBtn = $('#regCodeBtn'),
    $perRegReset = $('#perRegReset'),
    /* 个人注册 完善信息 */
    $perRegInfoBox = $('#perRegInfoBox'),
    $perRegInfoForm = $('#perRegInfoForm'),
    $regSexBox = $('#regSexBox'),
    $regSexBtn = $regSexBox.find('.js_reg_sex_btn'),
    $regSexVal = $('#regSexVal'),
    $perRegInfoReset = $('#perRegInfoReset'),
    /*组织注册*/
    $groupRegForm = $('#groupRegForm'),
    $groupRegError = $('#groupRegRrror'),
    $groupCodeBtn = $('#groupCodeBtn'),
    $groupRegReset = $('#groupRegReset'),
    /* 社交账号注册 */
    $sjRegForm = $('#sjRegForm'),
    /* 找回密码 */
    $findpwBox = $('#findpwBox'),
    $findpwBtn = $('#findpwBtn'),
    $findpwForm = $('#findpwForm'),
    $findCodeBtn = $('#findCodeBtn'),
    /* 邮箱账号激活 */
    $emailActBox = $('#emailActBox'),
    $emailActForm = $('#emailActForm'),
    $regmail = $('#regmail'),
    $activateEmlNow = $('#activateEmlNow'),
    $reSendEmail = $('#reSendEmail'),
    $reSendTip = $('#reSendTip'),
    /* 手机账号激活 */
    $mobActBox = $('#mobActBox'),
    $mobActForm = $('#mobActForm'),
    $mobnumber = $('#mobnumber'),
    $getActCodeBtn = $('#getActCodeBtn'),
    /* 手机重置密码 */
    $mobResetForm = $('#mobResetForm'),
    $reMobGetCodeBtn = $('#reMobGetCodeBtn'),
    $mobResetNumber = $('#mobResetNumber'),
    $mobNewPass = $('#mobNewPass'),
    $reMobCode = $('#reMobCode'),
    /* 邮箱重置密码 */
    $emailResetForm = $('#emailResetForm'),
    $reEmailGetCodeBtn = $('#reEmailGetCodeBtn'),
    $emailAddress = $('#emailAddress'),
    $emailNewPass = $('#emailNewPass'),
    $reEmailCode = $('#reEmailCode'),
    $name = $('#name'),
    $pass = $('#pass'),
    $phone = $('#phone'),
    $code = $('#code'),
    $getCodeBtn = $('#getCodeBtn'),
    $passWait = $('#passWait'),
    $codeErrorWrap = $('#codeErrorWrap'),
    $rememberBtn = $('#rememberBtn'),
    pwName,
    pwPass,
    remember,
    message,
    isMobile = true,
    isEmail,
    //errorHtml = '<dl class="lg-web-error"><dt>Oops~网络错误</dt><dd>出现了网络错误，请检查您的网络是否正常</dd></dl>',
    /* 通用弹窗 */
    //$ajaxMessageBox = $('#ajaxMessageBox'),
    //$ajaxMessage = $('#ajaxMessage'),
    //$popMask = $('#popMask'),
    /* tab */
    $jsModeNav = $('.js_mode_nav'),
    $jsModeBox = $('.js_mode_box'),
    $jsRegBox = $('.js_reg_box'),
    $material = $('#material'),//加号按钮
    now,
    /* 上传头像 */
    $popModifyHeadImgContent = $('#popModifyHeadImgContent'),
    $popModifyHeadImgTpl = $('#popModifyHeadImgTpl'),
    $popModifyHeadImg = $('#popModifyHeadImg'),
    $imageEditor = $('#imageEditor'),
    $uploadSub = $('#uploadSub'),
    $userHeadImg = $('img.js_user_head_img'),
    $userHeadImgInp = $('#userHeadImgInp'),
    imageData,
    $token = $('#token'),
    $key = $('#key'),
    token,
    key,
    $qnUrl = $('#qn_url'),
    $regUserID = $('#regUserID'),
    qnUrl,
    file,imgUrl,
    url,xhr,pic,blkRet,
    /* 倒计时 */
    $countdown,$submit;
$(function() {
    setTimeout(function(){//记住用户名、密码时，自动过去焦点
        if($name.val().length > 0) {
            $name.focus();
            $pass.focus();
        }
    }, 30);
    function countdown(){//通用倒计时方法
        $countdown = $('.js_countdown');
        i = 60; 
        function fun() { 
            if (i == 0) { 
                removeData();
                clearInterval(intervalid);
                return false; 
            } 
            strText = i+'秒后重新获取';
            $countdown.text(strText);
            i--; 
        };
        intervalid = setInterval(fun, 1000); 
        function removeData(){
            $countdown.removeAttr('data_lock').removeClass('disable').text('获取验证码');
        };
        fun();//执行倒计时
    };
    
    countdown();//加载页面时执行默认倒计时方法

    
    /* tab */
    $html.off('click','.js_mode_nav').on('click','.js_mode_nav',function(){
        var $t = $(this);
        now = $t.index();
        $jsModeNav.removeClass('active');
        $t.addClass('active');
        $jsModeBox.hide();
        $jsModeBox.eq(now).show();
    });
    /* 内容层通用关闭方法 */
    $html.off('click','.js_reg_close').on('click','.js_reg_close',function(){
        $(this).parent().fadeOut();
        $material.show();
    });
    /* 注册类型选择方法 */
    $html.off('click','.js_type_btn').on('click','.js_type_btn',function(){
        var $t = $(this);
        now = $t.index();
        $jsRegBox.eq(now).fadeIn();
    });
    popMaskClose();//执行点击浮层关闭弹窗方法
    /* 密码可见方法 */
    $html.off('click','.js_newpass').on("click",'.js_newpass',function(){
        var $t = $(this);
        isAct = $t.hasClass('active');
        if (!isAct){
            $t.parent().find(".js_newpassword").attr("type","password");
            $t.addClass("active");
        }else{
            $t.parent().find(".js_newpassword").attr("type","text");
            $t.removeClass("active");
        }
    });
    /*  登录注册效果 */
        function materialButton(){
            $(".material-button").click(function() {

                if ($(this).hasClass('material-button')) {
                    setTimeout(function() {
                        $(".overbox").css({
                            "overflow": "hidden"
                        })
                        $(".box").addClass("back");
                    }, 200)
                    $(this).addClass('active').animate({
                        "width": "700px",
                        "height": "700px"
                    }).attr('title','返回登录');

                    setTimeout(function() {
                        $(".shape").css({
                            "width": "50%",
                            "height": "50%",
                            "-webkit-transform": "rotate(45deg)",
                            "-moz-transform": "rotate(45deg)",
                            "-ms-transform": "rotate(45deg)",
                            "transform": "rotate(45deg)"
                        })

                        $(".overbox .title").fadeIn(300);
                        $(".overbox .input-box").fadeIn(300);
                        //$(".overbox .button").fadeIn(300);
                        $(".overbox .logo-box").fadeIn(300);
                        $(".overbox .title-list").fadeIn(300);
                    }, 700)

                    $(this).removeClass('material-button');

                }

                if ($(".alt-2").hasClass('material-buton')) {
                    $(".alt-2").removeClass('material-buton');
                    $(".alt-2").addClass('material-button');
                }

            });
        };
        $(".input input").focus(function() {

            $(this).parent(".input").each(function() {
                $(".input-label", this).css({
                    "line-height": "16px",
                    "font-size": "12px",
                    "font-weight": "100",
                    "top": "0px"
                })
                $(".spin", this).css({
                    "width": "100%"
                })
            });
        }).blur(function() {
            $(".spin").css({
                "width": "0px"
            })
            if ($(this).val() == "") {
                $(this).parent(".input").each(function() {
                    $(".input-label", this).css({
                        "line-height": "44px",
                        "font-size": "16px",
                        "font-weight": "300",
                        "top": "12px"
                    })
                });

            }
        });

        /*$(".button").click(function(e) {
            var pX = e.pageX,
                pY = e.pageY,
                oX = parseInt($(this).offset().left),
                oY = parseInt($(this).offset().top);

            $(this).append('<span class="click-efect x-' + oX + ' y-' + oY + '" style="margin-left:' + (pX - oX) + 'px;margin-top:' + (pY - oY) + 'px;"></span>')
            $('.x-' + oX + '.y-' + oY + '').animate({
                "width": "820px",
                "height": "820px",
                "top": "-410px",
                "left": "-410px",

            }, 600);
            $("button", this).addClass('active');
        })*/

        $(".alt-2").click(function() {
            if (!$(this).hasClass('material-button')) {
                $(".shape").css({
                    "width": "100%",
                    "height": "100%",
                    "transform": "rotate(0deg)"
                })

                setTimeout(function() {
                    $(".overbox").css({
                        "overflow": "initial"
                    })
                }, 600)

                $(this).animate({
                    "width": "80px",
                    "height": "80px"
                }, 500, function() {
                    $(".box").removeClass("back");

                    $(this).removeClass('active')
                }).attr('title','注册');

                $(".overbox .title").fadeOut(300);
                $(".overbox .input-box").fadeOut(300);
                //$(".overbox .button").fadeOut(300);
                $(".overbox .logo-box").fadeOut(300);
                $(".overbox .title-list").fadeOut(300);

                setTimeout(function(){//默认显示注册界面时需要用，返回登录界面时仍然可以点击进入注册界面
                    
                        $(".alt-2").removeClass('material-buton');
                        $(".alt-2").addClass('material-button');
                    
                    materialButton();
                },1000);
                 
            }

        });

        materialButton();

        /*$(".material-button").click(function() {

            if ($(this).hasClass('material-button')) {
                setTimeout(function() {
                    $(".overbox").css({
                        "overflow": "hidden"
                    })
                    $(".box").addClass("back");
                }, 200)
                $(this).addClass('active').animate({
                    "width": "700px",
                    "height": "700px"
                }).attr('title','返回登录');

                setTimeout(function() {
                    $(".shape").css({
                        "width": "50%",
                        "height": "50%",
                        "transform": "rotate(45deg)"
                    })

                    $(".overbox .title").fadeIn(300);
                    $(".overbox .input-box").fadeIn(300);
                    //$(".overbox .button").fadeIn(300);
                    $(".overbox .logo-box").fadeIn(300);
                    $(".overbox .title-list").fadeIn(300);
                }, 700)

                $(this).removeClass('material-button');

            }

            if ($(".alt-2").hasClass('material-buton')) {
                $(".alt-2").removeClass('material-buton');
                $(".alt-2").addClass('material-button');
            }

        });*/
/*  登录注册效果 end */

    seajs.use(['dist/jquery.md5.min.js','dist/jquery.validate.min.js','dist/icheck.min.js'],function(){

        /* 密码登录 */
        $pwLoginForm.validate({
            rules:{
                name : {
                    required:true,
                    //contact:true
                },
                pass : {
                    required:true,
                    isLegalCharacter:true
                }
            },
            messages:{
                name : {
                    required:'请输入登录账号',
                    //contact:'请正确输入中国大陆11位手机号或常用邮箱'
                },
                pass : {
                    required:'请输入密码',
                    isLegalCharacter:'有奇怪的字符出现哦~'
                }
            },
            invalidHandler : function(){
                return false;
            },
            submitHandler : function() {
                pwName = $name.val();
                pwPass = $pass.val();
                remember = $rememberBtn.val();
                $submit = $pwLoginForm.find('button[type=submit]');
                param = {
                    name: pwName,
                    pass: $.md5(pwPass),
                    remember:remember
                };
                if($submit.attr('data_lock')){
                    return false;
                }
                $submit.attr('data_lock',1).addClass('disable').find('span').text('登录中...');
                $.ajax({
                    url :  $pwLoginForm.attr('action'),
                    type: 'post',
                    data: param,
                    dataType : 'json',
                    success: function(r){
                        message = r.message;
                        url = r.data.url;

                        if ( r.code == 0 ) {
                            //$pwLoginError.empty();
                            window.location.href = url;
                        } else {
                            //$pwLoginError.empty().text(message);
                            ajax_message(message);
                        }
                    },
                    error: function(){
                        //$pwLoginError.empty().text('未知网络错误');
                        ajax_message(errorHtml);
                    },
                    complete:function(){
                        $submit.removeAttr('data_lock').removeClass('disable').find('span').text('登 录'); 
                    }
                });
                return false;
            }
        });
        $rememberBtn.on('ifUnchecked',function(){
            $(this).attr('value',0);
        });
        $rememberBtn.on('ifChecked',function(){
            $(this).attr('value',1);
        });
        /* 手机动态码登录 */
        $msgLoginForm.validate({
            rules:{
                phone : {
                    required:true,
                    mobile:true
                },
                code : {
                    required:true,
                    isLegalCharacter:true
                }
            },
            messages:{
                phone : {
                    required:'请输入手机号',
                    mobile:'请正确输入中国大陆11位手机号'
                },
                code : {
                    required:'请输入验证码',
                    isLegalCharacter:'有奇怪的字符出现哦~'
                }
            },
            invalidHandler : function(){
                return false;
            },
            submitHandler : function() {
                param = $msgLoginForm.serialize();
                $submit = $msgLoginForm.find('button[type=submit]');
                if($submit.attr('data_lock')){
                    return false;
                }
                $submit.attr('data_lock',1).addClass('disable').find('span').text('登录中...');
                $.ajax({
                    url :  $msgLoginForm.attr('action'),
                    type: 'post',
                    data: param,
                    dataType : 'json',
                    success: function(r){
                        message = r.message,
                        url = r.data.url;

                        if ( r.code == 0 ) {
                            //$msgLoginError.empty();
                            window.location.href = url;
                        } else {
                            //$msgLoginError.empty().text(message);
                            ajax_message(message);
                        }
                    },
                    error: function(){
                        //$msgLoginError.empty().text('未知网络错误');
                        ajax_message(errorHtml);
                    },
                    complete:function(){
                        $submit.removeAttr('data_lock').removeClass('disable').find('span').text('登 录'); 
                    }
                });
                return false;
            }
        });
        //获取手机验证码方法
        $getCodeBtn.off('click').on('click',function(){
            var $t = $(this);
            url = $t.attr('action-url');
            val = $phone.val();
            regPattern = /^1\d{10}$/;//校验手机号
            pureContent = val.replace(regAllSpace,"");//把所有空格去掉
            isMobile = regPattern.test(val);
            result = $('#phone-error').text();
            $phone.off('keyup').on('keyup',function(){
                var $self = $(this),
                    mobileVal = $self.val(),
                    pureVal = mobileVal.replace(regAllSpace,""),
                    errorTxt = $codeErrorWrap.text();
                if(pureVal != "" && errorTxt == '请输入手机号'){
                    $codeErrorWrap.empty();
                }
            });
            if(pureContent.length == 0){
                $codeErrorWrap.text('请输入手机号');
                return false;
            }else{
                $codeErrorWrap.empty();
            }
            if(!isMobile){
                return false;
            }
            

            if ($t.attr('data_lock')){ 
                return false;
            }
            $t.attr('data_lock',1).addClass('disable');
            i = 60; 
            function fun() { 
                if (i == 0) { 
                    removeData();
                    clearInterval(intervalid);
                    return false; 
                } 
                strText = i+'秒后重新获取';
                $t.text(strText);
                i--; 
            };
            intervalid = setInterval(fun, 1000); 
            function removeData(){
                $t.removeAttr('data_lock').removeClass('disable').text('获取验证码');
            };
            fun();//执行倒计时
            $.ajax({
                url:url,
                type:'post',
                data:{'phone':val},
                dataType:'json',
                success:function(r){
                    if(r.code==0){
                        $codeErrorWrap.text(r.message);
                    }else{
                        $codeErrorWrap.text(r.message);
                        return false;
                    }
                    
                },
                error: function(){
                    ajax_message(errorHtml);
                }
            });
            
            return false;
        });
        /* 个人注册 */
        var $regRead = $('#regRead'),
            $perRegSub = $('#perRegSub'),
            SubHasDisAbled = $perRegSub.is(':disabled'),
            $regGroupRead = $('#regGroupRead'),
            $groupRegSub = $('#groupRegSub'),
            groupHasDisAbled = $groupRegSub.is(':disabled'),
            $sjRegRead = $('#sjRegRead'),
            $sjRegSub = $('#sjRegSub'),
            sjHasDisAbled = $sjRegSub.is(':disabled');
        $regRead.on('ifUnchecked',function(){
            if(!SubHasDisAbled){
                $perRegSub.attr('disabled','disabled').addClass('disable');
            }
        });
        $regRead.on('ifChecked',function(){
            $perRegSub.removeAttr('disabled').removeClass('disable');
        });
        $perRegForm.validate({
            rules:{
                regname:{
                    required:true,
                    contact:true,
                    remote: {
                        url: "/user/validate_regname",
                        type:"post",
                        data:{"regname":function() { return $("#regname").val(); }}
                    }
                },
                regpass:{
                    required:true,
                    minlength:6,
                    maxlength:128,
                    regexPassword:true,
                    isLegalCharacter:true
                },
                reregpass:{
                    required:true,
                    equalTo:'#regpass',
                    isLegalCharacter:true
                },
                captcha_code:{
                    required:true,
                    isLegalCharacter:true
                }
            },
            messages:{
                regname:{
                    required:'请填写中国大陆11位手机号或常用邮箱',
                    contact:'确定这是个手机号或邮箱...',
                    remote: '手机号或者邮箱已被注册，请更换手机号或者邮箱'
                },
                regpass:{
                    required:'请输入密码',
                    minlength: $.validator.format('密码太短了哦~'),
                    maxlength: $.validator.format('真的以为能写这么长吗？naive~请勿超过{0}位~'),
                    regexPassword: '密码至少有一个字母一个数字',
                    isLegalCharacter:'有奇怪的字符出现哦~'
                },
                reregpass:{
                    required:'请再次输入密码',
                    equalTo: '两次输入密码不一致',
                    isLegalCharacter:'有奇怪的字符出现哦~'
                },
                captcha_code:{
                    required:'请输入验证码',
                    isLegalCharacter:'有奇怪的字符出现哦~'
                }
            },
            invalidHandler : function(){
                return false;
            },
            submitHandler : function() {
                $submit = $perRegForm.find('button[type=submit]');
                if($submit.attr('data_lock')){
                    return false;
                }
                $submit.attr('data_lock',1).addClass('disable').find('span').text('提交中...');
                    param = {
                        regname:$('#regname').val(),
                        regpass:$.md5($('#regpass').val()),
                        reregpass:$.md5($('#reregpass').val()),
                        captcha_code:$('#captcha_code').val()
                    };
                    i = 60; 
                    function fun() { 
                        if (i == 0) { 
                            removeData();
                            clearInterval(intervalid);
                            return false; 
                        } 
                        strText = i+'秒后重新获取';
                        $getActCodeBtn.text(strText);
                        i--; 
                    }; 
                    function removeData(){
                        $getActCodeBtn.removeAttr('data_lock').removeClass('disable').text('重新获取验证码');
                    };
                $.ajax({
                    url :  $perRegForm.attr('action'),
                    type: 'post',
                    data: param,
                    dataType: 'json',
                    success: function(r){
                        //console.log(r);
                        if ( r.code == 0 ) {
                            //$perRegError.empty();
                            //isEmail = r.data.is_email;
                            //$perRegForm.hide();
                            $perRegReset.click();
                            $token.val(r.data.token);
                            $regUserID.val(r.data.uid);
                            $qnUrl.val(r.data.qn_url);
                            $perRegInfoBox.show();
                            /*if(isEmail == 1){//如果账号是邮箱
                                $regmail.val(r.data.regname);
                                $emailActBox.show();
                                //绑定邮箱跳转方法
                                $activateEmlNow.off('click').on('click',function(){
                                    window.location.href = r.data.isp;
                                    return false;
                                });
                            }else{//如果账号是手机号码
                                $mobnumber.val(r.data.regname);
                                $mobActBox.show();
                                //执行倒计时
                                intervalid = setInterval(fun, 1000);
                                fun();
                            }*/
                        } else {
                            //$perRegError.empty().text(r.message);
                            ajax_message(r.message);
                        }
                        
                        $regCodeBtn.click();//更换验证码
                        
                    },
                    error: function(){
                        //$perRegError.empty().text('未知网络错误！');
                        ajax_message(errorHtml);
                    },
                    complete:function(){
                        $submit.removeAttr('data_lock').removeClass('disable').find('span').text('下一步'); 
                    }
                });
                return false;
            }
        });
        /* 个人注册完善信息 */
        selectSchoolAct();//执行搜索学校方法
        popToggle.init();
        $regSexBox.off('click','.js_reg_sex_btn').on('click','.js_reg_sex_btn',function(){
            var $t = $(this);
            $regSexBtn.removeClass('active');
            $t.addClass('active');
            val = $t.attr('action-val');
            $regSexVal.attr('value',val);
        });
        $perRegInfoForm.validate({
            rules:{
                nickname:{
                    required:true,
                    isLegalCharacter:true,
                    /*remote: {
                        url: "/user/ajax_check_nickname",
                        type:"post",
                        data:{"nickname":function() { return $("#regnickname").val(); }}
                    },*/
                    rangelength : [2,20]
                },
                univs_name : {
                    required : true,
                    isLegalCharacter:true
                }
            },
            messages:{
                nickname:{
                    required:'请输入姓名',
                    //remote: '该昵称已被占用，请输入另一个昵称',
                    rangelength:jQuery.validator.format("请输入 {0} 到 {1} 个字符"),
                },
                univs_name : {
                    required : '请输入学校'
                }
            },
            invalidHandler : function(){
                return false;
            },
            submitHandler : function(){
                param = $perRegInfoForm.serialize();
                i = 60; 
                function fun() { 
                    if (i == 0) { 
                        removeData();
                        clearInterval(intervalid);
                        return false; 
                    } 
                    strText = i+'秒后重新获取';
                    $getActCodeBtn.text(strText);
                    i--; 
                }; 
                function removeData(){
                    $getActCodeBtn.removeAttr('data_lock').removeClass('disable').text('重新获取验证码');
                };
                $submit = $perRegInfoForm.find('button[type=submit]');
                if($submit.attr('data_lock')){
                    return false;
                }
                $submit.attr('data_lock',1).addClass('disable').find('span').text('注册中...');
                $.ajax({
                    url :  $perRegInfoForm.attr('action'),
                    type: 'post',
                    data: param,
                    dataType: 'json',
                    success: function(r){
                        //console.log(r);
                        if ( r.code == 0 ) {
                            isEmail = r.data.is_email;
                            $('#perRegInfoReset').click();

                            if(isEmail == 1){//如果账号是邮箱
                                $regmail.val(r.data.regname);
                                $emailActBox.show();
                                //绑定邮箱跳转方法
                                $activateEmlNow.off('click').on('click',function(){
                                    window.location.href = r.data.isp;
                                    return false;
                                });
                            }else{//如果账号是手机号码
                                $mobnumber.val(r.data.regname);
                                $mobActBox.show();
                                //执行倒计时
                                intervalid = setInterval(fun, 1000);
                                fun();
                            }
                        } else {
                            //$perRegError.empty().text(r.message);
                            ajax_message(r.message);
                        }
                        
                    },
                    error: function(){
                        //$perRegError.empty().text('未知网络错误！');
                        ajax_message(errorHtml);
                    },
                    complete:function(){
                        $submit.removeAttr('data_lock').removeClass('disable').find('span').text('注 册'); 
                    }
                });
                return false;
            }
        });

        /* 组织注册 */
        $regGroupRead.on('ifUnchecked',function(){
            if(!groupHasDisAbled){
                $groupRegSub.attr('disabled','disabled').addClass('disable');
            }
        });
        $regGroupRead.on('ifChecked',function(){
            $groupRegSub.removeAttr('disabled').removeClass('disable');
        });

        $groupRegForm.validate({
            rules:{
                regname:{
                    required:true,
                    email:true,
                    remote: {
                        url: "/user/validate_regname",
                        type:"post",
                        data:{"regname":function() { return $("#groupname").val(); }}
                    }
                },
                regpass:{
                    required:true,
                    minlength:6,
                    maxlength:128,
                    regexPassword:true,
                    isLegalCharacter:true
                },
                reregpass:{
                    required:true,
                    equalTo:'#grouppass',
                    isLegalCharacter:true
                },
                captcha_code:{
                    required:true,
                    isLegalCharacter:true
                }
            },
            messages:{
                regname:{
                    required:'请填写常用邮箱',
                    email:'确定这是个邮箱...',
                    remote: '邮箱已被注册，请更换邮箱'
                },
                regpass:{
                    required:'请输入密码',
                    minlength: $.validator.format('密码太短了哦~'),
                    maxlength: $.validator.format('真的以为能写这么长吗？naive~请勿超过{0}位~'),
                    regexPassword: '密码至少有一个字母一个数字',
                    isLegalCharacter:'有奇怪的字符出现哦~'
                },
                reregpass:{
                    required:'请再次输入密码',
                    equalTo: '两次输入密码不一致',
                    isLegalCharacter:'有奇怪的字符出现哦~'
                },
                captcha_code:{
                    required:'请输入验证码',
                    isLegalCharacter:'有奇怪的字符出现哦~'
                }
            },
            invalidHandler : function(){
                return false;
            },
            submitHandler : function() {
                param = {
                    regname:$('#groupname').val(),
                    regpass:$.md5($('#grouppass').val()),
                    reregpass:$.md5($('#regrouppass').val()),
                    captcha_code:$('#group_captcha_code').val()
                };
                $submit = $groupRegForm.find('button[type=submit]');
                if($submit.attr('data_lock')){
                    return false;
                }
                $submit.attr('data_lock',1).addClass('disable').find('span').text('注册中...');
                $.ajax({
                    url :  $groupRegForm.attr('action'),
                    type: 'post',
                    data: param,
                    dataType: 'json',
                    success: function(r){
                        //console.log(r);
                        if ( r.code == 0 ) {
                            //$groupRegError.empty();
                            //window.location.href=r.data.url;
                            //$groupRegForm.hide();
                            $groupRegReset.click();
                            
                            $regmail.val(r.data.regname);
                            $emailActBox.show();
                            //绑定邮箱跳转方法
                            $activateEmlNow.off('click').on('click',function(){
                                window.location.href = r.data.isp;
                                return false;
                            });
                        } else {
                            //$groupRegError.empty().text(r.message);
                            ajax_message(r.message);
                        }
                        
                        $groupCodeBtn.click();//更换验证码
                        
                    },
                    error: function(){
                        //$groupRegError.empty().text('未知网络错误！');
                        ajax_message(errorHtml);
                    },
                    complete:function(){
                        $submit.removeAttr('data_lock').removeClass('disable').find('span').text('注 册'); 
                    }
                });
                return false;
            }
        });

        /* 社交账号注册 */
        $sjRegRead.on('ifUnchecked',function(){
            if(!sjHasDisAbled){
                $sjRegSub.attr('disabled','disabled').addClass('disable');
            }
        });
        $sjRegRead.on('ifChecked',function(){
            $sjRegSub.removeAttr('disabled').removeClass('disable');
        });
        $sjRegForm.validate({
            rules:{
                nickname:{
                    required:true,
                    isLegalCharacter:true
                },
                nick_code:{
                    required:true,
                    isLegalCharacter:true
                }
            },
            messages:{
                nickname:{
                    required:'请填写社交账号昵称',
                    isLegalCharacter:'有奇怪的字符出现哦~'
                },
                nick_code:{
                    required:'请输入验证码',
                    isLegalCharacter:'有奇怪的字符出现哦~'
                }
            },
            invalidHandler : function(){
                return false;
            },
            submitHandler : function() {
                param = $sjRegForm.serialize();
                $submit = $sjRegForm.find('button[type=submit]');
                if($submit.attr('data_lock')){
                    return false;
                }
                $submit.attr('data_lock',1).addClass('disable').find('span').text('注册中...');
                $.ajax({
                    url :  $sjRegForm.attr('action'),
                    type: 'post',
                    data: param,
                    dataType: 'json',
                    success: function(r){
                        if ( r.code == 0 ) {
                            window.location.href=r.data.url;
                        } else {
                            ajax_message(r.message);
                        }
                    },
                    error: function(){
                        ajax_message(errorHtml);
                    },
                    complete:function(){
                        $submit.removeAttr('data_lock').removeClass('disable').find('span').text('注 册'); 
                    }
                });
                return false;
            }
        });

        /* 找回密码 */
        $findpwBtn.off('click').on('click',function(){
            $findpwBox.fadeIn();
            $material.hide();
        });
        $findpwForm.validate({
            rules:{
                mobemail:{
                    required:true,
                    contact:true
                },
                security_code:{
                    required:true,
                    isLegalCharacter:true
                }
            },
            messages:{
                mobemail:{
                    required:'请填写注册账号',
                    contact:'请正确输入中国大陆11位手机号或常用邮箱'
                },
                security_code:{
                    required:'请输入验证码',
                    isLegalCharacter:'有奇怪的字符出现哦~'
                }
            },
            invalidHandler : function(){
                return false;
            },
            submitHandler : function() {
                param = $findpwForm.serialize();
                url = $findpwForm.attr('action');

                $submit = $findpwForm.find('button[type=submit]');
                if($submit.attr('data_lock')){
                    return false;
                }
                $submit.attr('data_lock',1).addClass('disable').find('span').text('发送中...');
                
                $.ajax({
                    url :  url,
                    type: 'post',
                    data: param,
                    dataType: 'json',
                    /*beforeSend:function(){
                        $t.addClass('disable').text('发送中...').attr('disabled','disabled'); 
                    },*/
                    complete:function(){
                        $submit.removeAttr('data_lock').removeClass('disable').find('span').text('获取验证码');
                    },
                    success: function(r){
                        //console.log(r);
                        if ( r.code == 0 ) {
                            window.location.href=r.data.url;
                        } else {
                            ajax_message(r.message);
                        }
                        
                        $findCodeBtn.click();//更换验证码
                        
                    },
                    error: function(){
                        ajax_message(errorHtml);
                    }
                });
                return false;
            }
        });
        /* 重新发送邮件方法 */
        $reSendEmail.off('click').on('click',function(){
            var $t = $(this);
            url = $t.attr('action-url');
            if ($t.attr('data_lock')) return false;
            $t.attr('data_lock',1);
            param = {"email" : $('#regmail').val()};
            $.ajax({
                url : url,
                type: 'get',
                dataType : 'json',
                data : param,
                beforeSend:function(){
                    $reSendTip.empty().removeClass('error').addClass('success').text('邮件已发送，60秒后才能再点击发送'); 
                },
                complete : function(){
                    setTimeout(function(){
                        $t.removeAttr('data_lock');
                    },60000);
                },
                success : function(r){
                    if(r.code == 0){
                        $reSendTip.empty().removeClass('error').addClass('success').text('邮件发送成功');
                    }else{
                        $reSendTip.empty().removeClass('success').addClass('error').text(r.message);
                    }
                },
                error : function(){
                    ajax_message(errorHtml);
                }
            });
        });
        /* 手机账号激活获取验证码方法 */
        $getActCodeBtn.off('click').on('click',function(){
            var $t = $(this);
            url = $t.attr('action-url');
            val = $mobnumber.val();
            regPattern = /^1\d{10}$/;//校验手机号
            pureContent = val.replace(regAllSpace,"");//把所有空格去掉
            isMobile = regPattern.test(val);
            
            if(!isMobile){
                return false;
            }
            

            if ($t.attr('data_lock')){ 
                return false;
            }
            $t.attr('data_lock',1).addClass('disable');
            i = 60; 
            function fun() { 
                if (i == 0) { 
                    removeData();
                    clearInterval(intervalid);
                    return false; 
                } 
                strText = i+'秒后重新获取';
                $t.text(strText);
                i--; 
            };
            intervalid = setInterval(fun, 1000); 
            function removeData(){
                $t.removeAttr('data_lock').removeClass('disable').text('获取验证码');
            };
            fun();//执行倒计时
            $.ajax({
                url:url,
                type:'post',
                data:{'phone':val},
                dataType:'json',
                success:function(r){
                    if(r.code==0){
                        $t.parent().find('.js_error_wrap').text(r.message);
                    }else{
                        $t.parent().find('.js_error_wrap').text(r.message);
                        return false;
                    }
                    
                },
                error: function(){
                    ajax_message(errorHtml);
                }
            });
            
            return false;
        });
        /* 手机账号激活 */
        $mobActForm.validate({
            rules:{
                code:{
                    required:true,
                    isLegalCharacter:true
                }
            },
            messages:{
                code:{
                    required:'请输入验证码',
                    isLegalCharacter:'有奇怪的字符出现哦~'
                }
            },
            invalidHandler : function(){
                return false;
            },
            submitHandler : function() {
                param = $mobActForm.serialize();
                $submit = $mobActForm.find('button[type=submit]');
                if($submit.attr('data_lock')){
                    return false;
                }
                $submit.attr('data_lock',1).addClass('disable').find('span').text('提交中...');
                $.ajax({
                    url :  $mobActForm.attr('action'),
                    type: 'post',
                    data: param,
                    dataType: 'json',
                    success: function(r){
                        if ( r.code == 0 ) {
                            window.location.href=r.data.url;
                        } else {
                            ajax_message(r.message);
                        }
                    },
                    error: function(){
                        ajax_message(errorHtml);
                    },
                    complete:function(){
                        $submit.removeAttr('data_lock').removeClass('disable').find('span').text('立即激活');
                    }
                });
                return false;
            }
        });
        /* 手机重置密码*/
        $mobResetForm.validate({
            rules:{
                newpass:{
                    required:true,
                    minlength:6,
                    maxlength:128,
                    regexPassword:true,
                    isLegalCharacter:true
                },
                resetcode:{
                    required:true,
                    isLegalCharacter:true
                }
            },
            messages:{
                newpass:{
                    required:'请输入新密码',
                    minlength: $.validator.format('密码太短了哦~'),
                    maxlength: $.validator.format('真的以为能写这么长吗？naive~请勿超过{0}位~'),
                    regexPassword: '密码至少有一个字母一个数字',
                    isLegalCharacter:'有奇怪的字符出现哦~'
                },
                resetcode:{
                    required:'请输入验证码',
                    isLegalCharacter:'有奇怪的字符出现哦~'
                }
            },
            invalidHandler : function(){
                return false;
            },
            submitHandler : function() {
                //param = $mobResetForm.serialize();
                param = {
                    phone : $mobResetNumber.val(),
                    newpass : $.md5($mobNewPass.val()),
                    resetcode: $reMobCode.val()
                };
                url = $mobResetForm.attr('action');
                $submit = $mobActForm.find('button[type=submit]');
                if($submit.attr('data_lock')){
                    return false;
                }
                $submit.attr('data_lock',1).addClass('disable').find('span').text('提交中...');
                $.ajax({
                    url : url,
                    type: 'post',
                    data: param,
                    dataType: 'json',
                    success: function(r){
                        if ( r.code == 0 ) {
                            window.location.href=r.data.url;
                        } else {
                            ajax_message(r.message);
                        }
                        
                    },
                    error: function(){
                        ajax_message(errorHtml);
                    },
                    complete:function(){
                        $submit.removeAttr('data_lock').removeClass('disable').find('span').text('重置密码');
                    }
                });
                return false;
            }
        });
        /* 手机密码重置获取验证码方法 */
        $reMobGetCodeBtn.off('click').on('click',function(){
            var $t = $(this);
            url = $t.attr('action-url');
            val = $mobResetNumber.val();
            regPattern = /^1\d{10}$/;//校验手机号
            pureContent = val.replace(regAllSpace,"");//把所有空格去掉
            isMobile = regPattern.test(val);
            
            if(!isMobile){
                return false;
            }
            

            if ($t.attr('data_lock')){ 
                return false;
            }
            $t.attr('data_lock',1).addClass('disable');
            i = 60; 
            function fun() { 
                if (i == 0) { 
                    removeData();
                    clearInterval(intervalid);
                    return false; 
                } 
                strText = i+'秒后重新获取';
                $t.text(strText);
                i--; 
            };
            intervalid = setInterval(fun, 1000); 
            function removeData(){
                $t.removeAttr('data_lock').removeClass('disable').text('获取验证码');
            };
            fun();//执行倒计时
            $.ajax({
                url:url,
                type:'post',
                data:{'mobemail':val},
                dataType:'json',
                success:function(r){
                    if(r.code==0){
                        $t.parent().find('.js_error_wrap').text(r.message);
                    }else{
                        $t.parent().find('.js_error_wrap').text(r.message);
                        return false;
                    }
                    
                },
                error: function(){
                    ajax_message(errorHtml);
                }
            });
            
            return false;
        });
        /* 邮箱重置密码 */
        $emailResetForm.validate({
            rules:{
                newpass:{
                    required:true,
                    minlength:6,
                    maxlength:128,
                    regexPassword:true,
                    isLegalCharacter:true
                },
                resetcode:{
                    required:true,
                    isLegalCharacter:true
                }
            },
            messages:{
                newpass:{
                    required:'请输入新密码',
                    minlength: $.validator.format('密码太短了哦~'),
                    maxlength: $.validator.format('真的以为能写这么长吗？naive~请勿超过{0}位~'),
                    regexPassword: '密码至少有一个字母一个数字',
                    isLegalCharacter:'有奇怪的字符出现哦~'
                },
                resetcode:{
                    required:'请输入验证码',
                    isLegalCharacter:'有奇怪的字符出现哦~'
                }
            },
            invalidHandler : function(){
                return false;
            },
            submitHandler : function() {
                //param = $emailResetForm.serialize();
                url = $emailResetForm.attr('action');
                param = {
                    email : $emailAddress.val(),
                    newpass : $.md5($emailNewPass.val()),
                    resetcode: $reEmailCode.val()
                };
                $submit = $emailResetForm.find('button[type=submit]');
                if($submit.attr('data_lock')){
                    return false;
                }
                $submit.attr('data_lock',1).addClass('disable').find('span').text('提交中...');
                $.ajax({
                    url : url,
                    type: 'post',
                    data: param,
                    dataType: 'json',
                    success: function(r){
                        if ( r.code == 0 ) {
                            window.location.href=r.data.url;
                        } else {
                            ajax_message(r.message);
                        }
                        
                    },
                    error: function(){
                        ajax_message(errorHtml);
                    },
                    complete:function(){
                        $submit.removeAttr('data_lock').removeClass('disable').find('span').text('重置密码');
                    }
                });
                return false;
            }
        });
        /* 邮箱密码重置获取验证码方法 */
        $reEmailGetCodeBtn.off('click').on('click',function(){
            var $t = $(this);
            url = $t.attr('action-url');
            val = $emailAddress.val();
            

            if ($t.attr('data_lock')){ 
                return false;
            }
            $t.attr('data_lock',1).addClass('disable');
            i = 60; 
            function fun() { 
                if (i == 0) { 
                    removeData();
                    clearInterval(intervalid);
                    return false; 
                } 
                strText = i+'秒后重新获取';
                $t.text(strText);
                i--; 
            };
            intervalid = setInterval(fun, 1000); 
            function removeData(){
                $t.removeAttr('data_lock').removeClass('disable').text('获取验证码');
            };
            fun();//执行倒计时
            $.ajax({
                url:url,
                type:'post',
                data:{'mobemail':val},
                dataType:'json',
                success:function(r){
                    if(r.code==0){
                        $t.parent().find('.js_error_wrap').text(r.message);
                    }else{
                        $t.parent().find('.js_error_wrap').text(r.message);
                        return false;
                    }
                    
                },
                error: function(){
                    ajax_message(errorHtml);
                }
            });
            
            return false;
        });
        function qiniu_upload(f, token){//七牛上传方法
            url = "http://up.qiniu.com/putb64/-1"; 
            xhr = new XMLHttpRequest();
            pic = f;
            xhr.onreadystatechange=function(){
                if (xhr.readyState==4){
                    blkRet = JSON.parse(xhr.responseText);
                    //console.log(blkRet);
                    key = blkRet.key;
                    qnUrl = $qnUrl.val();
                    imgUrl = qnUrl+key;
                    $uploadSub.text('提交');
                    $userHeadImg.attr('src',imgUrl);
                    $userHeadImgInp.attr('value',imgUrl);
                    $popModifyHeadImg.fadeOut();
                    $popMask.fadeOut();
                }
            }
            xhr.open("POST", url, true); 
            xhr.setRequestHeader("Content-Type", "application/octet-stream"); 
            xhr.setRequestHeader("Authorization", "UpToken "+token); 
            xhr.send(pic);
        };
        // 上传头像
        // js template #J_cropit
        seajs.use('dist/jquery.cropit.js',function(){
            function initCropitPanel(image){
                if($popModifyHeadImgContent[0] && $popModifyHeadImgTpl[0]){
                    $popModifyHeadImgContent[0].innerHTML = $popModifyHeadImgTpl[0].innerHTML;
                }
                
                $popModifyHeadImg.fadeIn();
                $popMask.fadeIn();
                $imageEditor = $('#imageEditor');
                $uploadSub = $('#uploadSub');
                $imageEditor.cropit({
                    smallImage: 'stretch',
                    minZoom: 'fill',
                    imageBackground: true,
                    imageState: {
                        src: image
                    }
                });
                $uploadSub.off('click').on('click',function(){
                    var $t = $(this);
                    imageData = $imageEditor.cropit('export');
                    //console.log(imageData);
                    postData = imageData.split(',')[1];
                    token = $token.val();
                    //console.log(postData);
                    $t.text('上传中...');
                    qiniu_upload(postData,token);
                    return false;
                });
            };

            // 读取图片
            function loadFileReader(file) {

                var fileReader = new FileReader();

                if (file && file.type.match('image')) {
                    fileReader.readAsDataURL(file);
                    fileReader.onload=function(e){
                        initCropitPanel(this.result); // 初始化头像弹框
                    }
                } else if (file) {
                    console.log('load image file error');
                }
            };

            // 点击修改头像
            $('#J_cropitFileInput').off('change').on('change',function(){
                file = this.files[0];
                loadFileReader( file ); // reader file
            });
        });
    });
});

})();