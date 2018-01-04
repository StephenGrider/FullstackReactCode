const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false
    });

    res.send(surveys);
  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys/webhooks', async (req, res) => {
    try {
      const p = new Path('/api/surveys/:surveyId/:choice');

      const surveys = req.body
          .map(surveyData => {
            const match = p.test(new URL(surveyData.url).pathname);
            if (match) {
              return { email: surveyData.email, surveyId: match.surveyId, choice: match.choice };
            }
          })
          .filter(item => item !== null && item !== undefined);

      const uniqueServeys = _.uniqBy(surveys, 'email', 'surveyId');

      for (let survey of uniqueServeys) {
        await Survey.updateOne(
            {
              _id: survey.surveyId,
              recipients: {
                $elemMatch: { email: survey.email, responded: false }
              }
            },
            {
              $inc: { [survey.choice]: 1 },
              $set: { 'recipients.$.responded': true },
              lastResponded: new Date()
            }
        ).exec();

        res.send({});
      }
    } catch(error) {
      console.log(error);
    }


  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: Mailer.getSurveyListFromEmailString(recipients),
      _user: req.user.id,
      dateSent: Date.now()
    });

    const surveyContent = surveyTemplate(survey);
    const mailer = new Mailer(survey, surveyContent);

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
