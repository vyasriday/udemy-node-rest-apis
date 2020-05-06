const mongoose = require('mongoose');
mongoose
  .connect('mongodb://localhost/node-playground', {
    useNewUrlParser: true,
  })
  .then((res) => console.log('Connection Established'))
  .catch(console.log);

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const course = new Course({
    name: 'Golang Master Class',
    author: 'John Doe',
    tags: ['go'],
    isPublished: false,
  });

  const result = await course.save();
  console.log(result);
}

async function getCourse(id) {
  const course = await Course.findById('5eb28b8b69d96255d8f7dd64');
  // let's say we want to find courses where price is greater than 10
  const courses = await Course.find().limit(2).sort({ name: 1 }).count();
  // console.log(course);
  console.log(courses);
}
// createCourse();
getCourse();
