const { GET_MENTORS, CREATE_MENTORS, SHOW_ALL_STUDENTS } = require('../../routes/mentors/mentorRouters');

const MentorRouter = require('express').Router();

module.exports = MentorRouter;

MentorRouter.get('/',GET_MENTORS);

MentorRouter.post('/create',CREATE_MENTORS);

MentorRouter.put('/:id',SHOW_ALL_STUDENTS);


module.exports =MentorRouter;