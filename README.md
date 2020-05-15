# rest-api

### Introduction
This API is an endpoint of TUTORIAL BLOG where users (target here, being students) can actually book lessons and watch/read tutorial materials. As a user who is interesteed in taking a course. Tutoring are available as well. You may signup as a tutor for a paticular category, likewise register to take subjects under those categories. The available categories are PRIMARY, JSS, and SSS. Depending on the topic, level and your target audience as a tutor, you have room to select from the categories.
#### NOTE: Post client is needed.

### SignUp and SignIn
Use route `POST "../api/student/signup"` or `POST "../api/tutor/signup"` to register as a student or tutor respectively. see the Signup instruction below for more details on required fields.

#### SignUp details:
##### signingUp as a student
using the route and verb as stated above: `POST "../api/student/signup"`
fill in this field of `KEY:VALUE` pairs.

Using ; Body x-www-forwardurlencoded or raw json
```
        {
            'firstname':'yourFirstName',
            'lastname':'yourLastName',
            'username':'choice',
            'email':'yourEmail@mail.com',
            'password':''yourPassword'
        }
```

##### signingUp as a tutor
using the route and verb as stated above: `POST "../api/tutor/signup"`
similarly, you fill in the fields.

Using ; Body x-www-forwardurlencoded or raw json
```
        {
            'firstname':'yourFirstName',
            'lastname':'yourLastName',
            'username':'choice',
            'email':'yourEmail@mail.com',
            'password':''yourPassword'
        }
```
After you get a registration successful message. Proceed to login.

#### SignIn details:
#### SigningIn 
To sign in, you need your `username` and `password` .

Using ; Body x-www-forwardurlencoded or raw json

```
        {
            'username':'choice',
            'password':''yourPassword'
        }
```
On successful signIn, you recieve your information as well as an  access token.The token is to be used under `HEADER`. read more on authentication below. 

### Authentication
 After successful signup, then `POST "../api/signin"` to get your access token. Under the header section of your post client.
 the `KEY:VALUE` pair to use,

 KEY - "x-access-token"
 VALUE - "yourToken"
 ```
 {
     'x-access-token':'yourToken'
 }
```
If Token is wrong, you then `Unauthenticated` as response when you try other routes. if `authenticated`, proceed.


Error Codes

`# GET /api/category`
All users can retrieve all categories. Users can view the available categories and make search based on their preferred category.

`GET /api/v1/subject/category/:id`
finding all subject by category. After getting the list of categories and their respective id's, you may get subjects of a specific category. Just by accessing the followng route where :id is of the category. /api/subject/category/:id.

`POST /api/v1/me`- Already logged in? and need to get your id or other details? Using the /api/me will fetch out your details.

`DELETE /api/v1/subject/:id` - To delete a subject. use the `GET /api/subject` to retrive all subject with their id, then supply it to the route above using the verb `"DELETE"`

`GET /api/subject/` - Retrieving all registered subjects.

`POST api/v1/subject/register` - Registering a subject under a category. use the `GET /api/category` to obtain the name of available categories

`GET /api/category` - Retrieve all categories info.

`DELETE /api/category/:id` - Removig a category by Id. `GET` all categories to obtain id's

`GET /api/tutor` - Retrieve available tutors.

`GET /api/tutor/:id` - Retrieving information of a tutor


`GET /api/v1/lesson/` - Retrieve all lessons


`POST /api/v1/lesson/register/?firstname="FN"&lastname="LN"&username="UN"`- Register Lesson between #####TUTOR and ######STUDENT. where #####FN and #####LN are the firstname and lastname of the tutor respectively. the UN is the username of the student NOTE: put the firstname, lastname and username without qoutes (if using the URL)

`DELETE /api/tutor/:id` - deactivating a tutor by id

`PUT /api/v1/mysubjects/:id` - Retrieve the subjects you have registered to take, as a tutor.

`POST /api/v1/takesubject/:id` - As a tutor, you can register to take a course. POST "/api/v1/takesubject/:id" where ":id" is the ID of the subject you want to take.

`GET /api/v1/mysubjects/` - Get the whole list of subjects you have registered to as a tutor.


`DELETE /api/v1/mysubject/:id` - Interestingly! once you feel you are done or no longer interested in taking a subject, you can delete your registration. If you change your mind, the subject will still be there for you to register back. DELETE "/api/v1/mysubject/:id" where :id is the subject you registered to.
