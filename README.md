# Karmen-PWA

* [About](#about)
* [Usage via web browser](#usage-via-web-browser)
* [Usage via email client](#usage-via-email-client)
* [Features](#features)
* [Website](#website)
* [YouTube](#youtube)

## About
Karmen discerns legitimate, benign COVID-19 messages from cybercriminals’ scam messages.

When COVID-19 entered our lives, we all turned to official government sources and brands we trust for answers and guidance to face an unprecedented threat to our livelihood. But as the world sought for trusted communications, cybercriminals seized an opportunity to exploit our uncertainty for financial gains.

IBM has seen millions of spam attacks worldwide amidst the pandemic, including attackers impersonating various nations’ Ministries of Health, financial institutions or even the Small Business Administration. Just in the two first weeks of April 2020, IBM saw a 6000% increase in COVID-19 related malicious spam. Google alone has also detected over 260 million phishing and spam emails per day relating to COVID-19.

There is an essential need, now more than ever, to ensure trust in prevalent channels of communication. But if the data shows us anything, it’s that, emails that we receive, today, may not be what they seem.

That’s why we created Karmen –a progressive web application wherein any user can check whether their text or email message is benign or if the alleged sender is actually a hacker in disguise. A user can either:
* Upload a screenshot or take a picture of the message
* Copy-paste the message into theapp
* Forward emails message to Karmen

Karmen will analyze the text and links within the message and provide a response within seconds, indicating if the message is indeed malicious or benign. Karmen also explains why it labeled a specific message as safeor spam, educating users about red flags to look for.

Karmen is powered by IBM Cloud Services including Cloud Foundry and Cloud Functions. Both of these allow for an easy and reliable deployment of cloud-native applications. The application also leverages IBM Watson via the Natural Language Classifier (NLC). By training the classifier on numerous spam and non-spam examples, the NLC Service determines which new SMS text and emails are spam and which aren't. 

Karmen also feeds identified links and IP addresses through IBM Security's X-Force Exchange to identify if they are malicious, widening the various forms of threat data Karmen cross-references to deliver results. 

This team blended our diverse backgrounds to tackle this problem holistically. A team consisting of engineers, designers and communicators, together, approached the problem from various angles to build an application that has a simple ease of use across diverse user groups, irrespective of their tech aptitude. We achieved this by leaning on our interdisciplinary and global reference, as well as our personal experiences educating the ones we love on spam.

As IBMers, we have the privilege of access to unparalleled knowledge, technology and resources that build our awareness around the challenges the world faces, and what we can do to remediate them. We view this privilege as a responsibility; a responsibility to solve a problem that preceded COVID-19 and has only exacerbated since –and, finally, tilt the scales in favor of users.

## Usage via web browser
1. Open you browser and go to http://karmen.mybluemix.net/ 

![browser_1](/docs/images/browser_1.png)

1. If the text you want to evaluate is SMS (text), click the "It's an SMS " checkbox
1. Paste the text you would like to evaluate into the grey box labled "Past the content that you would like to validate" -or- you can click the "upload image/ take a screenshot" to use OCR to identify the text
1. Click the Check for Spam button
1. Karmen will run analysis on the text against a trained Watson Natural Classifer, and other analysis

![browser_2](/docs/images/browser_2.png)

1. Karmen will then show a response page showing the overall assessment of "SPAM" or "NOT SPAM" and the percentage of confidence in that assessment

![browser_3](/docs/images/browser_3.png)

## Usage via email client
1. Open your browser and nagivate to http://karmen.mybluemix.net/
1. Click the "or forward email to validate" link

![email_1](/docs/images/email_1.png)

1. On the next page, click the "Copy email to clipboard" button

![email_2](/docs/images/email_2.png)

1. In your email program, select an email you would like to analyze and forward the email, the To: address should be on your clipboard
1. Within a few minutes, you should receive a response with the subject "Karmen Scan Results"

![email_3](/docs/images/email_3.png)

## About
1. Open your browser and navigate to http://karmen.mybluemix.net/

![about_1](/docs/images/about_1.png)

1. On the upper left corner, click on the cluster icon. 
1. A slide out will appear giving more detail about the tool

![about_2](/docs/images/about_2.png)

## Features

* **P**rogressive **W**eb **A**pp
   * Responsive **touch-first** layout with:
      * drawer layout (side menu panel)
   * Modular and component-based structure 
   * In-browser bundler: can pack all resources in a single file and boost-up loading speed 
   * PWA LightHouse score 98/100
* Watson Natural Language Classifier - IBM Cloud SAAS service 
* CloudFoundry - IBM Cloud PAAS Service
   
### Website
Karmen can be access via web browser here: 
https://karmen.mybluemix.net

### Youtube
A YouTube video showcasing the purpose and initial creation of Karmen can be found here:
https://www.youtube.com/watch?v=_bHxxO2UYQQ

