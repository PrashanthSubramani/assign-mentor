const { GET_STUDENTS, CREATE_STUDENT, NO_MENTOR_STUDENT, UPDATE_MENTOR } = require('../../routes/students/studentRouters');

const StudentRouter = require('express').Router();

module.exports = StudentRouter;

StudentRouter.get('/',GET_STUDENTS);

StudentRouter.post('/create',CREATE_STUDENT);

StudentRouter.get('/no-mentor',NO_MENTOR_STUDENT);

StudentRouter.put('/:id',UPDATE_MENTOR);


module.exports =StudentRouter;