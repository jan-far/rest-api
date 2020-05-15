# rest-api

### Introduction
This API is an endpoint of TUTORIAL BLOG where users (target here, being students) can actually book lessons and watch/read tutorial materials. As a user who is interesteed in taking a course. Tutoring are available as well. You may signup as a tutor for a paticular category, likewise register to take subjects under those categories. The available categories are PRIMARY, JSS, and SSS. Depending on the topic, level and your target audience as a tutor, you have room to select from the categories.
#### NOTE: Post client is needed.

### Available online. [Click here!](https://tut-blog-api.herokuapp.com/)

### SignUp and SignIn
There are 3 roles in this API endpoint. An `Admin`, a `Student` and a `Tutor`. Users can register as either a student or a tutor.

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

 KEY - "x-access-token",
 VALUE - "yourToken"
 ```
 {
     'x-access-token':'yourToken'
 }
```

If Token is wrong, you then `Unauthenticated` as response when you try other routes. if `authenticated`, proceed. Likewise, all route are demand authorization, if Token is not provided, you will be need to do so to access routes.


## General Access: (For Admin, Tutors and Students);

All users can access the following routes to perform specific task.

Already logged in? and need to get your id or other details? 
`POST ../api/v1/me`- To access/retrieve your info in a JIFFY

`GET ../api/v1/subject/:id` - Retrieving a subject in a category (by Id)
where `:id` is the subject id

`GET ../api/v1/subject/category/:id` - view all available subjects by category. After getting the list of categories and their respective id's, you may get subjects of a specific category. 
where `:id` is the id of the category you want to call

`GET ../api/v1/category/` - To retrieve all categories

`GET ../api/v1/subject/` - Retrieve all subject. Also can search for subjects by name, sorted alphabetically in ascending order.
You need to know the subject name then pass it into the URL.
E.g `GET ../api/v1/subject?name=mathematics.`

`GET ../api/v1/tutors` - retrieve all registered/available tutors. can search for tutors by first name, sorted alphabetically in ascending order.


## Admin Access Only;

Admin can do lots more task. A tutor can be promoted to admin role, if criterials are met. Admin can do the following:

-> can create subjects under 3 categories: primary, JSS, SSS
`POST ../api/v1/subject/register`
The following are required fields to create subjects
```
{
    'name':'theSubjectName',
    'topic':'theTopic',
    'description':'short note on the topic',
    'category':'either _**primary**_ , _**jss**_ and _**sss**_ ',
}

```

-> can update a subject in a category (by Id)
`PUT ../api/v1/subject/:id`     where `:id` is the subject's id

->can delete a subject in a category (by Id)
`DELETE ../api/v1/subject/:id`  where `:id` is the subject's id

->can delete or update a category

To update : `PUT ../api/v1/category/:id`</br>
To delete : `DELETE ../api/v1/category/:id` </br>
where `:id` is the category's id

-> can retrieve all tutors
`GET ../api/v1/istutor`

-> can get a tutor (by Id)
`GET ../api/v1/tutor/:id`   where `:id` is the tutor's id

-> can deactivate a tutor (by Id)
`DELETE ../api/v1/tutor/:id`    where `:id` is the tutor's id

-> can book lessons
`POST /api/v1/lesson/register/?firstname="FN"&lastname="LN"&username="UN"` </br>
Register Lesson between TUTOR and STUDENT. where FN and LN are the firstname and lastname of the tutor respectively. the UN is the username of the student.
### NOTE: put the firstname, lastname and username without qoutes (if using the URL)

-> can retrieve all lessons
`GET ../api/v1/lesson`

-> can get a lesson (by Id)
`GET ../api/v1/lesson/:id`  where `:id` is the lesson's id

-> can update a lesson (by Id)
`PUT ..api/v1/lesson/:id`   where `:id` is the lesson's id

-> can delete a lesson (by Id)
`DELETE ..api/v1/lesson/:id`    where `:id` is the lesson's id

-> Make a tutor an admin
`PUT ../api/v1/tutor/role/:id`  where `:id` is the tutor's id


## Tutor Access Only;
A tutor has=ve access exclusive to their role. These includes;

-> register to take a subject in a category
`POST ../api/v1/takesubject/:id`    where `:id` is the subject's id

-> Retrieve the subjects you have registered to take, as a tutor.
`GET ../api/v1/mysubjects/`

-> update a registered subject
`PUT ../api/v1/mysubject/:id`   where `:id` is the registered subject's id

-> delete a registered subject </br>

 Interestingly! once a tutor feels done with subject or no longer interested in taking a subject, He/She can delete registration to the subject. The subject will be there if tutor's change their mind to register back.

`DELETE ../api/v1/mysubject/:id`    where `:id` is the registered subject's id
