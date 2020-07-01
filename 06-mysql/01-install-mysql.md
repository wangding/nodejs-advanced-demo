# 安装 MySQL

在 CentOS 7 bash 命令行下，安装 MySQL。

操作步骤如下：

```bash
# 下载并安装 MySQL 官方的 Yum Repository

wget -i -c http://dev.mysql.com/get/mysql57-community-release-el7-10.noarch.rpm

# yum 安装 mysql

sudo yum -y install mysql57-community-release-el7-10.noarch.rpm

# 安装 mysql 服务程序，这个步骤时间可能会比较长，取决于个人网速

sudo yum -y install mysql-community-server

# 启动数据库服务

sudo systemctl start mysqld.service

# 查看 MySQL 运行状态

sudo systemctl status mysqld.service

# 找到 mysql 初始的 root 用户密码

sudo grep "password" /var/log/mysqld.log

# 进入数据库 Shell 环境，修改 root 账户密码
# 注意，密码有复杂度要求，要记住改后的密码

mysql -u root -p
ALTER USER 'root'@'localhost' IDENTIFIED BY 'iqjLryKLu9%C';

# 在数据库 Shell 环境中，测试 root 账户的权限

show databases;
create database abc;
show databases;
exit;
```

在 win10 上安装 MySQL Workbench，Workbench 首次连接 MySQL 服务时，可能会报错，需要解决两个问题：

1. 打开 CentOS 7 上的 3306 防火墙端口
2. 允许 MySQL 远程登陆

1. 打开 CentOS 7 上的 3306 防火墙端口，操作步骤如下：

```bash
# 开放 linux 的 3306 防火墙端口

sudo firewall-cmd --permanent --add-port=3306/tcp

# 防火墙重新加载规则

sudo firewall-cmd --reload

# 检查防火墙的端口信息

sudo firewall-cmd --zone=public --list-port
```

2. 允许 MySQL 远程登陆，操作步骤如下：

```bash
# 设置 MySQL，允许远程登录

mysql -u root -p
update mysql.user set host = '%' where user = 'root';

# 刷新数据库的权限

FLUSH PRIVILEGES;

# 退出 MySQL 命令行

exit
```

Workbench 再连接 MySQL 数据库。如果在 Workbench 左侧窗格，能看到之前创建的 abc 数据库，则代表 MySQL 服务器配置成功。
