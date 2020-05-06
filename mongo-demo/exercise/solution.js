const mongoose = require('mongoose');

// connect to database
mongoose
  .connect('mongodb://localhost/node-playground', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log('Connected to Database!'))
  .catch(console.log);

// create a schema

const Schema = new mongoose.Schema({
  name: String,
  author: String,
  price: Number,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model('course', Schema);

async function createCourse(course) {
  const instance = new Course(course);
  const res = await instance.save();
  console.log(res);
}

// createCourse({
//   name: 'Learning Github Actions',
//   author: 'Hridaei',
//   price: 12,
//   tags: ['github', 'actions'],
//   isPublished: false,
// });

async function getCourses() {
  // const courses = await Course.find({
  //   isPublished: true,
  // })
  //   .sort('-price')
  //   .select({ name: 1, author: 1 });
  const courses = await Course.find().or({
    price: {
      $gte: 15,
    },
    name: /.*by.*/i,
  });
  console.log(courses);
}

getCourses();
