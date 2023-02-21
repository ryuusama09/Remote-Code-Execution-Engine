<h1 align="center">
  <br>
 <img src="https://user-images.githubusercontent.com/80237556/219677696-38938035-dd29-4a67-a541-09923ffcdf8a.jpeg" width="500">
  <br>
  RCE
  <br>
</h1>
<h4 align="center">A Code engine built to simplify remote code execution.</h4>
<p align="center">
  <a href="https://badge.fury.io/js/electron-markdownify">
    <img src="https://badge.fury.io/js/electron-markdownify.svg"
         alt="Gitter">
  </a>
  <a href="https://gitter.im/amitmerchant1990/electron-markdownify"><img src="https://badges.gitter.im/amitmerchant1990/electron-markdownify.svg"></a>
  <a href="https://saythanks.io/to/bullredeyes@gmail.com">
      <img src="https://img.shields.io/badge/SayThanks.io-%E2%98%BC-1EAEDB.svg">
  </a>
  <a href="https://www.paypal.me/AmitMerchant">
    <img src="https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&amp;style=flat">
  </a>
</p>

<p align="center">
  <a href="#Credits">Credits</a> •
  <a href="#Features">Features</a> •
  <a href="#Download">Download</a> •
   <a href="#Setup">Setup</a> •
  <a href="#Support">Support</a> 
</p>

## Credits
The software has been developed using the following packages:
<ul>
<li> NodeJs</li>
<li>Express</li>
<li>Docker</li>
<li> Amazon-S3</li>
</ul>

## Features
The general architecture of the engine
![image](https://user-images.githubusercontent.com/80237556/220329329-024068d6-377d-47c2-bfab-4b10152edb51.png)


## Download
To download the project use the following command 
<br>
```bash
#clone the project
$ git clone https://github.com/ryuusama09/Remote-Code-Execution-Engine.git
```
## Setup
once the project is cloned on your local system , you need to install the dependencies.
make sure you have <a href ="https://www.docker.com/products/docker-desktop/">Docker-Desktop</a>

```bash
#installs dependencies
$ npm install 
```
once all the dependencies , make sure you have you set the file ``script.sh`` in ``worker/images`` as ``LF`` type in the 
text-editor of your choice. also make sure you have no ``docker-container`` running on port ``7000``
<br>
now we will setup the docker shared volume and build the rest of the application
```bash
# creates docker volume "shared"
$ docker volume create shared

# build images 
$ docker build --no-cache -t rce/spawner worker/images/cpp

# the above commands need to be executed only once while initially setting up the project
# engine trigger command
$ docker-compose up --build
```


## Support
<a href="https://www.buymeacoffee.com/ryuusama9" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/purple_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
<br>
RCE is an [emailware](https://en.wiktionary.org/wiki/emailware). If you liked the project and would like to comment about it or would like to suggest
any improvements then contact me at <shahh8138@gmail.com> . All reviews are welcome ☺


