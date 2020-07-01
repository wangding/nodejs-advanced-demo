# 安装 MySQL

在 CentOS 7 命令行下，安装 MySQL 5.7 的操作步骤如下：

```bash
# 下载并安装 MySQL 官方的 Yum Repository

wget -i -c http://dev.mysql.com/get/mysql57-community-release-el7-10.noarch.rpm

# yum 安装 mysql5.7

sudo yum -y install mysql57-community-release-el7-10.noarch.rpm

# 安装 mysql 服务程序，这步安装时间会比较长

sudo yum -y install mysql-community-server

# 启动数据库服务

sudo systemctl start mysqld.service

# 查看 MySQL 运行状态

sudo systemctl status mysqld.service

# 找到 mysql 初始的 root 用户密码

sudo grep "password" /var/log/mysqld.log

# 进入数据库 Shell 环境，修改 root 账户密码

mysql -u root -p
ALTER USER 'root'@'localhost' IDENTIFIED BY 'iqjLryKLu9%C';

# 在数据库 Shell 环境中，测试数据库操作

show databases;
create database abc;
show databases;
exit;

# 在 win10 上安装 MySQL Workbench
# Workbench 首次连接 MySQL 服务时，应该会报错

# 开放 linux 的 3306 防火墙端口

sudo firewall-cmd --permanent --add-port=3306/tcp

# 防火墙重新加载规则

sudo firewall-cmd --reload

# 检查防火墙的端口信息

sudo firewall-cmd --zone=public --list-port

# workbench 再次连接 MySQL，可能还会失败
# 设置 MySQL，允许远程登录

mysql -u root -p
update mysql.user set host = '%' where user = 'root';

# 上面的命令可能会报错，不用管
# 刷新数据库的权限

FLUSH PRIVILEGES;

# workbench 再连接 MySQL 数据库
# 如果能看到 MySQL 上的数据库 abc，则代表 MySQL 服务器配置成功
# 可以在 workbench 上把 abc 数据库删掉
```
