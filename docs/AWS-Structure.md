# AWS Structure
| 구분 | VPC | Subnet | IP | 보안그룹 |
| ------ | ------ | ------ | ------ | ------ |
| Web | now | 192.168.1<br>Pub | 미정 | 3000 - all<br>22 - BastionSG |
| Web2 | now | 192.168.4<br>Pub2 | 미정 | 3000 - PubSG<br>22 - BastionSG |
| Was | now | 192.168.2<br>Pri | 미정 | 3306 - WasSG<br>3306 - BationSG<br>out : all |
| DB | now | 192.168.3<br>Pri2 | 미정 | 22 - [접속IP] |
| Bastion | now | 192.168.1<br>Pub | 미정 | PubSG |


## Security Groups Name
- Public : Dahda-Public-SG
- Private : Dahda-Private-SG
- Database : Dahda-Database-SG
- Bastion : Dahda-Bastion-SG
