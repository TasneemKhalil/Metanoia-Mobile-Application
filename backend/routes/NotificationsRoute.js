const { Router } = require('express');
const router = Router();
const NotificationCon = require('../controllers/NotificationsCon');




router.use('/notif', NotificationCon.notifications);


module.exports = router;