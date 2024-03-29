# 中小企业培训+在线考试系统

**项目后端采用 Django + rest framework + postgresql + redis**
**项目前端采用 React + React Router 4.0 + Redux +dva+umi+ Ant Design**

**前端开发环境使用umi搭建,参考ant design pro 4.0**
**后端开发环境使用python3.6搭建**
**ide使用vs code,安装插件**


***

前言
### 功能模块
#### 运营管理用户：
  - 登录
  - 各模块数据管理
  - 用户角色和权限配置
  - 课程类型配置
  - 运营界面配置

#### 普通用户：
  - 登录,密码修改和重置(注册未实现,企业按照统一分配或其它方式,所以未实现)
  - 组织解构管理：
    - 组织上传(有关联数据后无法上传,只能增删改)
    - 组织结构增删改查
    - 组织解构指定培训管理员
  - 用户管理：
    - 用户上传(有关联数据后无法上传,只能增删改)
    - 用户改查
    - 用户根据自己角色可以登入不同前端界面
  - 角色管理
    - 主要三类角色：
      - 企业培训负责人(课程,试卷,组织结构,用户和课程、试卷授权管理)
      - 部门培训负责人(制定学习计划,考试计划,完成部门培训)
      - 接受培训人员(学习公开课,完成计划有要求的课程培训和考试)
    - 角色权限可以单独分配
  - 课程管理：
    - 上传课程
    - 直接增加课程(未实现)
    - 删改查
    - 课程授权给部门
    - 可以配置公开课,用户直接学习
    - 课程类型：pdf和MP4
  - 试卷管理：
    - 上传试卷
      -类型：单选题、多选题、判断题
    - 增删改查
    - 试卷授权给部门
    - 试题直接界面录入未完成
  - 培训群组管理
    - 部门培训管理可以管理本部门用户
    - 组成不同群组
    - 每个群组可以参加不能课程和考试
  -  公开课学习
    - 接受培训人员可以自己主动学习公开课程
  - 接口权限管理
    - 只用运营人员可以访问
    - 每个角色可以配置访问的接口
    - 每个接口可以根据角色进行数据过滤
    - 修改接口做了部分数据过滤,可能存在漏洞
    - 角色可以叠加(没有充分测试)
  - 通知消息管理
    - 可以创建通知消息，发送给用户，部门
    - 用户可以阅读自己通知消息
    - 通知消息状态：已读，未读，删除
  - 配信新闻管理
    - 发布培训新闻
    - 所有用户可以看到没有分级
  - 内置前端界面
    - 小批量使用可以不用nginx
    - 大批量用户前端配置到nginx
  - 运维界面配置
    - 配置字段和按钮的色彩
    - 实现侧边栏
 - 个人中心
    - 修改密码
    - 修改个人资料,头像
    - 查看自己通知消息


### 后端安装
  1. 安装postgresql 10.6或以上,在postgresql的amin客户端，创建一个数据库，记录下库名和密码。
  2. 安装python 3.6或3.7
  3. 配置python 虚拟环境； python -m venv trainvenv
  4. 在虚拟环境安装 pip install -r requirements.txt
     requirements.txt 需要整理,导出有多余的依赖包
  5. 下载工程文件到自己的目录
  6. 通过trainvenv/python/bin/activate 激活虚拟环境
  7. 安装redis，windows的版本 可以在github找
  8. 配置.evn文件内的
      DATABASE_URL=postgres://postgres:postgres@localhost:5432/whlrest
      REDIS_URL=redis://127.0.0.1:6379/1
  9. 在工程目录下：
     执行这个创建数据库表
     python manager.py makemigrations
     python manager.py migrate
     load预置数据
     python manager.py django-admin loaddata permissions/fixtures/*.json
  10. 运行：
     python manager.py runserver_plus "0.0.0.0:9000"
  11. 创建系统管理员：
     python manager.py createsuperuser
  12. 访问路径：
     运维界面：http://localhost:9000/admin
            可以配置企业培训负责人,其他用户可以导入
     用户界面：http://localhost:9000/front
     接口文档：http://localhost:9000/apidocs/swaggeryasg
              接口文档
  13.需要提供：
     用户、组织、课程、试卷等导入模板

```
