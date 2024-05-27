<H1 align ="center" > MERN BLOG  </h1>
<h5  align ="center"> 
Fullstack open source blogging application made with MongoDB, Express, React & Nodejs (MERN) </h5>
<br/>

  * [Configuration and Setup](#configuration-and-setup)
  * [Key Features](#key-features)
  * [Technologies used](#technologies-used)
      - [Frontend](#frontend)
      - [Backend](#backend)
      - [Database](#database)
  * [📸 Screenshots](#screenshots)
  * [Author](#author)
  * [License](#license)



## Configuration and Setup

In order to run this project locally, simply fork and clone the repository or download as zip and unzip on your machine.

- Open the project in your prefered code editor.
- Go to terminal -> New terminal (If you are using VS code)
- Split your terminal into two (run the Frontend on one terminal and the Backend on the other terminal)

In the first terminal

```
$ cd client
$ npm install (to install frontend-side dependencies)
$ npm run  start (to start the frontend)
```

In the second terminal

- cd server and Set environment variables in .env
- Create your mongoDB connection , which you'll use as your MONGO_URL
- Supply the following credentials

```
#  ---  .env  ---

PORT =8080
MONGO_URI =
JWT_SECRET_KEY =

```

# --- Terminal ---

$ npm install (to install backend-side dependencies)
$ npm run server (to start the backend)
```


##  Key Features

- User registration and login
- Authentication using JWT Tokens
- Blog searching
- CRUD operations (Blog create, read, update and delete)
- Upload Blog ımages  to the server
- Commenting  on the Blog

<br/>

##  Technologies used

This project was created using the following technologies.

####  Frontend 

- [React js]
- [React Hooks]
- [Redux]
- [react-router-dom]
- [axios]
- [Css]
- [material ui]



####  Backend 


- [Node js]
- [Express js]
- [Mongoose]
- [jsonwebtoken]
- [bcrypt]
- [dotenv]
- [cors]


####  Database 

 - [MongoDB ]


## Author

- Github: [@Ankit](https://github.com/Muhammet-Yildiz)
- Linkedin: [@muhammet-yildiz](https://www.linkedin.com/in/muhammet-yıldız-841908224/)
- Email: [yildiz.m.muhammet@gmail.com](mailto:yildiz.m.muhammet@gmail.com)

## License

MIT License

Copyright (c) 2022 Ankit Choudhary
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
