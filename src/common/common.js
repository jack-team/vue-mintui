/**
 * Created by jiangtao on 2017/5/18.
 */

import './../common/common.scss';
//字体文件
require('font-awesome-webpack');

import reqwest from 'reqwest';

import FastClick from "fastclick";

FastClick.attach(document.body);
console.log("init")

window.ajax = {
    get:function ( options ) {
        return reqwest({
            method:"get",
            type:"json",
            url:this.getUrl(options.url),
            data:options.data
        });
    },

    getUrl:function ( url ) {
        let api = "https://cnodejs.org/api/v1";
        return api + url;
    },

    post:function ( options ) {
        return reqwest({
            method:"post",
            type:"json",
            url:this.getUrl(options.url),
            data:options.data
        });
    }
};


window.getFormatTime = function ( time ) {
    let oldTme = new Date(time).getTime();
    let currentTime = new Date().getTime();
    let difference = currentTime - oldTme;
    const hours =  Math.floor( difference / 3600000 ),
          minut =  Math.floor( difference % 3600000 / 60000 ),
          days  = Math.floor(hours / 24);
    if( hours < 24 ) {
        return hours > 0 ? hours + '小时前' : minut + '分钟前';
    } else {
        if( days <= 30 ) {
            return days + '天前';
        } else {
            const mouth = Math.floor(days / 30);
            if(mouth < 12 ) {
                return  mouth + '个月前';
            } else {
               return Math.floor(mouth / 12 ) + '年前';
            }
        }
    }
};

window.screenHidden = function () {
  let screen = document.querySelector("#loader-screen");
    setTimeout(()=>{
        screen.classList.add("hide");
        setTimeout(()=>  screen.classList.add("none") , 200 );
    },500)
};

setTimeout( ()=>screenHidden() , 1000);

