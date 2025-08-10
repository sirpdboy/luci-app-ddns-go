![hello](https://views.whatilearened.today/views/github/sirpdboy/deplives.svg) [![](https://img.shields.io/badge/TG群-点击加入-FFFFFF.svg)](https://t.me/joinchat/AAAAAEpRF88NfOK5vBXGBQ)

<h1 align="center">
  <br>DDNS GO<br>
</h1>

  <p align="center">

  <a target="_blank" href="https://github.com/sirpdboy/luci-app-ddns-go/releases">
    <img src="https://img.shields.io/github/release/sirpdboy/luci-app-ddns-go.svg?style=flat-square&label=ddns-go&colorB=green">
  </a>
</p>

[中文] | [English](README.md) 

![screenshots](https://raw.githubusercontent.com/sirpdboy/openwrt/master/doc/说明1.jpg)

请 **认真阅读完毕** 本页面，本页面包含注意事项和如何使用。

## 功能说明：

### ddns-go动态域名插件
#### 自动获得你的公网 IPv4 或 IPv6 地址，并解析到对应的域名服务。

<!-- TOC -->

- [ddns-go](#ddns-go)
  - [版本](#版本说明)
  - [特性](#特性)
  - [使用方法](#使用方法)
  - [说明](#说明)
  - [界面](#界面)
  - [捐助](#捐助)

<!-- /TOC -->

## 版本说明

## 2025.5.14  luci-app-ddns-go 1.5.2
## 2025.5.12  luci-app-ddns-go 1.5.1
- 更新日志：
- 适配最新OPENWRT24.10，JS版本。老版18.06用LUA分支。


## 特性

- 支持Mac、Windows、Linux系统，支持ARM、x86架构
- 支持的域名服务商 `Alidns(阿里云)` `Dnspod(腾讯云)` `Cloudflare` `华为云` `Callback` `百度云` `porkbun` `GoDaddy`
- 支持接口/网卡获取IP
- 支持以服务的方式运行
- 默认间隔5分钟同步一次
- 支持多个域名同时解析，公司必备
- 支持多级域名
- 网页中配置，简单又方便，可设置 `登录用户名和密码` / `禁止从公网访问`
- 网页中方便快速查看最近50条日志，不需要跑docker中查看
- 支持webhook通知
- 支持TTL
- 支持部分dns服务商传递自定义参数，实现地域解析等功能

## 使用方法

- 将luci-app-ddns-go添加至 LEDE/OpenWRT 源码的方法。

### 下载源码方法:

 ```Brach
 
    # 下载源码
	
    git clone https://github.com/sirpdboy/luci-app-ddns-go.git package/ddns-go
    make menuconfig
	
 ``` 
### 配置菜单

 ```Brach
    make menuconfig
	# 找到 LuCI -> Applications, 选择 luci-app-ddns-go, 保存后退出。
 ``` 
 
### 编译

 ```Brach 
    # 编译固件
    make package/ddns-go/luci-app-ddns-go/compile V=s
 ```

## 说明

- 源码来源：https://github.com/sirpdboy/luci-app-ddns-go
- 源码来源：https://github.com/jeessy2/ddns-go.git
- 你可以随意使用其中的源码，但请注明出处。


## 使用与授权相关说明
 
- 本人开源的所有源码，任何引用需注明本处出处，如需修改二次发布必告之本人，未经许可不得做于任何商用用途。


# My other project

- 路由安全看门狗 ：https://github.com/sirpdboy/luci-app-watchdog
- 网络速度测试 ：https://github.com/sirpdboy/luci-app-netspeedtest
- 计划任务插件（原定时设置） : https://github.com/sirpdboy/luci-app-taskplan
- 关机功能插件 : https://github.com/sirpdboy/luci-app-poweroffdevice
- opentopd主题 : https://github.com/sirpdboy/luci-theme-opentopd
- kucat酷猫主题: https://github.com/sirpdboy/luci-theme-kucat
- kucat酷猫主题设置工具: https://github.com/sirpdboy/luci-app-kucat-config
- NFT版上网时间控制插件: https://github.com/sirpdboy/luci-app-timecontrol
- 家长控制: https://github.com/sirpdboy/luci-theme-parentcontrol
- 定时限速: https://github.com/sirpdboy/luci-app-eqosplus
- 系统高级设置 : https://github.com/sirpdboy/luci-app-advanced
- ddns-go动态域名: https://github.com/sirpdboy/luci-app-ddns-go
- 进阶设置（系统高级设置+主题设置kucat/agron/opentopd）: https://github.com/sirpdboy/luci-app-advancedplus
- 网络设置向导: https://github.com/sirpdboy/luci-app-netwizard
- 一键分区扩容: https://github.com/sirpdboy/luci-app-partexp
- lukcy大吉: https://github.com/sirpdboy/luci-app-lukcy

## 捐助

![screenshots](https://raw.githubusercontent.com/sirpdboy/openwrt/master/doc/说明3.jpg)

|     <img src="https://img.shields.io/badge/-支付宝-F5F5F5.svg" href="#赞助支持本项目-" height="25" alt="图飞了"/>  |  <img src="https://img.shields.io/badge/-微信-F5F5F5.svg" height="25" alt="图飞了" href="#赞助支持本项目-"/>  | 
| :-----------------: | :-------------: |
|![xm1](https://raw.githubusercontent.com/sirpdboy/openwrt/master/doc/支付宝.png) | ![xm1](https://raw.githubusercontent.com/sirpdboy/openwrt/master/doc/微信.png) |

<a href="#readme">
    <img src="https://img.shields.io/badge/-返回顶部-orange.svg" alt="图飞了" title="返回顶部" align="right"/>
</a>

![](https://visitor-badge-deno.deno.dev/sirpdboy.sirpdboy.svg)  [![](https://img.shields.io/badge/TG群-点击加入-FFFFFF.svg)](https://t.me/joinchat/AAAAAEpRF88NfOK5vBXGBQ)
