 IIIT-H OLX
=============


Setup-information is mentioned below

 OUR PROJECT
====================

We have created a web-app that we lovingly call 'IIITOlx'. As the name suggests, 
anyone who has created an account here can post an article about what they want to sell. 
They just have to add the name of the item they want to sell, the picture of the said item, 
a small description(optional) and the price at which they are inclined to sell it.

Our application lets the user to view the list of items currently up for sale BUT to 
post reviews and remarks (hence making deals and actually buying) the user must be 
logged in (this is to support the buyer/seller if a breach of trust were to transpire). 
Once the seller has handed over the product to buyer and recieved the money, 
they can remove the item from the list of available items. Currently we support only buy 
and sell options but we shall soon add new options like rent,lost,found,etc.


 APP SETUP
===================

You just need to make sure you have Node.js installed.
Open the IIITOLX directory in your terminal and run
    
    $ npm install   // To install all the dependencies

    To run the application locally on port 3000 run
    
    $ node app.js


 DEPLOYING
===================

I recommend you to use HEROKU
Make your account in HEROKU
Open the IIITOLX directory in your terminal and run

    $ git init
    $ git add .
    $ git commit -m "<Your Message>"
    $ heroku login   // login with your account
    $ heroku create  // It will provide you url
    $ git push heroku master

 SPECIAL FEATURES
=========================

1. Those who are admins can delete and edit any post or query
    
2. Site supports fuzzy search.

3. Compatible for Cellphones too.

 FURTHER IDEAS We can Add
=================================

1.  User can upload pictures rather than copying urls from internet

2.  Distribute pages or renting,buying and selling

3.  Add notification setting when there is a reply or query

4.  Request Page

5.  Add reply and delete option for replies also




   
