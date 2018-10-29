const epxress = require('express');
const router = express.Router();

const Schedule = require('./scheduleModel')

router.get('/', (req, res) => {
  let query = Schedule.find();
})